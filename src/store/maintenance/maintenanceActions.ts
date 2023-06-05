import { Dispatch } from "redux";
import { ApiClientInterface } from "@src/services/ApiClient";
import * as actionTypes from "./maintenanceTypes";

const loadMaintenanceThunk = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      types: actionTypes.LOAD_MAINTENANCE_ARRAY,
      promise: (client: ApiClientInterface) =>
        client
          .get(`/maintenance/`)
          .then((res) => res.data)
          .catch((e) => {
            console.log("***LOAD_MAINTENANCE_ERROR", e);
            throw e;
          }),
    });
  };
};

export default loadMaintenanceThunk;
