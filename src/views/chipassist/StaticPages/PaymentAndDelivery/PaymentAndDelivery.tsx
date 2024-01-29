import React, { useEffect } from "react";
import { Page } from "@src/components";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { Box, Container, Grid } from "@material-ui/core";
import constants from "@src/constants/constants";
import map from "@src/images/Homepage/icsearch/map.png";
import useStyles from "./styles";

const PaymentAndDelivery = () => {
  const { t } = useI18n("static_pages.payment_and_delivery");
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Page
      title={t("page_title", { name: constants.title })}
      description={t("page_description", { name: constants.title })}
    >
      <section className={classes.section}>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item md={6} xs={12}>
              <Box className={classes.imgWrapper} display="flex" alignItems="center" justifyContent="center">
                <img className={classes.map} src={map} alt="Map" />
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <h1>{t("title")}</h1>
              <h2>{t("payment_title")}</h2>
              <p>{t("payment_text_1")}</p>
              <p>{t("payment_text_2")}</p>
              <p>{t("payment_text_3")}</p>

              <h2>{t("delivery_title")}</h2>
              <p>{t("delivery_text")}</p>
              <h3>{t("pick_up_title")}</h3>
              <p>{t("pick_up_text")}</p>
              <h3>{t("delivery_service_title")}</h3>
              <p>{t("delivery_service_text")}</p>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Page>
  );
};

export default PaymentAndDelivery;
