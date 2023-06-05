/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import React from "react";
import { Container } from "@material-ui/core";
import { Page } from "@src/components";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";

const UserAgreement = () => {
  const { t } = useI18n("static_pages");
  return (
    <Page title="User Agreement" description="User Agreement">
      <Container maxWidth="xl">
        <h1>{t("user_agreement.header")}</h1>
      </Container>
    </Page>
  );
};

export default UserAgreement;
