import React from "react";
import SupplierSelect from "@src/components/SupplierSelect/SupplierSelect";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { clearChat } from "@src/store/chat/chatActions";
import Chat from "./Chat";
import Page from "../../../components/Page";
import { useStyles } from "./styles";

const ChatPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const beforeChange = () => {
    dispatch(clearChat());
  };

  return (
    <Page title={"Messages - ChipAssist"} description={"Messages between buyers and sellers"} className={classes.page}>
      <section className={classes.section}>
        <SupplierSelect style={{ margin: 12 }} hidden={true} beforeChange={beforeChange} />

        <Chat />
      </section>
    </Page>
  );
};

export default ChatPage;
