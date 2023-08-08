import React, { useEffect } from "react";
import { Page } from "@src/components";
import { Container } from "@material-ui/core";
import RFQListForm from "@src/views/chipassist/RfqList/components/Form/RFQListForm";
import { useStyles } from "./styles";

export const RFQList = () => {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Page title={"Send group RFQs | ChipAssist"} description={"Send group RFQs to 100+ suppliers with ChipAssist"}>
      <Container maxWidth={"xl"} className={classes.container}>
        <RFQListForm />
      </Container>
    </Page>
  );
};

export default RFQList;
