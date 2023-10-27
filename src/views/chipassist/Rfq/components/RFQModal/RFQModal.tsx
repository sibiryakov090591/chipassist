import React from "react";
import { batch } from "react-redux";
import Modal from "@material-ui/core/Modal";
import { Backdrop } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";

import { clearRfqItem, rfqModalClose } from "@src/store/rfq/rfqActions";
import { RootState } from "@src/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";

import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";

import { clsx } from "clsx";

import RFQModalContainer from "@src/views/chipassist/Rfq/components/RFQModal/components/RFQModalContainer";

export default function RFQModalModal() {
  const commonClasses = useCommonStyles();

  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useAppDispatch();

  const { rfqModalOpen } = useAppSelector((state) => state.rfq);

  const handleClose = () => {
    batch(() => {
      dispatch(clearRfqItem());
      dispatch(rfqModalClose());
    });
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
        <RFQModalContainer />
      </Fade>
    </Modal>
  );
}
