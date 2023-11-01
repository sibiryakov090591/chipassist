import { updateObject } from "@src/utils/utility";
import { RfqActionTypes, RfqListBackendResponse, RfqState } from "@src/store/rfq/rfqTypes";
import * as actionTypes from "./rfqTypes";

export const PATHNAME = "/rfq";

// export const getCurrentDate = () => {
//   return new Date().toLocaleDateString().slice(0, 10);
// };

const initialState: RfqState = {
  rfqs: {},
  rfqsNeedUpdate: 1, // counter for easy
  rfqsLoading: false,
  rfqSaving: false,
  rfqModalOpen: false,
  isNeedRfqModalOpenAgain: false,
  sellerMessageModal: {
    open: false,
    isNeedModalOpenAgain: false,
    partNumber: "",
    stockrecordId: null,
    sellerId: null,
    sellerName: null,
    isSending: false,
  },
  qualityCheckModal: {
    open: false,
    isNeedModalOpenAgain: false,
    partNumber: "",
    stockrecordId: null,
    sellerId: null,
    sellerName: null,
    isSending: false,
  },
  rfqItem: {
    userId: "",
    partNumber: "",
    prevPartNumber: "",
    // companyName: "",
    quantity: "",
    price: "",
    currency: null,
    stockrecord: null,
    product: null,
    title: "rfq",
    // deliveryDate: getCurrentDate(),
    // validateDate: getCurrentDate(),
    seller: null,
    // address: "",
    comment: "",
    productId: 0,
  },
  rfqResponseData: {},
  rfqResponse: {
    loading: false,
    error: false,
  },
  rfqUpdate: {
    loading: false,
    error: false,
  },
  rfqErrors: [],
};

// const saveResponseItem = (state: RfqState, action: RfqActionTypes) => {
//   state
//   return state
// }

export default function rfqReducer(state = initialState, action: RfqActionTypes): RfqState {
  switch (action.type) {
    case actionTypes.LOAD_RFQ_R:
      return { ...state, rfqsLoading: true };
    case actionTypes.LOAD_RFQ_S:
      return { ...state, rfqsLoading: false, rfqs: action.response };
    case actionTypes.LOAD_RFQ_F:
      return { ...state, rfqsLoading: false, rfqs: { ...state.rfqs, results: [] } };
    case actionTypes.SAVE_RFQ: // TODO: delete?
      return updateObject(state, { rfqs: action.payload });
    case actionTypes.SAVE_RFQ_R:
      return { ...state, rfqSaving: true, rfqErrors: [] };
    case actionTypes.SAVE_RFQ_S:
      return { ...state, rfqSaving: false };
    case actionTypes.SAVE_RFQ_F: {
      if (action.error?.response?.status === 400) {
        return { ...state, rfqSaving: false, rfqErrors: action.error?.response?.data || "" };
      }
      return state;
    }
    case actionTypes.RFQ_UPDATE_R:
      return { ...state, rfqUpdate: { loading: true, error: false } };
    case actionTypes.RFQ_UPDATE_S:
      return { ...state, rfqUpdate: { loading: false, error: false } };
    case actionTypes.RFQ_UPDATE_F:
      return { ...state, rfqUpdate: { loading: false, error: true } };
    case actionTypes.UPDATE_ITEM: {
      const { id, data } = action.payload;
      const rfqs = { ...state.rfqs };
      rfqs.results = rfqs.results.map((val: any) => {
        if (val.id !== id) return val;
        return { ...val, ...data };
      });
      return updateObject(state, { rfqs });
    }
    case actionTypes.SET_ITEM:
      return updateObject(state, { rfqItem: { ...state.rfqItem, ...action.payload } });
    case actionTypes.CLEAR_ITEM:
      return updateObject(state, {
        rfqItem: { ...initialState.rfqItem, partNumber: state.rfqItem.partNumber, title: state.rfqItem.title },
      });
    case actionTypes.MODAL_OPEN:
      return updateObject(state, {
        rfqModalOpen: true,
        isNeedRfqModalOpenAgain: false,
        rfqItem: { ...state.rfqItem, ...action.payload },
      });
    case actionTypes.SET_QUERY_UPC:
      return updateObject(state, { rfqItem: { ...state.rfqItem, partNumber: action.payload } });
    case actionTypes.MODAL_CLOSE:
      return updateObject(state, { rfqModalOpen: false });
    case actionTypes.SELLER_MESSAGE_MODAL_OPEN:
      return {
        ...state,
        sellerMessageModal: {
          ...state.sellerMessageModal,
          isNeedModalOpenAgain: false,
          open: action.payload.open,
          partNumber: action.payload.partNumber,
          sellerId: action.payload.sellerId,
          sellerName: action.payload.sellerName,
          stockrecordId: action.payload.stockrecordId,
        },
      };
    case actionTypes.SELLER_MESSAGE_MODAL_CLOSE:
      return updateObject(state, { sellerMessageModal: { ...state.sellerMessageModal, open: false } });
    case actionTypes.SEND_SELLER_MESSAGE_R:
      return { ...state, sellerMessageModal: { ...state.sellerMessageModal, isSending: true } };
    case actionTypes.SEND_SELLER_MESSAGE_S:
      return { ...state, sellerMessageModal: { ...state.sellerMessageModal, isSending: false } };
    case actionTypes.SEND_SELLER_MESSAGE_F:
      return { ...state, sellerMessageModal: { ...state.sellerMessageModal, isSending: false } };
    case actionTypes.QUALITY_CHECK_MODAL_OPEN:
      return {
        ...state,
        qualityCheckModal: {
          ...state.qualityCheckModal,
          isNeedModalOpenAgain: false,
          open: action.payload.open,
          partNumber: action.payload.partNumber,
          sellerId: action.payload.sellerId,
          sellerName: action.payload.sellerName,
          stockrecordId: action.payload.stockrecordId,
        },
      };
    case actionTypes.QUALITY_CHECK_MODAL_CLOSE:
      return updateObject(state, { qualityCheckModal: { ...state.qualityCheckModal, open: false } });
    case actionTypes.QUALITY_CHECK_R:
      return { ...state, qualityCheckModal: { ...state.qualityCheckModal, isSending: true } };
    case actionTypes.QUALITY_CHECK_S:
      return { ...state, qualityCheckModal: { ...state.qualityCheckModal, isSending: false } };
    case actionTypes.QUALITY_CHECK_F:
      return { ...state, qualityCheckModal: { ...state.qualityCheckModal, isSending: false } };
    case actionTypes.RFQ_RESPONSE_R:
      return { ...state, rfqResponse: { loading: true, error: false } };
    case actionTypes.RFQ_RESPONSE_S: {
      const res = action.response;
      const rfqs: RfqListBackendResponse = JSON.parse(JSON.stringify(state.rfqs));
      rfqs.results = rfqs.results.map((rfq) => {
        if (rfq.id === res.rfq) {
          return { ...rfq, response_rfq: [{ ...res }] };
        }
        return rfq;
      });
      return { ...state, rfqs, rfqResponse: { loading: false, error: false } };
    }
    case actionTypes.RFQ_RESPONSE_F:
      return { ...state, rfqResponse: { loading: false, error: true } };
    case actionTypes.CLEAR_RFQ_RESPONSE:
      return { ...state, rfqResponse: { loading: false, error: false } };
    case actionTypes.APPROVE_RESPONSE_S: {
      const res = action.response;
      const rfqs: RfqListBackendResponse = JSON.parse(JSON.stringify(state.rfqs));
      rfqs.results = rfqs.results.map((rfq) => {
        if (rfq.id === res.id) {
          return res;
        }
        return rfq;
      });
      return { ...state, rfqs };
    }
    case actionTypes.DELETE_RFQ_FROM_STORE: {
      const rfqId = action.payload;
      const rfqs: RfqListBackendResponse = JSON.parse(JSON.stringify(state.rfqs));
      rfqs.count -= 1;
      rfqs.results = rfqs.results.filter((item) => item.id !== rfqId);
      return { ...state, rfqs };
    }
    case actionTypes.RFQS_NEED_UPDATE:
      return updateObject(state, { rfqsNeedUpdate: state.rfqsNeedUpdate + 1 });
    case actionTypes.SAVE_RFQ_RESPONSE:
      return updateObject(state, {
        rfqResponseData: {
          ...state.rfqResponseData,
          [action.payload.id]: action.payload,
        },
      });
    case actionTypes.REMOVE_RFQ_RESPONSE: {
      const newData = { ...state.rfqResponseData };
      delete newData[action.payload];
      return updateObject(state, {
        rfqResponseData: newData,
      });
    }
    case actionTypes.CLEAR_SUPPLIER_RESPONSE_DATA:
      return updateObject(state, {
        rfqResponseData: {},
      });
    default:
      return state;
  }
}
