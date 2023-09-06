import { RootState } from "@src/store";
import ApiClient, { ApiClientInterface } from "@src/services/ApiClient";
import { staticI18n } from "@src/services/I18nProvider/I18nProvider";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { push } from "react-router-redux";
import { setUrlGetString } from "@src/utils/useCommonFilters";
import * as actionTypes from "./adapterTypes";

const apiClient = new ApiClient();
const { t } = staticI18n("adapter");

export const loadFileSettings = () => (dispatch: any) => {
  dispatch({
    types: actionTypes.GET_FILE_SETTINGS_ARRAY,
    promise: (client: ApiClientInterface) =>
      client.get(`/file_upload`).then((res) => {
        return res.data;
      }),
  });
};

export const uploadFileThunk = (
  file: File,
  selectedSheet: string,
  columns: any,
  startingRow: any,
  returnRes = false,
  fullexport: any = false,
) => {
  const formData = new FormData();
  formData.append("file", file);
  if (selectedSheet) formData.append("list_name", selectedSheet);
  formData.append("starting_row", startingRow);
  Object.entries(columns).forEach((entry: any) => {
    formData.append(entry[0], entry[1]);
  });
  if (fullexport) formData.append("noheader_row", fullexport);

  return (dispatch: any) => {
    dispatch(setUploadState({ uploading: true, error: "", fileErrors: null, selected: true }));

    return apiClient
      .put("/file_upload/", {
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
      .then((response) => {
        if (response.status === 200) {
          const searchId = response.data.id;
          if (returnRes) {
            dispatch(setUploadState({ uploading: false, error: "", fileErrors: null, selected: false }));
            dispatch(
              showBottomLeftMessageAlertAction({
                text: t("file_uploaded"),
                severity: "success",
              }),
            );
            return response.data;
          }
          return dispatch(checkFileState(searchId));
        }

        return dispatch(
          setUploadState({
            uploading: false,
            error: response.data?.error || t("error_file_upload_backend"),
            fileErrors: null,
            selected: false,
          }),
        );
      })
      .catch((e) => {
        dispatch(
          setUploadState({
            uploading: false,
            error: e.response?.data?.error || t("error_file_upload"),
            fileErrors: null,
            selected: false,
          }),
        );
      });
  };
};

export const checkFileStateThunk = (fileId: number) => {
  return {
    types: [false, false, false],
    promise: (client: ApiClientInterface) =>
      client
        .get(`/upload_file/${fileId}/`)
        .then((res) => res.data)
        .catch((error) => {
          console.log("***CHECK_PARSING_SUPPLIER_FILE_ERROR", error);
          throw error;
        }),
  };
};

export const checkFileState = (fileId: number) => {
  return (dispatch: any) => {
    dispatch(checkFileStateThunk(fileId))
      .then((response: any) => {
        switch (response.status) {
          case "PROCESSING": {
            setTimeout(() => dispatch(checkFileState(fileId)), 1000);
            break;
          }
          case "COMPLETED": {
            if (response.errors?.length) {
              dispatch(
                setUploadState({
                  uploading: false,
                  fileErrors: response.errors,
                  error: "",
                  selected: false,
                }),
              );
            } else {
              dispatch(setUploadState({ uploading: false, error: "", fileErrors: null, selected: false }));
              dispatch(push(`/adapter/list`));
              dispatch(
                showBottomLeftMessageAlertAction({
                  text: t("file_uploaded"),
                  severity: "success",
                }),
              );
            }
            break;
          }
          default: {
            const fileErrors = response.errors;
            dispatch(
              setUploadState({
                uploading: false,
                fileErrors: fileErrors || null,
                error: fileErrors ? "" : t("error_file_upload_backend"),
                selected: false,
              }),
            );
          }
        }
      })
      .catch(() => {
        dispatch(
          setUploadState({
            uploading: false,
            error: t("error_file_upload_backend"),
            fileErrors: null,
            selected: false,
          }),
        );
      });
  };
};

export const setUploadState = (fields: any) => {
  return (dispatch: any, getState: () => RootState) => {
    const uploadState = { ...getState().adapter.upload, ...fields };
    dispatch({
      type: actionTypes.SET_UPLOAD_STATE,
      payload: uploadState,
    });
  };
};

export const getUploadedFiles = (params: any) => {
  const urlParams = setUrlGetString(params);
  return {
    types: actionTypes.GET_ITEMS_ARRAY,
    promise: (client: ApiClientInterface) =>
      client
        .get(`/upload_file/${urlParams}`)
        .then((res) => res.data)
        .catch((error) => {
          console.log("***GET_SUPPLIER_UPLOADED_FILES_ERROR", error);
          throw error;
        }),
  };
};

export const loadMisc = (name: string) => apiClient.get(`/misc/${prepareFIleName(name)}/`).then((res) => res.data);

export const saveMisc = (name: string, data: any) =>
  apiClient
    .post(`/misc/`, { data: { name: prepareFIleName(name), data }, cancelId: "saveMisc" })
    .then((res) => res.data);

export const updateMisc = (name: string, data: any) =>
  apiClient.put(`/misc/${prepareFIleName(name)}/`, { data, cancelId: "updateMisc" }).then((res) => res.data);

const prepareFIleName = (name: string) => `adapter_${name}`;
