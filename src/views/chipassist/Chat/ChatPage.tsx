import React from "react";
import SupplierSelect from "@src/components/SupplierSelect/SupplierSelect";
import Chat from "./Chat";
import Page from "../../../components/Page";
import { useStyles } from "./styles";

const ChatPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Page title={"Messages - ChipAssist"} description={"Messages between buyers and sellers"} className={classes.page}>
      <section className={classes.section}>
        <SupplierSelect style={{ margin: 12 }} />

        <Chat />
      </section>
    </Page>
  );
};

export default ChatPage;
