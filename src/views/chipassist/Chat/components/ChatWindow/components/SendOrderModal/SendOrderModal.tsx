import React from "react";
import { Backdrop } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import Fade from "@material-ui/core/Fade";
import { ChatListStock } from "@src/store/chat/chatTypes";
import { clsx } from "clsx";
import { useStyles } from "@src/views/chipassist/Chat/components/ChatWindow/components/SendOrderModal/styles";
import SendOrderModalContainer from "./components/SendOrderModalContainer";

interface Props {
  open: boolean;
  stock: ChatListStock;
  onCloseModal: () => void;
  setIsSending: any;
}

const SendOrderModal: React.FC<Props> = ({ open, stock, onCloseModal, setIsSending }) => {
  const commonClasses = useCommonStyles();
  const classes = useStyles();
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      className={commonClasses.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={clsx(commonClasses.paper, "fullScreen", classes.paper)}>
          <SendOrderModalContainer open={open} stock={stock} onCloseModal={onCloseModal} setIsSending={setIsSending} />
        </div>
      </Fade>
    </Modal>
  );
};

export default SendOrderModal;
