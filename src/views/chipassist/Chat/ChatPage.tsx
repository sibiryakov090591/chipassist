import React from "react";
import { Container } from "@material-ui/core";
import { useStyles } from "./styles";
import Page from "../../../components/Page";
import Chat from "./Chat";

const ChatPage: React.FC = () => {
  const classes = useStyles();

  return (
    <Page title={"Chat"} description={"Chat with buyers"}>
      <section className={classes.section}>
        <Container maxWidth="xl">
          <Chat />
        </Container>
      </section>
    </Page>
  );
};

export default ChatPage;
