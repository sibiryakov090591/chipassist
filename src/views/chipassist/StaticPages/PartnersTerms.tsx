import React from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";

const useStyles = makeStyles(() =>
  createStyles({
    list: {
      marginLeft: 40,
      marginBottom: 20,
    },
    decimalList: {
      listStyleType: "decimal",
    },
  }),
);

const PartnersTerms = () => {
  const classes = useStyles();
  const { t } = useI18n("partner_terms");
  return (
    <div style={{ padding: "30px 50px" }}>
      <h1 style={{ textAlign: "center" }}>
        {t("h1.p1")} <br /> ChipAssist {t("h1.p2")}
      </h1>
      <h2>{t("h1.p1")}:</h2>
      <ul className={classes.list}>
        <li>{t("terms.li1")}</li>
        <li>{t("terms.li2")}</li>
        <li>{t("terms.li3")}</li>
        <li>{t("terms.li4")}</li>
      </ul>
      <h2>{t("supplier_undertakes")}:</h2>
      <ul className={clsx(classes.list, classes.decimalList)}>
        <li>
          {t("list.li1")}:
          <ul className={clsx(classes.list, classes.decimalList)}>
            <li>{t("list.li1_subtitles.li1")}</li>
            <li>{t("list.li1_subtitles.li2")}</li>
            <li>{t("list.li1_subtitles.li3")}</li>
          </ul>
        </li>
        <li>
          {t("list.li2")}:
          <ul className={clsx(classes.list, classes.decimalList)}>
            <li>{t("list.li2_subtitles.li1")}</li>
            <li>{t("list.li2_subtitles.li2")}</li>
            <li>{t("list.li2_subtitles.li3")}</li>
            <li>{t("list.li2_subtitles.li4")}</li>
          </ul>
        </li>
        <li>
          {t("list.li3")}:
          <ul className={clsx(classes.list, classes.decimalList)}>
            <li>{t("list.li3_subtitles.li1")}</li>
            <li>{t("list.li3_subtitles.li2")}</li>
          </ul>
        </li>
        <li>
          {t("list.li4")}:
          <ul className={clsx(classes.list, classes.decimalList)}>
            <li>{t("list.li4_subtitles.li1")}</li>
            <li>{t("list.li4_subtitles.li2")}</li>
          </ul>
        </li>
        <li>
          {t("list.li5")}:
          <ul className={clsx(classes.list, classes.decimalList)}>
            <li>{t("list.li5_subtitles")}</li>
          </ul>
        </li>
      </ul>
      <p>{t("footer")}</p>
    </div>
  );
};

export default PartnersTerms;
