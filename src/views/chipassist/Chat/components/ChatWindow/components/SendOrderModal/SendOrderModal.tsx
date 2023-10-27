import React from "react";
import { Backdrop } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import Fade from "@material-ui/core/Fade";
import { ChatListStock } from "@src/store/chat/chatTypes";
import SendOrderModalContainer from "./components/SendOrderModalContainer";

interface Props {
  open: boolean;
  stock: ChatListStock;
  onCloseModal: () => void;
  setIsSending: any;
}

type FormValues = {
  company_name: string;
  first_name: string;
  last_name: string;
  country: string;
  line1: string; // address
  line4: string; // city
  postcode: string;
  phone_number_str: string;
  quantity: string;
  additional_notes: string;
};

const SendOrderModal: React.FC<Props> = ({ open, stock, onCloseModal, setIsSending }) => {
  const commonClasses = useCommonStyles();

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
        <div>
          <SendOrderModalContainer open={open} stock={stock} onCloseModal={onCloseModal} setIsSending={setIsSending} />
        </div>
      </Fade>
    </Modal>
  );
};

export default SendOrderModal;
