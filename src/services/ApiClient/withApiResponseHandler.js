import React, { useEffect } from "react";
import axios from "axios";
import { batch } from "react-redux";
// import { init, captureMessage } from "@sentry/browser";
import { IS_PROD, INIT_ALERTS } from "@src/config";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { feedbackThunk } from "@src/store/feedback/FeedbackActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { getAuthToken } from "@src/utils/auth";

const feedback_url = "register-user-feedback";

// !!! Вместо данного компонента используется unhandledrejection в withJsErrorsCatch
// Axios не ловит ошиби внутри промисов, а unhandledrejection ловит и то и то

const withApiResponseHandler = (WrappedComponent) => {
  function ApiResponseHandler(props) {
    const dispatch = useAppDispatch();

    const sendAlertMessage = (message, type) => {
      batch(() => {
        dispatch(
          showBottomLeftMessageAlertAction({
            text: message,
            severity: type,
          }),
        );
      });
      console.log(`*** ERROR: ${message}`);
    };

    useEffect(() => {
      axios.interceptors.response.use(
        (response) => Promise.resolve(response),
        (error) => {
          const { message } = error.toJSON();
          const { url } = error.toJSON().config;

          const env = IS_PROD ? "PROD" : "DEV";
          if (getAuthToken()) {
            if (url.includes(feedback_url)) return Promise.reject(error);
            dispatch(feedbackThunk(`${env} Axios`, message.replace(/<\/?[^>]+(>|$)/g, ""), "error"));
          }
          if (!INIT_ALERTS) return Promise.reject(error);

          sendAlertMessage(`${message} <br/> ${url}`, "error");
          return Promise.reject(error);
        },
      );
    }, []);
    return <WrappedComponent {...props} />;
  }
  return ApiResponseHandler;
};

export default withApiResponseHandler;
