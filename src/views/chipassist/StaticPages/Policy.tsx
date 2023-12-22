import React, { useEffect } from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";

const Policy = () => {
  const { t } = useI18n("policy");
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div style={{ padding: "30px 50px" }}>
      <h1>{t("h1")} ChipAssist AG</h1>

      <p>
        {t("p1.part1")} ChipAssist, {t("p1.part2.p1")} https://chipassist.com, {t("p1.part2.p2")}
      </p>

      <p>{t("p2")}</p>

      <p>
        {t("p3.p1")} <a href="https://www.privacypolicygenerator.info">Free Privacy Policy Generator</a>.
      </p>

      <h2>{t("consent")}</h2>

      <p>{t("by_using")}</p>

      <h2>{t("information")}</h2>

      <p>{t("p4")}</p>
      <p>{t("p5")}</p>
      <p>{t("p6")}</p>

      <h2>{t("how_we")}</h2>

      <p>{t("p7")}:</p>

      <ul style={{ marginLeft: 40 }}>
        <li>{t("list.li1")}</li>
        <li>{t("list.li2")}</li>
        <li>{t("list.li3")}</li>
        <li>{t("list.li4")}</li>
        <li>{t("list.li5")}</li>
        <li>{t("list.li6")}</li>
        <li>{t("list.li7")}</li>
      </ul>

      <h2>{t("log_files")}</h2>

      <p>ChipAssist {t("p8")}</p>

      <h2>{t("advertising")}</h2>

      <p>{t("p9")} ChipAssist.</p>

      <p>{t("p10")}</p>

      <p>
        {t("p11.p1")} ChipAssist {t("p11.p2")}
      </p>

      <h2>{t("third_party")}</h2>

      <p>ChipAssist`s {t("p12")} </p>

      <p>{t("p13")}</p>

      <h2>{t("CCPA")}</h2>

      <p>{t("p14")}:</p>
      <p>{t("p15")}</p>
      <p>{t("p16")}</p>
      <p>{t("p17")}</p>
      <p>{t("p18")}</p>

      <h2>{t("GDPR")}</h2>

      <p>{t("p19")}:</p>
      <p>{t("p20")}</p>
      <p>{t("p21")}</p>
      <p>{t("p22")}</p>
      <p>{t("p23")}</p>
      <p>{t("p24")}</p>
      <p>{t("p25")}</p>
      <p>{t("p26")}</p>
    </div>
  );
};

export default Policy;
