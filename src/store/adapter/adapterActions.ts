import { RootState } from "@src/store";
import ApiClient, { ApiClientInterface } from "@src/services/ApiClient";
import { staticI18n } from "@src/services/I18nProvider/I18nProvider";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
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
    dispatch(setUploadState({ uploading: true, error: "", selected: true }));

    return apiClient
      .post("/upload_supplier_file/", {
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
      .then((response) => {
        if (response.status === 200) {
          // const searchId = response.data.search_id;
          // const bomId = response.data.id;
          if (returnRes) {
            dispatch(setUploadState({ uploading: false, error: "", selected: false }));
            dispatch(
              showBottomLeftMessageAlertAction({
                text: t("file_uploaded"),
                severity: "success",
              }),
            );
            return response.data;
          }
          // return dispatch(checkFileParsingState(searchId, bomId));
        }

        return dispatch(
          setUploadState({
            uploading: false,
            error: response.data?.error || t("error_file_upload_backend"),
            selected: false,
          }),
        );
      })
      .catch((e) => {
        dispatch(
          setUploadState({
            uploading: false,
            error: e.response?.data?.error || t("error_file_upload"),
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

export const loadMisc = (name: string) => apiClient.get(`/misc/${prepareFIleName(name)}/`).then((res) => res.data);

export const saveMisc = (name: string, data: any) =>
  apiClient
    .post(`/misc/`, { data: { name: prepareFIleName(name), data }, cancelId: "saveMisc" })
    .then((res) => res.data);

export const updateMisc = (name: string, data: any) =>
  apiClient.put(`/misc/${prepareFIleName(name)}/`, { data, cancelId: "updateMisc" }).then((res) => res.data);

const prepareFIleName = (name: string) => `adapter_${name}`;
