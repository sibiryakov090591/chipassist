import React from "react";
import { Page } from "@src/components";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { Container, Grid } from "@material-ui/core";
import constants from "@src/constants/constants";
import useStyles from "@src/views/chipassist/StaticPages/AboutCompany/styles";
import { clsx } from "clsx";
import { NavLink } from "react-router-dom";

const AboutCompany = () => {
  const { t } = useI18n("static_pages.about_company");
  const classes = useStyles();

  return (
    <Page
      title={t("page_title", { name: constants.title })}
      description={t("page_description", { name: constants.title })}
      style={{ overflowX: "hidden" }}
    >
      <section className={classes.section}>
        <Container maxWidth="lg">
          <Grid container spacing={4} direction={"row"} alignItems={"center"} justify={"center"}>
            <Grid item md={6} xs={12}>
              <h1 className={classes.title}>
                {t("title")} <span className={classes.redColor}>ChipAssist?</span>
              </h1>
            </Grid>
            <Grid item md={12} xs={12}>
              <h2 className={clsx(classes.title, classes.subTitle)}>{t("sub_header")}</h2>
            </Grid>
          </Grid>

          <Grid style={{ marginTop: 16 }} container spacing={4}>
            <Grid item md={6} xs={12}>
              <p className={classes.paragraph}>{t("paragraph.first")}</p>
            </Grid>
            <Grid item md={6} xs={12}>
              <p className={classes.paragraph}>{t("paragraph.second")}</p>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={clsx(classes.section, classes.tools)}>
        <Container maxWidth={"lg"}>
          <Grid container spacing={4} direction={"row"} alignItems={"center"} justify={"center"}>
            <Grid item md={12} xs={12}>
              <h2 className={clsx(classes.title, classes.subTitle)}>
                {t("sub_title.p1")} <span className={classes.redColor}>{t("company_name")}s</span> {t("sub_title.p2")}
              </h2>
            </Grid>
          </Grid>
          <Grid container spacing={4} className={classes.toolGrid}>
            <Grid item md={4} xs={12}>
              <h3>{t("search_tool")}</h3>
              <p className={classes.paragraph}>{t("search_tool_description")}</p>
            </Grid>
            <Grid item md={4} xs={12}>
              <h3>{t("bom_tool")}</h3>
              <p className={classes.paragraph}>{t("bom_tool_description")}</p>
            </Grid>
            <Grid item md={4} xs={12}>
              <h3>{t("api_tool")}</h3>
              <p className={classes.paragraph}>{t("api_tool_description")}</p>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={classes.section}>
        <Container maxWidth={"lg"}>
          <Grid container spacing={6} direction={"column"}>
            <Grid item md={12} xs={12}>
              <p className={classes.footerTitle}>
                {t("footer.first.p1")} <span className={classes.redColor}>ChipAssist</span> {t("footer.first.p2")}
              </p>
            </Grid>
            <Grid item md={12} xs={12}>
              <p className={classes.footerTitle}>
                {t("footer.second.p1")}{" "}
                <NavLink className={classes.link} to={"/FAQ"}>
                  {t("footer.second.p2")}
                </NavLink>
              </p>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Page>
  );
};

export default AboutCompany;
