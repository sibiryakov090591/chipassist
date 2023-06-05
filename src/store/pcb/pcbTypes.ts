export const GET_CONSTANTS = "GET_CONSTANTS";
export const LOAD_PCB_R = "LOAD_PCB_R";
export const LOAD_PCB_S = "LOAD_PCB_S";
export const LOAD_PCB_F = "LOAD_PCB_F";
export const SAVE_PCB_R = "SAVE_PCB_R";
export const SAVE_PCB_S = "SAVE_PCB_S";
export const SAVE_PCB_F = "SAVE_PCB_F";
export const PCB_RESPONSE_R = "PCB_RESPONSE_R";
export const PCB_RESPONSE_S = "PCB_RESPONSE_S";
export const PCB_RESPONSE_F = "PCB_RESPONSE_F";
export const PCB_UPDATE_R = "PCB_UPDATE_R";
export const PCB_UPDATE_S = "PCB_UPDATE_S";
export const PCB_UPDATE_F = "PCB_UPDATE_F";
export const PCB_ITEM_R = "PCB_ITEM_R";
export const PCB_ITEM_S = "PCB_ITEM_S";
export const PCB_ITEM_F = "PCB_ITEM_F";

export const PCB_APPROVE_RESPONSE_R = "PCB_APPROVE_RESPONSE_R";
export const PCB_APPROVE_RESPONSE_S = "PCB_APPROVE_RESPONSE_S";
export const PCB_APPROVE_RESPONSE_F = "PCB_APPROVE_RESPONSE_F";
export const PCB_APPROVE_RESPONSE = [PCB_APPROVE_RESPONSE_R, PCB_APPROVE_RESPONSE_S, PCB_APPROVE_RESPONSE_F];
export const PCB_RESPONSE = [PCB_RESPONSE_R, PCB_RESPONSE_S, PCB_RESPONSE_F];
export const PCB_UPDATE = [PCB_UPDATE_R, PCB_UPDATE_S, PCB_UPDATE_F];
export const PCB_ITEM_ARRAY = [PCB_ITEM_R, PCB_ITEM_S, PCB_ITEM_F];
export const LOAD_PCB = [LOAD_PCB_R, LOAD_PCB_S, LOAD_PCB_F];
export const SAVE_PCB_ARRAY = [SAVE_PCB_R, SAVE_PCB_S, SAVE_PCB_F];
export const SAVE_PCB = "SAVE_PCB";
export const PCB_STATUS_UPDATE = "PCB_STATUS_UPDATE";
export const PCB_UPDATE_ITEM = "PCB_UPDATE_ITEM";
export const PCB_SET_MODAL_ITEM = "PCB_SET_MODAL_ITEM";
export const PCB_CLEAR_MODAL_ITEM = "PCB_CLEAR_MODAL_ITEM";
export const PCB_MODAL_OPEN = "PCB_MODAL_OPEN";
export const PCB_MODAL_UPDATE = "PCB_MODAL_UPDATE";
export const PCB_MODAL_CLOSE = "PCB_MODAL_CLOSE";
export const CLEAR_PCB_RESPONSE = "CLEAR_PCB_RESPONSE";
export const DELETE_PCB_FROM_STORE = "DELETE_PCB_FROM_STORE";
export const PCBS_NEED_UPDATE = "PCBS_NEED_UPDATE";
export const PCB_SET_ERRORS = "PCB_SET_ERRORS";
export const PCB_GET_SELLERS = "PCB_GET_SELLERS";
export const PCB_GET_ITEM = "PCB_GET_ITEM";

// State
export interface PcbState {
  pcbConstants: { [key: string]: PcbConstantsItem } | null;
  pcbSellers: any[];
  pcbs: Pcbs | {};
  pcbItem: any;
  pcbItemLoading: boolean;
  pcbsNeedUpdate: number;
  pcbsLoading: boolean;
  pcbSaving: boolean;
  pcbModalOpen: boolean;
  pcbModalUpdateId: any;
  pcbModalItem: {
    part_number: string;
    pcbtype: string;
    quantity: number;
    seller: any[];
    x: string;
    y: string;
    unit_x: string;
    unit_y: string;
    thickness: string;
    count_rigid: 1;
    count_flex: 0;
    base: string;
    copper: string;
    finish: string;
    soldermask: string;
    soldermask_color: string;
    legend: string;
    legend_color: string;
    track: string;
    spacing: string;
    hole: string;
    hole_count: string;
    profiling: string;
    period: string;
    comment: string;
    file: any[];
    status: string;
    xout: boolean;
    price: string;
    valid_date: any;
  };
  pcbResponse: {
    loading: boolean;
    error: boolean;
    message: any;
  };
  pcbUpdate: {
    loading: boolean;
    error: boolean;
  };
  pcbErrors: any;
}

interface PcbConstantsItem {
  label: string | number;
  value: string;
}

export interface Pcbs {
  links: { next: string | null; previous: string | null };
  count: number;
  total_pages: number;
  page: number;
  results: PcbsItem[];
}

export interface PcbsItem {
  id: number;
  user: number;
  part_number: string;
  price: string;
  xout: number;
  pcbtype: string;
  quantity: number;
  panel_x: number;
  panel_y: number;
  x: number;
  y: number;
  unit_x: number;
  unit_y: number;
  thickness: number;
  count_flex: number;
  count_rigid: number;
  base: string;
  copper: number;
  finish: string;
  soldermask: string;
  soldermask_color: string;
  legend: string;
  legend_color: string;
  track: number;
  spacing: number;
  hole: number;
  hole_count: number;
  profiling: string;
  period: number;
  comment: string;
  valid_date: string;
  created: string;
  response_pcb: any[];
  files_pcb: any[];
  approved: any;
  status: string;
  sellers: Array<{ id: number; name: string }>;
}

// translation placeholders
export const units = {
  x: "unit.x",
  y: "unit.y",
  thickness: "unit.thickness",
  unit_x: "unit.unit_x",
  unit_y: "unit.unit_y",
  track: "unit.track",
  spacing: "unit.spacing",
  hole: "unit.hole",
  period: "unit.period",
};

// translation placeholders
export const STATUS_CHOICES = [
  { label: "choice.status.created", value: "CREATED" },
  { label: "choice.status.ready", value: "READY" },
  { label: "choice.status.done", value: "DONE" },
];

// translation placeholders
// export const PANEL_CHOICES = [
//   { label: "choice.panel.board", value: "BOARD" },
//   { label: "choice.panel.panel", value: "PANEL" },
// ];

// translation placeholders
// export const BASE_CHOICES = [
//   { label: "choice.base.140c", value: "FR4-STANDARD TG140C" },
//   { label: "choice.base.150c", value: "FR4 TG150C" },
//   { label: "choice.base.170c", value: "FR4-HIGH TG180C" },
//   { label: "choice.base.180c", value: "FR4-HIGH TG180C" },
//   { label: "choice.base.free", value: "FR4-HALOGEN-FREE-HIGHTG" },
//   { label: "choice.base.free_high", value: "FR4-HALOGEN-FREE-HIGHTG" },
// ];

// translation placeholders
// export const FINISH_CHOICES = [
//   { label: "choice.finish.none", value: "None" },
//   { label: "choice.finish.hasl", value: "HASL" },
//   { label: "choice.finish.hasl_rohs", value: "HASL ROHS" },
//   { label: "choice.finish.enig", value: "ENIG" },
//   { label: "choice.finish.is_rohs", value: "IS ROHS" },
//   { label: "choice.finish.it_rohs", value: "IT ROHS" },
//   { label: "choice.finish.osp", value: "OSP" },
// ];

// translation placeholders
// export const SOLDERMASK_CHOICES = [
//   { label: "choice.soldermask.none", value: "None" },
//   { label: "choice.soldermask.one", value: "ONE" },
//   { label: "choice.soldermask.both", value: "BOTH" },
// ];

// translation placeholders
// export const SOLDERMASK_COLOR_CHOICES = [
//   { label: "choice.soldermask.color.green", value: "GREEN" },
//   { label: "choice.soldermask.color.blue", value: "BLUE" },
//   { label: "choice.soldermask.color.red", value: "RED" },
//   { label: "choice.soldermask.color.black", value: "BLACK" },
//   { label: "choice.soldermask.color.yellow", value: "YELLOW" },
//   { label: "choice.soldermask.color.white", value: "WHITE" },
// ];

// translation placeholders
// export const LEGEND_CHOICES = [
//   { label: "choice.legend.none", value: "None" },
//   { label: "choice.legend.one", value: "ONE" },
//   { label: "choice.legend.both", value: "BOTH" },
// ];

// translation placeholders
// export const LEGEND_COLOR_CHOICES = [
//   { label: "choice.legend.color.white", value: "WHITE" },
//   { label: "choice.legend.color.black", value: "BLACK" },
//   { label: "choice.legend.color.yellow", value: "YELLOW" },
//   { label: "choice.legend.color.red", value: "RED" },
// ];

// translation placeholders
// export const PROFILING_CHOICES = [
//   { label: "choice.profiling.vscoring", value: "VSCORING" },
//   { label: "choice.profiling.tabroute", value: "TABROUTE" },
//   { label: "choice.profiling.both", value: "BOTH" },
// ];

// translation placeholders
// export const COPPER_CHOICES = [
//   // { label: 5, value: 5 },
//   // { label: 9, value: 9 },
//   // { label: 12, value: 12 },
//   { label: "choice.copper.18", value: 18 },
//   { label: "choice.copper.35", value: 35 },
//   { label: "choice.copper.70", value: 70 },
//   { label: "choice.copper.105", value: 105 },
//   { label: "choice.copper.140", value: 140 },
//   { label: "choice.copper.175", value: 175 },
//   { label: "choice.copper.210", value: 210 },
//   { label: "choice.copper.420", value: 420 },
//   { label: "choice.copper.525", value: 525 },
// ];

// Actions
interface ClearPcbModalItem {
  type: typeof PCB_CLEAR_MODAL_ITEM;
}

interface PcbModalOpen {
  type: typeof PCB_MODAL_OPEN;
}

export interface PcbModalUpdate {
  type: typeof PCB_MODAL_UPDATE;
  payload: PcbsItem;
}

interface PcbModalClose {
  type: typeof PCB_MODAL_CLOSE;
}

interface ClearPcbResponse {
  type: typeof CLEAR_PCB_RESPONSE;
}

interface DeletePcbFromStore {
  type: typeof DELETE_PCB_FROM_STORE;
  payload: number;
}

interface GetConstants {
  type: typeof GET_CONSTANTS;
  payload: any;
}

interface LoadPcb {
  type: typeof LOAD_PCB_R | typeof LOAD_PCB_S | typeof LOAD_PCB_F;
  response: any;
}

interface SaveRfg {
  type: typeof SAVE_PCB | typeof SAVE_PCB_R | typeof SAVE_PCB_S | typeof SAVE_PCB_F;
  payload: any;
}

interface SetPcbModalItem {
  type: typeof PCB_SET_MODAL_ITEM;
  payload: any;
}

interface PcbUpdate {
  type: typeof PCB_UPDATE_R | typeof PCB_UPDATE_S | typeof PCB_UPDATE_F | typeof PCB_UPDATE_ITEM;
}

interface PcbApproveResponse {
  type: typeof PCB_APPROVE_RESPONSE_S;
}

interface PcbNeedUpdate {
  type: typeof PCBS_NEED_UPDATE;
}

interface PcbResponse {
  type: typeof PCB_RESPONSE_R | typeof PCB_RESPONSE_S | typeof PCB_RESPONSE_F;
  error: any;
}

interface PcbGetItem {
  type: typeof PCB_GET_ITEM | typeof PCB_ITEM_R | typeof PCB_ITEM_S | typeof PCB_ITEM_F;
  payload: any;
}

interface PcbSetErrors {
  type: typeof PCB_SET_ERRORS;
  payload: any;
}

interface PcbGetSellers {
  type: typeof PCB_GET_SELLERS;
  payload: any;
}

export interface PcbStatusUpdate {
  type: typeof PCB_STATUS_UPDATE;
  payload: {
    id: number;
    data: { status: string };
  };
}

export type PcbActionsType =
  | ClearPcbModalItem
  | PcbSetErrors
  | PcbStatusUpdate
  | PcbGetItem
  | PcbGetSellers
  | PcbNeedUpdate
  | PcbModalOpen
  | PcbModalUpdate
  | PcbModalClose
  | ClearPcbResponse
  | GetConstants
  | LoadPcb
  | SaveRfg
  | PcbUpdate
  | SetPcbModalItem
  | PcbResponse
  | PcbApproveResponse
  | DeletePcbFromStore;
