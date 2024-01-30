import React from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import Page from "@src/components/Page/Page";
import Container from "@material-ui/core/Container/Container";
import { useStyles } from "./styles";

const Brands: React.FC = () => {
  const { t } = useI18n("brands");
  const classes = useStyles();

  const { items, loaded } = useAppSelector((state) => state.manufacturers);

  return (
    <noindex>
      <Page title={t("page_title")} description={t("page_description")}>
        <Container maxWidth="xl">test</Container>
      </Page>
    </noindex>
  );
};

export default Brands;
