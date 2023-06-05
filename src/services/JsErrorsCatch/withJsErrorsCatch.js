import React from "react";
import { connect } from "react-redux";
import { INIT_ALERTS, IS_PROD } from "@src/config";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { feedbackThunk } from "@src/store/feedback/FeedbackActions";
import { getAuthToken } from "@src/utils/auth";

const env = IS_PROD ? "PROD" : "DEV";
const feedback_url = "register-user-feedback";

const block_messages = ["request_cancelled"];

const withJsErrorsCatch = (WrappedComponent) => {
  class JsErrorsCatch extends React.Component {
    componentDidMount() {
      window.onerror = (message, url, line, column, error) => {
        if (block_messages.includes(message)) {
          console.log("BLOCKED: ", message);
          return true;
        }
        console.log(`*** ERROR: ${message} ${url}`);
        if (INIT_ALERTS) {
          this.props.dispatch(
            showBottomLeftMessageAlertAction({
              text: `${message} <br/> ${url}`,
              severity: "error",
            }),
          );
        }

        if (error?.response?.status !== 404 && getAuthToken() && (!url || !url.includes(feedback_url))) {
          this.props.dispatch(
            feedbackThunk(
              `${env} APP`,
              `${message?.replace(/<\/?[^>]+(>|$)/g, "")} ${
                error.response?.data ? JSON.stringify(error.response?.data) : ""
              } ${error.stack}`,
              "error",
            ),
          );
        }
        return false;
      };

      window.addEventListener("unhandledrejection", (event) => {
        if (event.reason?.constructor?.name === "Cancel") {
          event.preventDefault();
          return true;
        }

        const url = (event.reason?.config && event.reason?.config?.url) || window.location.href;
        const args = [event.reason?.message, url, null, null, event.reason];

        window.onerror.apply(this, args);
        return true;
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return connect()(JsErrorsCatch);
};

export default withJsErrorsCatch;
