import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { Page } from "@src/components";
import checkIsAuthenticated, { isAuthPage } from "@src/utils/auth";
import RegisterFormContainer from "@src/views/chipassist/Register/components/RegisterFormContainer";
import { useStyles } from "../Login/styles";

const Register: React.FC<{ isExample?: boolean }> = ({ isExample }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useI18n("register");

  useEffect(() => {
    if (checkIsAuthenticated()) {
      const previousLocation = localStorage.getItem("previousLocation");
      if (previousLocation && !isAuthPage(previousLocation)) {
        navigate(previousLocation);
      } else {
        navigate("/");
      }
    }
  }, []);

  return (
    <Page className={classes.root} title={t("title")} description={t("description")}>
      <RegisterFormContainer isExample={isExample} />
    </Page>
  );
};

export default Register;
