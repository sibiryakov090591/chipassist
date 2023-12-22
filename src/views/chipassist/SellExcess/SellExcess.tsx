import React from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { Page } from "@src/components";
import { Box, Container, Grid, Paper } from "@material-ui/core";
import constants from "@src/constants/constants";
import clsx from "clsx";
import icon from "@src/images/Homepage/chip_computer_cpu.svg";
import SellExcessForm from "@src/views/chipassist/SellExcess/components/SellExcessForm";
import useStyles from "./styles";

export const SellExcess = () => {
  const { t } = useI18n("sell_excess");
  const classes = useStyles();

  return (
    <Page
      title={t("page_title", { name: constants.title })}
      description={t("page_description", { name: constants.title })}
    >
      <section className={classes.top}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <h1 className={classes.topTitle}>
                <span className={classes.redColor}>ChipAssist</span> {t("title")}
              </h1>
              <p className={classes.paragraph}>{t("top.paragraph_1")}</p>
              <p className={classes.paragraph}>{t("top.paragraph_2")}</p>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box display="flex" justifyContent="center">
                <img className={classes.topImg} src={icon} alt="icon" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={clsx(classes.section, classes.sell)}>
        <Container maxWidth="lg">
          <h2 className={classes.sellTitle}>{t("why_sell.title")}</h2>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Paper className={classes.sellCard} elevation={3}>
                <h3 className={classes.sellCardTitle}>{t("why_sell.card_1.title")}</h3>
                <p className={classes.sellCardText}>{t("why_sell.card_1.text")}</p>
              </Paper>
            </Grid>
            <Grid item md={6} xs={12}>
              <Paper className={classes.sellCard} elevation={3}>
                <h3 className={classes.sellCardTitle}>{t("why_sell.card_2.title")}</h3>
                <p className={classes.sellCardText}>{t("why_sell.card_2.text")}</p>
              </Paper>
            </Grid>
            <Grid item md={6} xs={12}>
              <Paper className={classes.sellCard} elevation={3}>
                <h3 className={classes.sellCardTitle}>{t("why_sell.card_3.title")}</h3>
                <p className={classes.sellCardText}>{t("why_sell.card_3.text")}</p>
              </Paper>
            </Grid>
            <Grid item md={6} xs={12}>
              <Paper className={classes.sellCard} elevation={3}>
                <h3 className={classes.sellCardTitle}>{t("why_sell.card_4.title")}</h3>
                <p className={classes.sellCardText}>{t("why_sell.card_4.text")}</p>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={clsx(classes.section, classes.work)}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <Box className={classes.workTextWrapper}>
                <Box>
                  <h2 className={classes.workTitle}>
                    {t("how_works.title.p1")} <span className={classes.redColor}>{t("how_works.title.p2")}</span>
                  </h2>
                  <ul className={classes.ul}>
                    <li className={classes.li}>{t("how_works.li_1")}</li>
                    <li className={classes.li}>{t("how_works.li_2")}</li>
                    <li className={classes.li}>{t("how_works.li_3")}</li>
                    <li className={classes.li}>{t("how_works.li_4")}</li>
                  </ul>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <SellExcessForm />
            </Grid>
          </Grid>
        </Container>
      </section>
    </Page>
  );
};

export default SellExcess;
