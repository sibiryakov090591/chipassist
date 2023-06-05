import React, { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link, Box } from "@material-ui/core";
import { Page } from "@src/components";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import useAppTheme from "@src/theme/useAppTheme";
import constants from "@src/constants/constants";
import SuccessModal from "@src/views/chipassist/HomeRestricted/SuccessModal/SuccessModal";
import { ID_ELFARO } from "@src/constants/server_constants";
import clsx from "clsx";
import Form from "./Form/Form";
import { useStyles } from "./styles";

const HomeRestricted = () => {
  const { t } = useI18n("restricted");
  const appTheme = useAppTheme();
  const classes = useStyles();
  const location = useLocation();

  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const onCloseModal = () => {
    setSuccessModalOpen(false);
  };

  return (
    <Page title={t("page_title")} description={t("page_description")} className={classes.wrapper}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        className={clsx(classes.container, { [classes.elfaroContainer]: constants.id === ID_ELFARO })}
      >
        <h1 className={classes.title}>{t("title", { name: constants.title })}</h1>
        <Box className={classes.contentWrapper}>
          <Box style={{ lineHeight: "1.5" }}>
            {t("description_1")}
            <Link
              align="center"
              component={RouterLink}
              to={"/auth/login"}
              state={{ background: location.state?.background || location }}
              underline="always"
              className={`${appTheme.hyperlink} ${classes.link}`}
            >
              {t("sign_in")}
            </Link>
            {". "}
            <span>{t("description_2", { title: constants.title })}</span>
          </Box>
          <Box className={classes.formWrapper}>
            <Form showSuccessModal={() => setSuccessModalOpen(true)} />
            {successModalOpen && <SuccessModal onCloseModal={onCloseModal} />}
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default HomeRestricted;
