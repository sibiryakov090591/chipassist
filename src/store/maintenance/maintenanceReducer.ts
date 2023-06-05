import * as actionTypes from "./maintenanceTypes";

const initialState: actionTypes.MaintenanceState = {
  loaded: false,
  message: null,
  status: "",
};

const maintenance = (state = initialState, action: any): actionTypes.MaintenanceState => {
  switch (action.type) {
    case actionTypes.LOAD_MAINTENANCE_R:
      return { ...state, loaded: false, message: null };
    case actionTypes.LOAD_MAINTENANCE_S:
      return { ...state, loaded: true, message: action.response.message, status: action.response.status };
    case actionTypes.LOAD_MAINTENANCE_F:
      return { ...state, loaded: true, message: null };
    default:
      return state;
  }
};

export default maintenance;
