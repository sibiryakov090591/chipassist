/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import React from "react";
import { Container } from "@material-ui/core";
import { Page } from "@src/components";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";

const PrivacyPolicy = () => {
  const { t } = useI18n("static_pages");
  return (
    <Page title="Privacy Policy" description="Privacy Policy">
      <Container maxWidth="xl">
        <h1>{t("privacy_policy.header")}</h1>
      </Container>
    </Page>
  );
};

export default PrivacyPolicy;
