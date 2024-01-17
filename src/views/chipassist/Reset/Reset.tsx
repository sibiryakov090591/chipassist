import React, { useEffect } from "react";
import { Link as RouterLink, useLocation, useParams, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Divider, Hidden, Link, Typography } from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import checkIsAuthenticated from "@src/utils/auth";
import { title } from "@src/constants/defaults";
import { Page } from "@src/components";
import constants from "@src/constants/constants";
import { ID_ELFARO, ID_ICSEARCH, ID_SUPPLIER_RESPONSE } from "@src/constants/server_constants";
import useAppTheme from "@src/theme/useAppTheme";
import { showRegisterModalAction } from "@src/store/alerts/alertsActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import NewPasswordForm from "./components/NewPasswordForm/NewPasswordForm";
import ResetForm from "./components/ResetForm/ResetForm";
import { useStyles } from "./styles";
import { useStyles as useLoginStyles } from "../Login/styles";

const logo_img = `/${constants.logos.distPath}/${constants.logos.mainLogoDarkBack}`;

const Reset = () => {
  const classes = useStyles();
  const loginClasses = useLoginStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { t } = useI18n("reset");
  const location = useLocation();

  const isNotICSearch = constants.id !== "icsearch";

  useEffect(() => {
    if (checkIsAuthenticated()) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const onSignUpHandler = (e: any) => {
    if (constants.id === ID_SUPPLIER_RESPONSE) {
      e.preventDefault();
      dispatch(showRegisterModalAction());
    }
  };

  return (
    <Page className={classes.root} title={t("title")} description={t("description")}>
      {token ? (
        <Card className={classes.card}>
          <CardMedia className={classes.requestMedia}>
            <Typography color="inherit" variant="h1" style={{ marginBottom: 10 }}>
              {t("after_request.title")}
            </Typography>
            <Hidden xsDown>
              <Typography color="inherit" variant="h3" style={{ fontSize: 18, marginBottom: 7 }}>
                {t("after_request.description")}
              </Typography>
              <ul className={classes.list}>
                <li>{t("after_request.li_1")}</li>
                <li>{t("after_request.li_2")}</li>
                <li>{t("after_request.li_3")}</li>
                {isNotICSearch && <li>{t("after_request.li_4", { name: constants.title })}</li>}
              </ul>
            </Hidden>
          </CardMedia>
          <CardContent className={classes.requestContent}>
            <LockOpenIcon className={loginClasses.icon} />
            <NewPasswordForm token={token} className={classes.resetForm} />
          </CardContent>
        </Card>
      ) : (
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <LockOpenIcon className={loginClasses.icon} />
            <Typography style={{ marginBottom: 24 }} gutterBottom variant="h3">
              {t("reset_password")}
            </Typography>
            <ResetForm className={classes.resetForm} />
            <Divider className={loginClasses.divider} />
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Link
                component={RouterLink}
                onClick={onSignUpHandler}
                to={"/auth/registration"}
                state={{ background: location.state?.background || location }}
                className={appTheme.hyperlink}
              >
                {t("dont_have_account")}
              </Link>
            </Box>
          </CardContent>
          <CardMedia
            className={classes.media}
            // eslint-disable-next-line global-require
            image={constants.id === ID_ICSEARCH ? require("@src/images/auth.png") : ""}
          >
            {constants.id === ID_ELFARO ? (
              <>
                <a target="_blank" rel="noreferrer" href="https://chiponline.tech/">
                  <img style={{ height: 28 }} className={loginClasses.logo} src={logo_img} alt="ChipOnline" />
                </a>
                <Typography color="inherit" variant="subtitle1">
                  {t("cover_text", { title })}
                </Typography>
              </>
            ) : (
              <>
                {constants.id !== ID_ICSEARCH && (
                  <img className={loginClasses.logo} src={logo_img} alt="Chipassist logo" />
                )}
                <Typography color="inherit" variant="subtitle1">
                  {t("cover_text", { title })}
                </Typography>
              </>
            )}
          </CardMedia>
        </Card>
      )}
    </Page>
  );
};

export default Reset;
