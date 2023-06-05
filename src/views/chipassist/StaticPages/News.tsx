/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import React from "react";
import { Container } from "@material-ui/core";
import { Page } from "@src/components";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";

const News = () => {
  const { t } = useI18n("static_pages");
  return (
    <Page title="News" description="News">
      <Container maxWidth="xl">
        <h1>{t("news.header")}</h1>
      </Container>
    </Page>
  );
};

export default News;
