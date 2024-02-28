import { Dispatch } from "redux";
import * as actionTypes from "@src/store/authentication/authTypes";
import constants from "@src/constants/constants";
import { ApiClientInterface } from "@src/services/ApiClient";

declare global {
  interface Console {
    savedLogs: any[];
  }
}

// Actions object not used
export const feedbackActions = {
  inputSubject: (text: string) => ({ type: "@feedback/INPUT_SUBJECT", payload: text } as const),
  inputMessage: (text: string) => ({ type: "@feedback/INPUT_MESSAGE", payload: text } as const),
  uploadImages: (files: any[]) => ({ type: "@feedback/UPLOAD_IMAGES", payload: files } as const),
  clearForm: () => ({ type: "@feedback/CLEAR_FORM" } as const),
};

export function sendFeedbackMessageThunk(subject: string, data: { [key: string]: any } = {}, level = "info"): any {
  const formData = new FormData();
  formData.append("level", level);
  formData.append("subject", subject);

  let message = "";
  Object.entries(data).forEach((entr) => {
    if (typeof entr[1] !== "boolean" && !entr[1]) return;
    message += message ? ` ${entr[0]}: ${entr[1]};` : `${subject}; ${entr[0]}: ${JSON.stringify(entr[1])};`;
  });
  formData.append("message", message);

  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [actionTypes.FEEDBACK_R, actionTypes.FEEDBACK_S, actionTypes.FEEDBACK_F],
      promise: (client: ApiClientInterface) =>
        client
          .post("/register-user-feedback/", {
            data: formData,
          })
          .then((res: any) => {
            console.log("FEED:", res.data);
            return res.data;
          })
          .catch((e) => {
            console.log("***SEND_FEEDBACK_MESSAGE_ERROR", e);
            throw e;
          }),
    });
  };
}

export function feedbackAction(
  subject: string,
  message: string,
  level = "info",
  files: any[] = [],
  screenshots: any[] = [],
): any {
  const formData = new FormData();
  formData.append("subject", subject);
  formData.append("message", message);
  formData.append("level", level);
  files.map((file, index) => formData.append(`${index + 1}_image`, file));
  screenshots.map((file, index) => formData.append(`${index + 1}_screenshot`, file));

  let build;
  try {
    if (constants.builds) {
      build = constants.builds;
    } else {
      build = "empty";
    }
  } catch (ReferenceError) {
    build = "any";
  }

  const url = window.location.href;
  const { userAgent } = window.navigator;
  const dateTime = new Date().toString();
  /* eslint-disable */
  // @ts-ignore
  const version = `version: ${process.env.AWS_COMMIT_ID || COMMITHASH}; branch: ${
    // @ts-ignore
    process.env.AWS_BRANCH === "master" ? BRANCH : process.env.AWS_BRANCH
  }; mode: ${process.env.AWS_BRANCH === "master" ? "development" : "production"}; build: ${build}`;
  /* eslint-enable */
  if (!console.savedLogs) {
    console.savedLogs = [];
  }
  const consoleLogs =
    console.savedLogs && console.savedLogs.length > 10
      ? console.savedLogs.slice(console.savedLogs.length - 10)
      : console.savedLogs;

  const clientData = `
    url: ${url}; 
    email:${localStorage.getItem("email") || "not auth user"}; 
    userAgent: ${userAgent}; 
    dateTime: ${dateTime};
    ${version}; 
    ${consoleLogs.map((item, index) => {
      return `consoleLog_${index + 1}: ${JSON.stringify(item)}`;
    })}
  `;

  formData.append("clientdata", clientData);

  return (dispatch: Dispatch<any>) => {
    return dispatch({
      types: [actionTypes.FEEDBACK_R, actionTypes.FEEDBACK_S, actionTypes.FEEDBACK_F],
      promise: (client: ApiClientInterface) =>
        client
          .post("/register-user-feedback/", {
            data: formData,
          })
          .then((res: any) => {
            console.log("FEED:", res.data);
            return res.data;
          })
          .catch((e) => {
            console.log("***FEEDBACK_ERROR", e);
            throw e;
          }),
    });
  };
}

export function feedbackThunk(
  subject: string,
  message: string,
  level = "info",
  files: any[] = [],
  screenshots: any[] = [],
): any {
  return (dispatch: Dispatch<any>) => {
    return dispatch(feedbackAction(subject, message, level, files, screenshots));
  };
}

// Actions type
type PropertiesType<T> = T extends { [key: string]: infer U } ? U : any;
export type FeedbackActionsType = ReturnType<PropertiesType<typeof feedbackActions>>;
