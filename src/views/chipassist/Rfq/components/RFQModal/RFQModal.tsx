import React from "react";
import { batch } from "react-redux";
import Modal from "@material-ui/core/Modal";
import { Backdrop, Hidden, Box } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { clearRfqItem, rfqModalClose } from "@src/store/rfq/rfqActions";
import { RootState } from "@src/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import RFQForm from "@src/views/chipassist/Rfq/components/RFQForm/RFQForm";
import { useStyles as useRegisterStyles } from "@src/views/chipassist/HomeRestricted/styles";
import useAppTheme from "@src/theme/useAppTheme";
import { ID_CHIPASSIST, ID_ELFARO, ID_MASTER } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import logo from "@src/images/logo/on_red.png";
import { clsx } from "clsx";
import LoginForm from "@src/views/chipassist/Login/components/LoginForm/LoginForm";
import { useStyles } from "./RFQModalStyles";

export default function RFQModalModal() {
  const classes = useStyles();
  const registerClasses = useRegisterStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useAppDispatch();
  const isElfaro = constants.id === ID_ELFARO;
  const isChipAssist = [ID_MASTER, ID_CHIPASSIST].includes(constants.id);

  const { rfqModalOpen, rfqItem } = useAppSelector((state) => state.rfq);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  const { t } = useI18n("rfq");
  const partNumber = rfqItem.prevPartNumber || rfqItem.partNumber;

  const [showLoginForm, setShowLoginForm] = React.useState(false);

  React.useEffect(() => {
    if ((isAuthenticated && showLoginForm) || rfqModalOpen) setShowLoginForm(false);
  }, [isAuthenticated, rfqModalOpen]);

  const handleClose = () => {
    batch(() => {
      dispatch(clearRfqItem());
      dispatch(rfqModalClose());
    });
  };

  const singInHandler = () => {
    setShowLoginForm(true);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={clsx(commonClasses.modal, "fullScreen")}
      open={rfqModalOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={rfqModalOpen}>
        <div className={clsx(commonClasses.paper, "fullScreen", classes.container)}>
          {isChipAssist && (
            <Hidden smDown>
              <div className={classes.logoContainer}>
                <div className={classes.signIn}>
                  {!isAuthenticated && (
                    <>
                      {t("restricted.description_1")}
                      <div onClick={singInHandler} className={classes.link}>
                        {t("restricted.sign_in")}
                      </div>
                    </>
                  )}
                </div>
                <img className={classes.logo} src={logo} alt="chipassist logo" />
              </div>
            </Hidden>
          )}
          <div className={classes.content}>
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
            {!isElfaro && (
              <p
                className={classes.text}
                dangerouslySetInnerHTML={{
                  __html: t("modal_text", {
                    interpolation: { escapeValue: false },
                    partNumber: rfqItem.prevPartNumber || rfqItem.partNumber,
                  }),
                }}
              />
            )}
            {!isAuthenticated && (
              <Hidden mdUp>
                <div className={classes.signInMobile}>
                  {t("restricted.description_1")}
                  <span onClick={singInHandler} className={`${appTheme.hyperlink} ${registerClasses.link}`}>
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
              <RFQForm onCloseModalHandler={handleClose} />
            )}
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
