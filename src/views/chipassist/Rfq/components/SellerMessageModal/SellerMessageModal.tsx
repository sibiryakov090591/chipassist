import React from "react";
import Modal from "@material-ui/core/Modal";
import { Backdrop, Box, Hidden } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { sellerMessageModalClose } from "@src/store/rfq/rfqActions";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useStyles as useRegisterStyles } from "@src/views/chipassist/HomeRestricted/styles";
import { useStyles as useRfqModalStyles } from "@src/views/chipassist/Rfq/components/RFQModal/RFQModalStyles";
import useAppTheme from "@src/theme/useAppTheme";
import SellerMessageForm from "@src/views/chipassist/Rfq/components/SellerMessageModal/SellerMessageForm/SellerMessageForm";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import clsx from "clsx";
import logo from "@src/images/logo/on_red.png";
import { ID_CHIPASSIST, ID_MASTER } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import LoginForm from "@src/views/chipassist/Login/components/LoginForm/LoginForm";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { useStyles } from "./SellerMessageModalStyles";

const SellerMessageModal: React.FC<{ isExample: boolean }> = ({ isExample }) => {
  const classes = useStyles();
  const registerClasses = useRegisterStyles();
  const rfqModalClasses = useRfqModalStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const isChipAssist = [ID_MASTER, ID_CHIPASSIST].includes(constants.id);

  const { open, partNumber } = useAppSelector((state) => state.rfq.sellerMessageModal);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  const { t } = useI18n("rfq.seller_message");

  const [showLoginForm, setShowLoginForm] = React.useState(false);

  React.useEffect(() => {
    if ((isAuthenticated && showLoginForm) || open) setShowLoginForm(false);
  }, [isAuthenticated, open]);

  const handleClose = () => {
    dispatch(sellerMessageModalClose());
  };

  const showSignIn = (show: boolean) => () => {
    setShowLoginForm(show);
  };

  return !isExample ? (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={clsx(commonClasses.modal, "fullScreen")}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={clsx(commonClasses.paper, "fullScreen", rfqModalClasses.container)}>
          {isChipAssist && (
            <Hidden smDown>
              <div className={rfqModalClasses.logoContainer}>
                <div className={rfqModalClasses.signIn}>
                  {!isAuthenticated && !showLoginForm && (
                    <>
                      {t("restricted.description_1")}
                      <div onClick={showSignIn(true)} className={rfqModalClasses.link}>
                        {t("restricted.sign_in")}
                      </div>
                    </>
                  )}
                  {!isAuthenticated && showLoginForm && (
                    <div onClick={showSignIn(false)} className={rfqModalClasses.link}>
                      <DoubleArrowIcon /> Back to RFQ
                    </div>
                  )}
                </div>
                <img className={rfqModalClasses.logo} src={logo} alt="chipassist logo" />
              </div>
            </Hidden>
          )}
          <div className={rfqModalClasses.content}>
            {!showLoginForm ? (
              <>
                <h2 className={classes.header}>{t("title")}</h2>
                <p
                  className={classes.text}
                  dangerouslySetInnerHTML={{
                    __html: t("text", {
                      interpolation: { escapeValue: false },
                      mpn: partNumber,
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
                <div className={clsx(rfqModalClasses.signInMobile, { loginActive: showLoginForm })}>
                  {!showLoginForm && t("restricted.description_1")}
                  <span
                    onClick={showSignIn(!showLoginForm)}
                    className={`${appTheme.hyperlink} ${registerClasses.link}`}
                  >
                    {showLoginForm ? (
                      <span className={rfqModalClasses.backToRfq}>
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
                <LoginForm className={null} />
              </Box>
            ) : (
              <SellerMessageForm onCloseModalHandler={handleClose} />
            )}
          </div>
        </div>
      </Fade>
    </Modal>
  ) : (
    <>
      <div className={clsx(commonClasses.paper, "fullScreen", rfqModalClasses.container)}>
        {isChipAssist && (
          <Hidden smDown>
            <div className={rfqModalClasses.logoContainer}>
              <div className={rfqModalClasses.signIn}>
                {!isAuthenticated && (
                  <>
                    {t("restricted.description_1")}
                    <div onClick={showSignIn(false)} className={rfqModalClasses.link}>
                      {t("restricted.sign_in")}
                    </div>
                  </>
                )}
              </div>
              <img className={rfqModalClasses.logo} src={logo} alt="chipassist logo" />
            </div>
          </Hidden>
        )}
        <div className={rfqModalClasses.content}>
          <h2 className={classes.header}>{t("title")}</h2>
          <p
            className={classes.text}
            dangerouslySetInnerHTML={{
              __html: t("text", {
                interpolation: { escapeValue: false },
                mpn: partNumber,
              }),
            }}
          />
          {!isAuthenticated && (
            <Hidden mdUp>
              <div className={rfqModalClasses.signInMobile}>
                {t("restricted.description_1")}
                <span onClick={showSignIn(false)} className={`${appTheme.hyperlink} ${registerClasses.link}`}>
                  {t("restricted.sign_in")}
                </span>
                {". "}
              </div>
            </Hidden>
          )}
          {showLoginForm ? (
            <Box m="13px">
              <LoginForm className={null} />
            </Box>
          ) : (
            <SellerMessageForm onCloseModalHandler={handleClose} isExample={isExample} />
          )}
        </div>
      </div>
    </>
  );
};

export default SellerMessageModal;
