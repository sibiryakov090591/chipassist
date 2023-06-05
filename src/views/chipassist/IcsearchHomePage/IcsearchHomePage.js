import React from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { Page } from "@src/components";
import { Box, Button, Container, Grid, Paper } from "@material-ui/core";
import constants from "@src/constants/constants";
import map from "@src/images/Homepage/icsearch/map.png";
import devices from "@src/images/Homepage/icsearch/devices.png";
import board from "@src/images/Homepage/board_aloupr.svg";
import clsx from "clsx";
import useAppTheme from "@src/theme/useAppTheme";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

export const IcsearchHomePage = () => {
  const { t } = useI18n("home");
  const classes = useStyles();
  const appTheme = useAppTheme();
  const navigate = useNavigate();

  const createPcbHandler = () => {
    navigate("/pcb");
  };

  return (
    <Page
      title={t("page_title", { name: constants.title })}
      description={t("page_description", { name: constants.title })}
    >
      <section className={classes.section}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <h1 className={classes.title}>{t("hero.title")}</h1>
              <p className={classes.paragraph}>{t("hero.paragraph_1")}</p>
              <p className={classes.paragraph}>{t("hero.paragraph_2")}</p>
              <p className={classes.paragraph}>{t("hero.paragraph_3")}</p>
              <p className={classes.paragraph}>{t("hero.paragraph_4")}</p>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box className={classes.imgWrapper} display="flex" alignItems="center" justifyContent="center">
                <img className={classes.mapImg} src={map} alt="world map" />
              </Box>
            </Grid>
          </Grid>
          <Grid className={classes.heroCardsWrapper} container spacing={4}>
            <Grid item md={4} xs={12}>
              <Paper className={classes.heroCard} elevation={3}>
                <Box className={classes.heroCardTitle}>10 000 000+</Box>
                <p className={classes.heroCardText}>{t("hero.card_1")}</p>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.heroCard} elevation={3}>
                <Box className={classes.heroCardTitle}>50+</Box>
                <p className={classes.heroCardText}>{t("hero.card_2")}</p>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.heroCard} elevation={3}>
                <Box className={classes.heroCardTitle}>100+</Box>
                <p className={classes.heroCardText}>{t("hero.card_3")}</p>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={clsx(classes.section, classes.work)}>
        <Container maxWidth="lg">
          <h1 className={clsx(classes.title, classes.workTitle)}>{t("work.title")}</h1>
          <p className={clsx(classes.paragraph, classes.workText)}>{t("work.paragraph")}</p>
          <Grid container spacing={4}>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Paper className={classes.workCard} elevation={3}>
                <Box>
                  <h2 className={classes.workCardTitle}>{t("work.card_1.title")}</h2>
                </Box>
                <p className={classes.workCardText}>{t("work.card_1.text")}</p>
              </Paper>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Paper className={classes.workCard} elevation={3}>
                <Box>
                  <h2 className={classes.workCardTitle}>{t("work.card_2.title")}</h2>
                </Box>
                <p className={classes.workCardText}>{t("work.card_2.text")}</p>
              </Paper>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Paper className={classes.workCard} elevation={3}>
                <Box>
                  <h2 className={classes.workCardTitle}>{t("work.card_3.title")}</h2>
                </Box>
                <p className={classes.workCardText}>{t("work.card_3.text")}</p>
              </Paper>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Paper className={classes.workCard} elevation={3}>
                <Box>
                  <h2 className={classes.workCardTitle}>{t("work.card_4.title")}</h2>
                </Box>
                <p className={classes.workCardText}>{t("work.card_4.text")}</p>
              </Paper>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Paper className={classes.workCard} elevation={3}>
                <Box>
                  <h2 className={classes.workCardTitle}>{t("work.card_5.title")}</h2>
                </Box>
                <p className={classes.workCardText}>{t("work.card_5.text")}</p>
              </Paper>
            </Grid>
            <Grid item lg={4} md={6} sm={12} xs={12}>
              <Paper className={classes.workCard} elevation={3}>
                <Box>
                  <h2 className={classes.workCardTitle}>{t("work.card_6.title")}</h2>
                </Box>
                <p className={classes.workCardText}>{t("work.card_6.text")}</p>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={classes.section}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item md={6} sm={12}>
              <Box className={classes.imgWrapper} display="flex" alignItems="center" justifyContent="center">
                <img className={classes.devicesImg} src={devices} alt="devices" />
              </Box>
            </Grid>
            <Grid item md={6} sm={12}>
              <h1 className={classes.title}>{t("search.title")}</h1>
              <p className={classes.paragraph}>{t("search.paragraph_1")}</p>
              <p className={classes.paragraph}>{t("search.paragraph_2")}</p>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={clsx(classes.section, classes.pcb)}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item md={8} xs={12}>
              <h1 className={clsx(classes.title, classes.pcbTitle)}>{t("pcb.title")}</h1>
              <p className={clsx(classes.paragraph, classes.pcbText)}>{t("pcb.paragraph_1")}</p>
              <p className={clsx(classes.paragraph, classes.pcbText)}>{t("pcb.paragraph_2")}</p>
              <Button onClick={createPcbHandler} className={appTheme.buttonPrimary} variant="contained">
                {t("pcb.button")}
              </Button>
            </Grid>
            <Grid item md={4} xs={12}>
              <Box className={classes.imgWrapper} display="flex" alignItems="center" justifyContent="center">
                <img className={classes.boardImg} src={board} alt="board" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Page>
  );
};

export default IcsearchHomePage;
