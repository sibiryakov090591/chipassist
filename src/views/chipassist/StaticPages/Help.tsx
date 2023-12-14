/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import React from "react";
import { Container } from "@material-ui/core";
import { Page } from "@src/components";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";

const About = () => {
  const { t } = useI18n("static_pages");
  return (
    <Page title="About" description="About">
      <Container maxWidth="xl">
        <h1>{t("help.header")}</h1>
      </Container>
    </Page>
  );
};

export default Help;
