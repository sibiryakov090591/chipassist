import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import * as Sentry from "@sentry/react";
import { Typography, Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "@src/themes";
import { IS_PROD } from "@src/config";
import { withJsErrorsCatch } from "@src/services/JsErrorsCatch";
import { TopBarEmpty } from "@src/layouts/HomePage/components/TopBar";

const fallback_template = ({ error, componentStack }) => {
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    window.location = e.target.location;
  };

  window.history.pushState(null, null, window.location.toString());
  window.addEventListener("popstate", onBackButtonEvent);

  const goHome = () => {
    window.location = "/";
  };

  return (
    <ThemeProvider theme={theme}>
      <TopBarEmpty />
      <div style={{ marginTop: 50, display: "flex", justifyContent: "center" }}>
        <div style={{ width: "fit-content" }}>
          <Typography align="center" variant="h3">
            500: Ooops, something went wrong!
          </Typography>
          <Typography align="left" variant="h5">
            <br />
            <br />
            <b>Version</b>: {process.env.AWS_COMMIT_ID || COMMITHASH}
            <br />
            <b>Error</b>: {error.toString()}
            <br />
            <b>URL</b>: {window.location.href}
            <br />
            {!IS_PROD && <pre>{componentStack}</pre>}
          </Typography>
          <Typography align="center">
            <br />
            <br />
            <Button color="primary" variant="outlined" onClick={goHome}>
              Back to home
            </Button>
          </Typography>
        </div>
      </div>
    </ThemeProvider>
  );
};

class ErrorAppCrushSentry extends Sentry.ErrorBoundary {
  constructor(props) {
    super(props);
    this.fallback = fallback_template;
  }

  componentDidUpdate() {
    return true;
  }

  render() {
    const { fallback } = this;
    // eslint-disable-next-line no-underscore-dangle
    const _a = this.state;
    const { error } = _a;
    const { componentStack } = _a;
    const { eventId } = _a;
    if (error) {
      if (React.isValidElement(fallback)) {
        return fallback;
      }
      if (typeof fallback === "function") {
        return fallback({
          error,
          componentStack,
          resetError: this.resetErrorBoundary,
          eventId,
        });
      }
      // Fail gracefully if no fallback provided
      return null;
    }

    return this.props.children;
  }
}

export default compose(withJsErrorsCatch, connect(null, null))(ErrorAppCrushSentry);
