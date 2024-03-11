import React from "react";
import { connect } from "react-redux";
import { INIT_ALERTS, IS_PROD } from "@src/config";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { feedbackThunk } from "@src/store/feedback/FeedbackActions";

const env = IS_PROD ? "PROD" : "DEV";
const feedback_url = "register-user-feedback";

const block_messages = ["request_cancelled"];

const withJsErrorsCatch = (WrappedComponent) => {
  class JsErrorsCatch extends React.Component {
    componentDidMount() {
      // Google translate causes a bug in React v16 (Failed to execute 'insertBefore' on 'Node')
      // The code below fixes the bug ==================
      if (typeof Node === "function" && Node.prototype) {
        const originalRemoveChild = Node.prototype.removeChild;
        Node.prototype.removeChild = function newRemoveChild(child) {
          if (child.parentNode !== this) {
            if (console) {
              console.error("Cannot remove a child from a different parent", child, this);
            }
            return child;
          }
          // eslint-disable-next-line prefer-rest-params
          return originalRemoveChild.apply(this, arguments);
        };

        const originalInsertBefore = Node.prototype.insertBefore;
        Node.prototype.insertBefore = function newInsertBefore(newNode, referenceNode) {
          if (referenceNode && referenceNode.parentNode !== this) {
            if (console) {
              console.error("Cannot insert before a reference node from a different parent", referenceNode, this);
            }
            return newNode;
          }
          // eslint-disable-next-line prefer-rest-params
          return originalInsertBefore.apply(this, arguments);
        };
      }
      // ===============================================

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

        if (error && error?.response?.status !== 404 && (!url || !url.includes(feedback_url))) {
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
