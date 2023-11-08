import React from "react";
import Modal from "@material-ui/core/Modal";
import { Backdrop } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import { sellerMessageModalClose } from "@src/store/rfq/rfqActions";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import clsx from "clsx";
import QualityCheckContainer from "@src/views/chipassist/Rfq/components/QualityCheckModal/QualityCheckForm/QualityCheckContainer";
import { useStyles as useRfqModalStyles } from "@src/views/chipassist/Rfq/components/RFQModal/RFQModalStyles";

const QualityCheckModal = () => {
  const commonClasses = useCommonStyles();
  const rfqModalClasses = useRfqModalStyles();

  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state.rfq.qualityCheckModal);

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
        <div className={clsx(commonClasses.paper, "fullScreen", rfqModalClasses.container)}>
          <QualityCheckContainer />
        </div>
      </Fade>
    </Modal>
  );
};

export default QualityCheckModal;
