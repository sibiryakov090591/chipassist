import React from "react";
import Modal from "@material-ui/core/Modal";
import { Backdrop, Hidden } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { sellerMessageModalClose, sellerMessageModalOpenAgainAfterLogin } from "@src/store/rfq/rfqActions";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useStyles as useRegisterStyles } from "@src/views/chipassist/HomeRestricted/styles";
import { useStyles as useRfqModalStyles } from "@src/views/chipassist/Rfq/components/RFQModal/RFQModalStyles";
import { Link, useLocation } from "react-router-dom";
import useAppTheme from "@src/theme/useAppTheme";
import SellerMessageForm from "@src/views/chipassist/Rfq/components/SellerMessageModal/SellerMessageForm/SellerMessageForm";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import clsx from "clsx";
import logo from "@src/images/logo/on_red.png";
import { ID_CHIPASSIST, ID_MASTER } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import { useStyles } from "./SellerMessageModalStyles";

const SellerMessageModal: React.FC = () => {
  const classes = useStyles();
  const registerClasses = useRegisterStyles();
  const rfqModalClasses = useRfqModalStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isChipAssist = [ID_MASTER, ID_CHIPASSIST].includes(constants.id);

  const { open, partNumber } = useAppSelector((state) => state.rfq.sellerMessageModal);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  const { t } = useI18n("rfq.seller_message");

  const handleClose = () => {
    dispatch(sellerMessageModalClose());
  };

  const singInHandler = () => {
    dispatch(sellerMessageModalOpenAgainAfterLogin());
    dispatch(sellerMessageModalClose());
  };

  return (
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
                {!isAuthenticated && (
                  <div className={rfqModalClasses.signIn}>
                    {t("restricted.description_1")}
                    <Link
                      onClick={singInHandler}
                      to={"/auth/login"}
                      className={rfqModalClasses.link}
                      state={{ background: location.state?.background || location }}
                    >
                      {t("restricted.sign_in")}
                    </Link>
                  </div>
                )}
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
                  <Link
                    onClick={singInHandler}
                    to={"/auth/login"}
                    className={`${appTheme.hyperlink} ${registerClasses.link}`}
                    state={{ background: location.state?.background || location }}
                  >
                    {t("restricted.sign_in")}
                  </Link>
                  {". "}
                </div>
              </Hidden>
            )}
            <SellerMessageForm onCloseModalHandler={handleClose} />
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default SellerMessageModal;
