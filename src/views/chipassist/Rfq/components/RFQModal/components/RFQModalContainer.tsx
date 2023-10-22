import React from "react";
import { clsx } from "clsx";
import { Box, Hidden } from "@material-ui/core";
import logo from "@src/images/logo/on_red.png";
import LoginForm from "@src/views/chipassist/Login/components/LoginForm/LoginForm";
import RFQForm from "@src/views/chipassist/Rfq/components/RFQForm/RFQForm";
import { useStyles } from "@src/views/chipassist/Rfq/components/RFQModal/RFQModalStyles";
import { useStyles as useRegisterStyles } from "@src/views/chipassist/HomeRestricted/styles";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppTheme from "@src/theme/useAppTheme";

export const RFQModalContainer: React.FC<{ isAuth?: boolean; isLoginForm?: boolean }> = ({ isAuth, isLoginForm }) => {
  const classes = useStyles();
  const registerClasses = useRegisterStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const { t } = useI18n("rfq");
  const partNumber = "000000000000000";

  return (
    <div className={clsx(commonClasses.paper, "fullScreen", classes.container)} style={{ width: "fit-content" }}>
      <Hidden smDown>
        <div className={classes.logoContainer}>
          <div className={classes.signIn}>
            {!isAuth && (
              <>
                {t("restricted.description_1")}
                <div className={classes.link}>{t("restricted.sign_in")}</div>
              </>
            )}
          </div>
          <img className={classes.logo} src={logo} alt="chipassist logo" />
        </div>
      </Hidden>
      <div className={classes.content}>
        <h2
          className={classes.header}
          dangerouslySetInnerHTML={{
            __html: t("modal_header", {
              interpolation: { escapeValue: false },
              partNumber: partNumber.length > 20 ? `${partNumber.slice(0, 17)}...` : partNumber,
              partNumberTitle: partNumber.length > 20 ? partNumber : null,
              title: t("request"),
            }),
          }}
        />

        {!isAuth && (
          <Hidden mdUp>
            <div className={classes.signInMobile}>
              {t("restricted.description_1")}
              <span className={`${appTheme.hyperlink} ${registerClasses.link}`}>{t("restricted.sign_in")}</span>
              {". "}
            </div>
          </Hidden>
        )}
        {isLoginForm ? (
          <Box m="13px">
            <LoginForm className={null} isExample={true} />
          </Box>
        ) : (
          <RFQForm
            onCloseModalHandler={() => {
              console.log("test");
            }}
            isExample={true}
          />
        )}
      </div>
    </div>
  );
};

export default RFQModalContainer;
