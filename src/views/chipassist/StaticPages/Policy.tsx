import React, { useEffect } from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";

const Policy = () => {
  const { t } = useI18n("policy");
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div style={{ padding: "30px 50px" }}>
      <h1>{t("h1")} Project</h1>

      <p>Policy...</p>
    </div>
  );
};

export default Policy;
