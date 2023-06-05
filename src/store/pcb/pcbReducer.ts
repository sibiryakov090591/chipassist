import { updateObject } from "@src/utils/utility";
import * as actionTypes from "./pcbTypes";

export const PATHNAME = "/pcb";

export const getCurrentDate = () => {
  return new Date().toISOString().slice(0, 10);
};

export const initialState: actionTypes.PcbState = {
  pcbConstants: null,
  pcbSellers: [],
  pcbs: {},
  pcbItem: {},
  pcbItemLoading: false,
  pcbsNeedUpdate: 1, // counter for easy
  pcbsLoading: false,
  pcbSaving: false,
  pcbModalOpen: false,
  pcbModalUpdateId: null,
  pcbModalItem: {
    part_number: "",
    pcbtype: "BOARD",
    quantity: 1,
    seller: [],
    // panel_x: 1,
    // panel_y: 1,
    x: "",
    y: "",
    unit_x: "",
    unit_y: "",
    thickness: "",
    count_rigid: 1,
    count_flex: 0,
    base: "FR4-STANDARD TG140C",
    copper: "",
    finish: "HASL",
    soldermask: "null",
    soldermask_color: "GREEN",
    legend: "null",
    legend_color: "WHITE",
    track: "",
    spacing: "",
    hole: "",
    hole_count: "",
    profiling: "TABROUTE",
    period: "",
    comment: "",
    file: [],
    status: "CREATED",
    xout: false,
    price: "",
    valid_date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
  },
  pcbResponse: {
    loading: false,
    error: false,
    message: null,
  },
  pcbUpdate: {
    loading: false,
    error: false,
  },
  pcbErrors: {},
};

const pcbResponseSuccess = (state: any, action: any) => {
  const res = action.response;
  const pcbs = JSON.parse(JSON.stringify(state.pcbs));
  let pcbItem = { ...state.pcbItem };

  if (pcbs.results) {
    pcbs.results = pcbs.results.map((pcb: any) => {
      if (pcb.id === res.pcb) {
        return { ...pcb, response_pcb: [{ ...res }] };
      }
      return pcb;
    });
  }

  if (pcbItem && pcbItem.id === res.pcb) {
    pcbItem = { ...pcbItem, response_pcb: [{ ...res }] };
  }
  return { ...state, pcbs, pcbItem, pcbResponse: { loading: false, error: false, message: null } };
};

const pcbApproveSuccess = (state: any, action: any) => {
  const res = action.response;
  const pcbs = JSON.parse(JSON.stringify(state.pcbs));
  let pcbItem = { ...state.pcbItem };

  if (pcbs.results) {
    pcbs.results = pcbs.results.map((pcb: any) => {
      if (pcb.id === res.id) {
        return res;
      }
      return pcb;
    });
  }

  if (pcbItem && pcbItem.id === res.id) {
    pcbItem = { ...pcbItem, ...res };
  }

  return { ...state, pcbs, pcbItem };
};

const deletePcb = (state: any, action: any) => {
  const pcbs = JSON.parse(JSON.stringify(state.pcbs));
  const pcbId = action.payload;
  if (pcbs.results) {
    pcbs.count -= 1;
    pcbs.results = pcbs.results.filter((item: any) => item.id !== pcbId);
    return { ...state, pcbs };
  }
  return state;
};

const pcbUpdateItem = (state: any, action: any) => {
  const { id, data } = action.payload;
  const pcbs = { ...state.pcbs };
  let pcbItem = { ...state.pcbItem };

  if (pcbs.results) {
    const results = pcbs.results.map((val: any) => {
      if (val.id !== id) return val;
      return { ...val, ...data };
    });
    pcbs.results = results;
  }

  if (pcbItem && pcbItem.id === id) {
    pcbItem = { ...pcbItem, ...data };
  }

  return updateObject(state, { pcbs, pcbItem });
};

const pcbModalSetItem = (state: any, action: any) => {
  const item = action.payload;
  const files = { file: item.files_pcb.map((v: any) => ({ id: v.id, name: v.url.match(new RegExp("([^/]*)$"))[0] })) };

  const result = Object.assign(
    {},
    state.pcbModalItem,
    ...Object.keys(state.pcbModalItem).map((val) => {
      if (val in item) {
        if (val === "seller") return { [val]: item[val].map((v: any) => v.id) };
        return { [val]: item[val] || state.pcbModalItem[val] };
      }
      return false;
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    ...files,
  );

  // return updateObject(state, { pcbModalOpen: true, pcbModalItem: result, pcbModalUpdateId: item.id });
  return updateObject(state, { pcbModalItem: result, pcbModalUpdateId: item.id });
};

const pcbStatusUpdate = (state: any, action: actionTypes.PcbStatusUpdate) => {
  const { id, data } = action.payload;
  const pcbs = { ...state.pcbs };
  let pcbItem = { ...state.pcbItem };

  if (pcbs.results) {
    const results = pcbs.results.map((val: any) => {
      if (val.id !== id) return val;
      return { ...val, ...data };
    });
    pcbs.results = results;
  }

  if (pcbItem && pcbItem.id === id) {
    pcbItem = { ...pcbItem, ...data };
  }

  return updateObject(state, { pcbs, pcbItem });
};

export default function cart(state = initialState, action: actionTypes.PcbActionsType) {
  switch (action.type) {
    case actionTypes.GET_CONSTANTS: {
      if (!action.payload || typeof action.payload !== "object") return { ...state };
      const constants: any = {};
      Object.keys(action.payload).map((k) => {
        const values = Object.keys(action.payload[k]).map((v) => {
          if (v === "null") return { label: "-------", value: v };
          return { label: action.payload[k][v], value: v };
        });
        constants[k] = values;
        return true;
      });
      return { ...state, pcbConstants: constants };
    }
    case actionTypes.LOAD_PCB_R:
      return { ...state, pcbsLoading: true };
    case actionTypes.LOAD_PCB_S:
      return { ...state, pcbsLoading: false, pcbs: action.response };
    case actionTypes.LOAD_PCB_F:
      return { ...state, pcbsLoading: false };
    case actionTypes.SAVE_PCB:
      return updateObject(state, { pcbs: action.payload });
    case actionTypes.SAVE_PCB_R:
      return { ...state, pcbSaving: true };
    case actionTypes.SAVE_PCB_S:
      return { ...state, pcbSaving: false };
    case actionTypes.SAVE_PCB_F:
      return { ...state, pcbSaving: false };
    case actionTypes.PCB_UPDATE_R:
      return { ...state, pcbUpdate: { loading: true, error: false } };
    case actionTypes.PCB_UPDATE_S:
      return { ...state, pcbUpdate: { loading: false, error: false } };
    case actionTypes.PCB_UPDATE_F:
      return { ...state, pcbUpdate: { loading: false, error: true } };
    case actionTypes.PCB_UPDATE_ITEM: {
      return pcbUpdateItem(state, action);
    }
    case actionTypes.PCB_SET_MODAL_ITEM:
      return updateObject(state, { pcbModalItem: action.payload });
    case actionTypes.PCB_CLEAR_MODAL_ITEM:
      return updateObject(state, { pcbModalItem: initialState.pcbModalItem, pcbModalUpdateId: null });
    case actionTypes.PCB_MODAL_OPEN:
      return updateObject(state, { pcbModalOpen: true });
    case actionTypes.PCB_MODAL_UPDATE:
      return pcbModalSetItem(state, action);
    case actionTypes.PCB_MODAL_CLOSE:
      return updateObject(state, { pcbModalOpen: false });
    case actionTypes.PCB_RESPONSE_R:
      return { ...state, pcbResponse: { loading: true, error: false } };
    case actionTypes.PCB_RESPONSE_S:
      return pcbResponseSuccess(state, action);
    case actionTypes.PCB_RESPONSE_F: {
      let message: any = action.error && action.error.response && action.error.response.data;
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      message = `${Object.entries(message)[0][0]} ${Object.entries(message)[0][1][0]}`;
      return { ...state, pcbResponse: { loading: false, error: true, message } };
    }
    case actionTypes.CLEAR_PCB_RESPONSE:
      return { ...state, pcbResponse: { loading: false, error: false, message: null } };
    case actionTypes.PCB_APPROVE_RESPONSE_S:
      return pcbApproveSuccess(state, action);
    case actionTypes.DELETE_PCB_FROM_STORE:
      return deletePcb(state, action);
    case actionTypes.PCBS_NEED_UPDATE:
      return updateObject(state, { pcbsNeedUpdate: state.pcbsNeedUpdate + 1 });
    case actionTypes.PCB_SET_ERRORS:
      return updateObject(state, { pcbErrors: action.payload });
    case actionTypes.PCB_GET_SELLERS:
      return updateObject(state, { pcbSellers: action.payload.results });
    case actionTypes.PCB_GET_ITEM:
      return updateObject(state, { pcbItem: action.payload });
    case actionTypes.PCB_ITEM_R:
      return { ...state, pcbItemLoading: true };
    case actionTypes.PCB_ITEM_S:
      return { ...state, pcbItemLoading: false };
    case actionTypes.PCB_ITEM_F:
      return { ...state, pcbItemLoading: false };
    case actionTypes.PCB_STATUS_UPDATE:
      return pcbStatusUpdate(state, action);
    default:
      return state;
  }
}
