import React from "react";
import { batch } from "react-redux";
import Modal from "@material-ui/core/Modal";
import { Backdrop } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { clearRfqItem, rfqModalClose, rfqModalOpenAgainAfterLogin } from "@src/store/rfq/rfqActions";
import { RootState } from "@src/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import RFQForm from "@src/views/chipassist/Rfq/components/RFQForm/RFQForm";
import { useStyles as useRegisterStyles } from "@src/views/chipassist/HomeRestricted/styles";
import { Link, useLocation } from "react-router-dom";
import useAppTheme from "@src/theme/useAppTheme";
import { ID_ELFARO } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { useStyles } from "./RFQModalStyles";

export default function RFQModalModal() {
  const classes = useStyles();
  const registerClasses = useRegisterStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useAppDispatch();
  const location = useLocation();
  const isElfaro = constants.id === ID_ELFARO;

  const { rfqModalOpen, rfqItem } = useAppSelector((state) => state.rfq);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  const { t } = useI18n("rfq");
  const partNumber = rfqItem.prevPartNumber || rfqItem.partNumber;

  const handleClose = () => {
    batch(() => {
      dispatch(clearRfqItem());
      dispatch(rfqModalClose());
    });
  };

  const singInHandler = () => {
    dispatch(rfqModalOpenAgainAfterLogin());
    dispatch(rfqModalClose());
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={commonClasses.modal}
      open={rfqModalOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={rfqModalOpen}>
        <div className={commonClasses.paper}>
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
            <div className={classes.signIn}>
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
          )}
          <RFQForm onCloseModalHandler={handleClose} />
        </div>
      </Fade>
    </Modal>
  );
}
