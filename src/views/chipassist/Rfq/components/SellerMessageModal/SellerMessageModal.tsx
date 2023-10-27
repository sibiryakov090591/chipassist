import React from "react";
import Modal from "@material-ui/core/Modal";
import { Backdrop } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";

import { sellerMessageModalClose } from "@src/store/rfq/rfqActions";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";

import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import clsx from "clsx";

import SellerMessageContainer from "@src/views/chipassist/Rfq/components/SellerMessageModal/SellerMessageForm/SellerMessageContainer";

const SellerMessageModal = () => {
  const commonClasses = useCommonStyles();

  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state.rfq.sellerMessageModal);

  const handleClose = () => {
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
        <SellerMessageContainer />
      </Fade>
    </Modal>
  );
};

export default SellerMessageModal;
