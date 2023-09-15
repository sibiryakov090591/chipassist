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
                What is <span className={classes.redColor}>ChipAssist?</span>
              </h1>
            </Grid>
            <Grid item md={12} xs={12}>
              <h2 className={clsx(classes.title, classes.subTitle)}>{t("sub_header")}</h2>
            </Grid>
          </Grid>

          <Grid style={{ marginTop: 16 }} container spacing={4}>
            <Grid item md={6} xs={12}>
              <p className={classes.paragraph}>
                ChipAssist is the ultimate global marketplace for sourcing electronic parts and components. Our platform
                provides users with easy access to stock levels and costs from hundreds of international distributors of
                electronics by simply entering a manufacturer component number.
              </p>
            </Grid>
            <Grid item md={6} xs={12}>
              <p className={classes.paragraph}>
                ChipAssist offers more than just stock data to electronics professionals looking for thorough technical
                component data. Our extensive part specifications, datasheets, CAD models, images, and more are
                displayed, allowing customers to make faster purchasing decisions while still receiving accurate pricing
                and inventory availability comparisons from distributors.
              </p>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={clsx(classes.section, classes.tools)}>
        <Container maxWidth={"lg"}>
          <Grid container spacing={4} direction={"row"} alignItems={"center"} justify={"center"}>
            <Grid item md={12} xs={12}>
              <h2 className={clsx(classes.title, classes.subTitle)}>
                Experience the Power of <span className={classes.redColor}>{t("company_name")}s</span> Tools
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
                Join the <span className={classes.redColor}>ChipAssist</span> community now to maximize your ability to
                source electronic components. Experience a procurement process that is seamless, effective, and
                reliable.
              </p>
            </Grid>
            <Grid item md={12} xs={12}>
              <p className={classes.footerTitle}>
                For more information about data, search results, and using ChipAssist please click{" "}
                <NavLink className={classes.link} to={"/FAQ"}>
                  here
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
