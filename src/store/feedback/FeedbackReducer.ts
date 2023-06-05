import { updateObject } from "@src/utils/utility";
import { FeedbackState } from "./FeedbackTypes";
import { FeedbackActionsType } from "./FeedbackActions";

const initialState: FeedbackState = {
  subject: "",
  message: "",
  uploadImages: [],
};

// this reducer not used!
const feedbackReducer = (state = initialState, action: FeedbackActionsType) => {
  switch (action.type) {
    case "@feedback/INPUT_SUBJECT": {
      return updateObject(state, {
        subject: action.payload,
      });
    }
    case "@feedback/INPUT_MESSAGE": {
      return updateObject(state, {
        message: action.payload,
      });
    }
    case "@feedback/UPLOAD_IMAGES": {
      return updateObject(state, {
        uploadImages: [...state.uploadImages, ...action.payload],
      });
    }
    case "@feedback/CLEAR_FORM": {
      return updateObject(state, initialState);
    }
    default:
      return state;
  }
};

export default feedbackReducer;
