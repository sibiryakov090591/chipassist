import React from "react";
import { clsx } from "clsx";
import { Box, Hidden } from "@material-ui/core";
import logo from "@src/images/logo/on_red.png";
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
import useAppDispatch from "@src/hooks/useAppDispatch";
import { ID_CHIPASSIST, ID_MASTER } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import useAppSelector from "@src/hooks/useAppSelector";
import { batch } from "react-redux";
import { clearRfqItem, rfqModalClose } from "@src/store/rfq/rfqActions";

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
  const isChipAssist = [ID_MASTER, ID_CHIPASSIST].includes(constants.id);

  const { rfqModalOpen, rfqItem } = useAppSelector((state) => state.rfq);
  let isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  isAuthenticated = isExample ? isAuth : isAuthenticated;

  const { t } = useI18n("rfq");
  const partNumber = rfqItem.prevPartNumber || rfqItem.partNumber || "00000000000000";

  const [showLoginForm, setShowLoginForm] = React.useState(isLoginForm);

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
  };

  return (
    <div className={isExample ? clsx(commonClasses.paper, "fullScreen", classes.container) : ""}>
      {isChipAssist && (
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
                  <DoubleArrowIcon /> Back to RFQ
                </div>
              )}
            </div>
            <img className={classes.logo} src={logo} alt="chipassist logo" />
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
            <p
              className={classes.text}
              dangerouslySetInnerHTML={{
                __html: t("modal_text", {
                  interpolation: { escapeValue: false },
                  partNumber: rfqItem.prevPartNumber || rfqItem.partNumber,
                }),
              }}
            />
          </>
        ) : (
          <Hidden smDown>
            <h2 className={clsx(classes.header, { mobile: true })}>Sign in</h2>
          </Hidden>
        )}
        {!isAuthenticated && (
          <Hidden mdUp>
            <div className={clsx(classes.signInMobile, { loginActive: showLoginForm })}>
              {!showLoginForm && t("restricted.description_1")}
              <span onClick={showSignIn(!showLoginForm)} className={`${appTheme.hyperlink} ${registerClasses.link}`}>
                {showLoginForm ? (
                  <span className={classes.backToRfq}>
                    <DoubleArrowIcon /> Back to RFQ
                  </span>
                ) : (
                  t("restricted.sign_in")
                )}
              </span>
            </div>
          </Hidden>
        )}
        {showLoginForm ? (
          <Box m="13px">
            <LoginForm className={null} isExample={isExample} />
          </Box>
        ) : (
          <RFQForm onCloseModalHandler={handleClose} isExample={isExample} isAuth={isAuth} />
        )}
      </div>
    </div>
  );
};

export default RFQModalContainer;
