/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import React from "react";
import { Page } from "@src/components";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { Container } from "@material-ui/core";

const AboutCompany = () => {
  const { t } = useI18n("static_pages");

  return (
    <Page title="About Company" description="About Company">
      <Container maxWidth="xl">
        <h1>{t("about_company.header")}</h1>
      </Container>
    </Page>
  );
};

export default AboutCompany;
