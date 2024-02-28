import React from "react";
import { Typography, Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import theme from "@src/themes";
import { withJsErrorsCatch } from "@src/services/JsErrorsCatch";
import { TopBarEmpty } from "@src/layouts/HomePage/components/TopBar";
import { IS_BUILD, IS_PROD } from "@src/config";
import { feedbackThunk } from "@src/store/feedback/FeedbackActions";
import { getAuthToken } from "@src/utils/auth";
import Footer from "@src/components/Footer/Footer";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import image from "@src/images/Homepage/chip_computer_cpu.svg";
import { staticI18n } from "@src/services/I18nProvider/I18nProvider";
import constants from "@src/constants/constants";
import { ID_ELFARO, ID_ICSEARCH } from "@src/constants/server_constants";

const { t } = staticI18n("error");
const env = IS_PROD ? "PROD" : "DEV";
const email =
  constants.id === ID_ICSEARCH
    ? "info@icsearch.ru"
    : constants.id === ID_ELFARO
    ? "info@chiponline.tech"
    : "info@chipassist.com";

const useStyles = (thm) => ({
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  imageContainer: {
    marginTop: thm.spacing(6),
    display: "flex",
    justifyContent: "center",
  },
  image: {
    maxWidth: 150,
    width: "100%",
    filter: "invert(15%)",
  },
  button: {
    color: thm.palette.white,
    backgroundColor: thm.palette.app.green800,
    "&.Mui-disabled": {
      color: thm.palette.app.grey300,
      backgroundColor: thm.palette.app.grey200,
    },
    "&:hover": {
      backgroundColor: "rgb(67,198,169)", // green800
    },
    "&:active": {
      backgroundColor: thm.palette.app.green800,
    },
    "&:focus": {
      backgroundColor: thm.palette.app.green800,
    },
  },
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      info: null,
    };
  }

  componentDidCatch(error, info) {
    window.history.pushState(null, null, window.location.toString());
    window.addEventListener("popstate", this.onBackButtonEvent);
    this.setState({ error, info });
    // в билде реакт проекта всплытие ошибки не работает, поэтому error listener в withJsErrorsCatch не срабатывает,
    // а на дев сервере всплытие работает, такая вот философия от реакта.
    if (IS_BUILD && getAuthToken()) {
      this.props.dispatch(
        feedbackThunk(`${env} APP`, `${error.name}: ${error.message} ${info.componentStack}`, "error"),
      );
    }
  }

  onBackButtonEvent(e) {
    e.preventDefault();
    window.location = e.target.location;
  }

  goHome() {
    window.location = "/";
  }

  render() {
    const { error, info } = this.state;
    const { classes } = this.props;

    if (error) {
      return (
        <ThemeProvider theme={theme}>
          <div className={classes.wrapper}>
            <TopBarEmpty />
            <div
              style={{
                flex: "1 1 auto",
                margin: "50px auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ width: "fit-content" }}>
                <Typography align="center" variant="h3">
                  {t("error_boundary_title")}
                </Typography>
                <div className={classes.imageContainer}>
                  <img className={classes.image} src={image} alt="chip icon" />
                </div>
                {IS_PROD ? (
                  <Typography align="left" variant="h5">
                    <br />
                    <br />
                    <div dangerouslySetInnerHTML={{ __html: t("error_boundary_description", { email }) }} />
                    <br />
                  </Typography>
                ) : (
                  <Typography align="left" variant="h5">
                    <br />
                    <br />
                    <b>Version</b>: {process.env.AWS_COMMIT_ID || COMMITHASH}
                    <br />
                    <b>Error</b>: {error.toString()}
                    <br />
                    <b>URL</b>: {window.location.href}
                    <br />
                    <pre>{info.componentStack}</pre>
                  </Typography>
                )}
                <Typography align="center">
                  <br />
                  <br />
                  <Button className={classes.button} color="primary" variant="contained" onClick={this.goHome}>
                    {t("back")}
                  </Button>
                </Typography>
              </div>
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      );
    }

    return this.props.children;
  }
}

export default compose(withStyles(useStyles), withJsErrorsCatch)(ErrorBoundary);
