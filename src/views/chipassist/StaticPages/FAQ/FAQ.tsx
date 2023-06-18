import React, { useEffect } from "react";
import { Page } from "@src/components";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useStyles from "@src/views/chipassist/StaticPages/FAQ/styles";
import { Container, Grid } from "@material-ui/core";
import { CustomAccordion } from "@src/views/chipassist/StaticPages/FAQ/components/CustomAccordion";

const FAQ = () => {
  const { t } = useI18n("static_pages.faq");
  const classes = useStyles();

  const userFAQ = [
    {
      label_question: "user_question_1",
      label_answer: "user_answer_1",
    },
    {
      label_question: "user_question_2",
      label_answer: "user_answer_2",
    },
    {
      label_question: "user_question_3",
      label_answer: "user_answer_3",
    },
    {
      label_question: "user_question_4",
      label_answer: "user_answer_4",
    },
    {
      label_question: "user_question_5",
      label_answer: "user_answer_5",
    },
  ];

  const distributoFAQPart1 = [
    {
      label_question: "distributor_question_1",
      label_answer: "distributor_answer_1",
    },
    {
      label_question: "distributor_question_2",
      label_answer: "distributor_answer_2",
    },
    {
      label_question: "distributor_question_3",
      label_answer: "distributor_answer_3",
    },
    {
      label_question: "distributor_question_4",
      label_answer: "distributor_answer_4",
    },
  ];

  const distributorFAQPart2 = [
    {
      label_question: "distributor_question_7",
      label_answer: "distributor_answer_7",
    },
    {
      label_question: "distributor_question_8",
      label_answer: "distributor_answer_8",
    },
  ];
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
            {userFAQ.map((element, key) => (
              <Grid item md={12} xs={12} key={key}>
                <CustomAccordion>
                  {{
                    summary: <p className={classes.question}>{t(element.label_question)}</p>,
                    details: <p className={classes.answer}>{t(element.label_answer)} </p>,
                  }}
                </CustomAccordion>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>
      <section className={classes.section}>
        <Container maxWidth={"lg"}>
          <h2 className={classes.subTitle}>{t("subtitle_distributor")}</h2>
          <Grid container spacing={4} direction={"column"}>
            {distributoFAQPart1.map((element, key) => (
              <Grid item md={12} xs={12} key={key}>
                <CustomAccordion>
                  {{
                    summary: <p className={classes.question}>{t(element.label_question)}</p>,
                    details: <p className={classes.answer}>{t(element.label_answer)} </p>,
                  }}
                </CustomAccordion>
              </Grid>
            ))}
            <Grid item md={12} xs={12}>
              <CustomAccordion>
                {{
                  summary: (
                    <>
                      <p className={classes.question}>{t(`distributor_question_5`)}</p>
                    </>
                  ),
                  details: (
                    <>
                      <p className={classes.answer}>
                        {t(`distributor_answer_5_1`)}{" "}
                        <span className={classes.redColor}>{t("distributor_answer_5_2")}</span>
                        <br />
                        {t("distributor_answer_5_3")}
                      </p>
                    </>
                  ),
                }}
              </CustomAccordion>
            </Grid>
            <Grid item md={12} xs={12}>
              <CustomAccordion>
                {{
                  summary: (
                    <>
                      <p className={classes.question}>{t(`distributor_question_6`)}</p>
                    </>
                  ),
                  details: (
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
                  ),
                }}
              </CustomAccordion>
            </Grid>
            {distributorFAQPart2.map((element, key) => (
              <Grid item md={12} xs={12} key={key}>
                <CustomAccordion>
                  {{
                    summary: <p className={classes.question}>{t(element.label_question)}</p>,
                    details: <p className={classes.answer}>{t(element.label_answer)} </p>,
                  }}
                </CustomAccordion>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>
    </Page>
  );
};

export default FAQ;
