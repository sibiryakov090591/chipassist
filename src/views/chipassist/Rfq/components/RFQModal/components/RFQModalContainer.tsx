import React from "react";
import { clsx } from "clsx";
import { Box, Divider, Hidden, Link } from "@material-ui/core";
import LoginForm from "@src/views/chipassist/Login/components/LoginForm/LoginForm";
import RFQForm from "@src/views/chipassist/Rfq/components/RFQForm/RFQForm";
import { useStyles } from "@src/views/chipassist/Rfq/components/RFQModal/RFQModalStyles";
import { useStyles as useRegisterStyles } from "@src/views/chipassist/HomeRestricted/styles";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppTheme from "@src/theme/useAppTheme";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "@src/store";
import { AnyAction } from "redux";
import logoCA from "@src/images/logo/on_red.png";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { ID_CHIPASSIST, ID_ICSEARCH, ID_MASTER } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import useAppSelector from "@src/hooks/useAppSelector";
import { batch } from "react-redux";
import { clearRfqItem, rfqModalClose } from "@src/store/rfq/rfqActions";
import { Link as RouterLink } from "react-router-dom";
import ResetForm from "@src/views/chipassist/Reset/components/ResetForm/ResetForm";
import NewPasswordForm from "@src/views/chipassist/Reset/components/NewPasswordForm/NewPasswordForm";

const isChipAssist = [ID_MASTER, ID_CHIPASSIST].includes(constants.id);
const isICSearch = constants.id === ID_ICSEARCH;
const logo = isChipAssist ? logoCA : `/${constants.logos.distPath}/${constants.logos.mainLogoDarkBack}`;

export const RFQModalContainer: React.FC<{ isAuth?: boolean; isLoginForm?: boolean; isExample?: boolean }> = ({
  isAuth,
  isLoginForm,
  isExample,
}) => {
  const classes = useStyles();
  const registerClasses = useRegisterStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();

  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useAppDispatch();

  const { rfqModalOpen, rfqItem } = useAppSelector((state) => state.rfq);
  let isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  isAuthenticated = isExample ? isAuth : isAuthenticated;

  const { t } = useI18n("rfq");
  const partNumber = rfqItem.prevPartNumber || rfqItem.partNumber || "00000000000000";

  const [showLoginForm, setShowLoginForm] = React.useState(isLoginForm);
  const [showResetForm, setShowResetForm] = React.useState(false);
  const [resetPasswordToken, setResetPasswordToken] = React.useState("");

  React.useEffect(() => {
    if (((isAuthenticated && showLoginForm) || rfqModalOpen) && !isExample) setShowLoginForm(false);
  }, [isAuthenticated, rfqModalOpen]);

  const handleClose = () => {
    if (!isExample) {
      batch(() => {
        dispatch(clearRfqItem());
        dispatch(rfqModalClose());
      });
    }
  };

  const showSignIn = (open: boolean) => () => {
    setShowLoginForm(open);
    setShowResetForm(false);
  };

  const showReset = (open: boolean) => (e: any) => {
    e.preventDefault();
    setShowResetForm(open);
  };

  const resetHandler = (resetToken: string) => {
    setResetPasswordToken(resetToken);
  };

  const newPasswordHandler = () => {
    batch(() => {
      setShowLoginForm(false);
      setShowResetForm(false);
      setResetPasswordToken("");
    });
  };

  return (
    <div
      className={isExample ? clsx(commonClasses.paper, "fullScreen", classes.container) : commonClasses.displayContents}
    >
      {(isChipAssist || isICSearch) && (
        <Hidden smDown>
          <div className={classes.logoContainer}>
            <div className={classes.signIn}>
              {!isAuthenticated && !showLoginForm && (
                <>
                  {t("restricted.description_1")}
                  <div onClick={showSignIn(true)} className={classes.link}>
                    {t("restricted.sign_in")}
                  </div>
                </>
              )}
              {!isAuthenticated && showLoginForm && (
                <div onClick={showSignIn(false)} className={classes.link}>
                  <DoubleArrowIcon /> {t("seller_message.back")}
                </div>
              )}
            </div>
            <img className={classes.logo} src={logo} alt="logo" />
          </div>
        </Hidden>
      )}
      <div className={classes.content}>
        {!showLoginForm ? (
          <>
            <h2
              className={classes.header}
              dangerouslySetInnerHTML={{
                __html: t("modal_header", {
                  interpolation: { escapeValue: false },
                  partNumber: partNumber.length > 20 ? `${partNumber.slice(0, 17)}...` : partNumber,
                  partNumberTitle: partNumber.length > 20 ? partNumber : null,
                  title: rfqItem.title === "order" ? t("order") : t("request"),
                }),
              }}
            />
            <p className={classes.text}>
              {t("modal_text_1")}
              <strong>{rfqItem.prevPartNumber || rfqItem.partNumber}</strong>
              {t("modal_text_2")}
            </p>
          </>
        ) : (
          <Hidden smDown>
            <h2 className={clsx(classes.header, { mobile: true })}>{t("login.sign_in")}</h2>
          </Hidden>
        )}
        {!isAuthenticated && (
          <Hidden mdUp>
            <div className={clsx(classes.signInMobile, { loginActive: showLoginForm })}>
              {!showLoginForm && t("restricted.description_1")}
              <span onClick={showSignIn(!showLoginForm)} className={`${appTheme.hyperlink} ${registerClasses.link}`}>
                {showLoginForm ? (
                  <span className={classes.backToRfq}>
                    <DoubleArrowIcon /> {t("seller_message.back")}
                  </span>
                ) : (
                  t("restricted.sign_in")
                )}
              </span>
            </div>
          </Hidden>
        )}
        {showLoginForm && !showResetForm && (
          <Box m="13px">
            <LoginForm className={null} isExample={isExample} />
            <Divider style={{ margin: "16px 0" }} />
            <Link
              align="center"
              component={RouterLink}
              onClick={showReset(true)}
              to={null}
              underline="always"
              variant="subtitle2"
              className={appTheme.hyperlink}
            >
              {t("login.forgot_password")}
            </Link>
          </Box>
        )}
        {showResetForm && (
          <Box m="13px">
            {resetPasswordToken ? (
              <NewPasswordForm token={resetPasswordToken} className={null} handler={newPasswordHandler} />
            ) : (
              <ResetForm className={null} handler={resetHandler} />
            )}
          </Box>
        )}
        {!showLoginForm && !showResetForm && (
          <RFQForm onCloseModalHandler={handleClose} isExample={isExample} isAuth={isAuth} />
        )}
      </div>
    </div>
  );
};

export default RFQModalContainer;
