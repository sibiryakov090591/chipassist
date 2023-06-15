import React, { useEffect } from "react";
import { Page } from "@src/components";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useStyles from "@src/views/chipassist/StaticPages/FAQ/styles";
import { Accordion, AccordionDetails, AccordionSummary, Container, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const FAQ = () => {
  const { t } = useI18n("static_pages.faq");
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Page title={t("page_title")} description={t("page_description")}>
      <Container maxWidth={"lg"}>
        <h1 className={classes.title} style={{ marginTop: "1.2rem" }}>
          {t("header")}
        </h1>
      </Container>
      <section className={classes.section}>
        <Container maxWidth={"lg"}>
          <h2 className={classes.subTitle}>{t("subtitle_user")}</h2>
          <Grid container spacing={4} direction={"column"}>
            {[...Array(Number(t("users_questions_amount"))).keys()]
              .map((x) => x + 1)
              .map((element, key) => (
                <Grid item md={12} xs={12} key={key}>
                  <Accordion>
                    <AccordionSummary classes={{ root: classes.summaryRoot }} expandIcon={<AddIcon />}>
                      <p className={classes.question}>{t(`user_question_${element}`)}</p>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDescr}>
                      <p className={classes.answer}>{t(`user_answer_${element}`)}</p>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
          </Grid>
        </Container>
      </section>
      <section className={classes.section}>
        <Container maxWidth={"lg"}>
          <h2 className={classes.subTitle}>{t("subtitle_distributor")}</h2>
          <Grid container spacing={4} direction={"column"}>
            {[...Array(4).keys()]
              .map((x) => x + 1)
              .map((element, key) => (
                <Grid item md={12} xs={12} key={key}>
                  <Accordion>
                    <AccordionSummary classes={{ root: classes.summaryRoot }} expandIcon={<AddIcon />}>
                      <p className={classes.question}>{t(`distributor_question_${element}`)}</p>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDescr}>
                      <p className={classes.answer}>{t(`distributor_answer_${element}`)}</p>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            <Grid item md={12} xs={12}>
              <Accordion>
                <AccordionSummary classes={{ root: classes.summaryRoot }} expandIcon={<AddIcon />}>
                  <p className={classes.question}>{t(`distributor_question_5`)}</p>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDescr}>
                  <p className={classes.answer}>
                    {t(`distributor_answer_5_1`)}{" "}
                    <span className={classes.redColor}>{t("distributor_answer_5_2")}</span>
                    <br />
                    {t("distributor_answer_5_3")}
                  </p>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item md={12} xs={12}>
              <Accordion>
                <AccordionSummary classes={{ root: classes.summaryRoot }} expandIcon={<AddIcon />}>
                  <p className={classes.question}>{t(`distributor_question_6`)}</p>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDescr}>
                  <p className={classes.answer}>
                    {t(`distributor_answer_6_1_1`)} <br />
                    {t(`distributor_answer_6_1_2`)} <br />
                    {t(`distributor_answer_6_1_3`)} <br />
                    {t(`distributor_answer_6_1_4`)} <br />
                    {t("distributor_answer_6_2_1")} <br />
                    {t("distributor_answer_6_2_2")}
                    <a className={classes.redColor} href={`mailto:${t("distributor_answer_6_2_link")}`}>
                      {" "}
                      {t("distributor_answer_6_2_link")}
                    </a>
                  </p>
                </AccordionDetails>
              </Accordion>
            </Grid>
            {[...Array(Number(t("distributors_questions_amount")) - 6).keys()]
              .map((x) => x + 7)
              .map((element, key) => (
                <Grid item md={12} xs={12} key={key}>
                  <Accordion>
                    <AccordionSummary classes={{ root: classes.summaryRoot }} expandIcon={<AddIcon />}>
                      <p className={classes.question}>{t(`distributor_question_${element}`)}</p>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDescr}>
                      <p className={classes.answer}>{t(`distributor_answer_${element}`)}</p>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
          </Grid>
        </Container>
      </section>
    </Page>
  );
};

export default FAQ;
