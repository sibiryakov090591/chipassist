import React, { useEffect } from "react";
import { Page } from "@src/components";
import { Container, Box } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import { getConstants } from "@src/store/pcb/pcbActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import PcbRequest from "../Pcb/PcbRequest/PcbRequest";
import { useStyles } from "./styles";

const Pcb: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { t } = useI18n("pcb_new");

  useEffect(() => {
    dispatch(getConstants());
  }, []);

  return (
    <Page title={t("page_title")} description={t("page_description")}>
      <Container maxWidth="xl">
        <Box mt={5} mb={5}>
          <div className={classes.text}>
            {constants.id === ID_ICSEARCH ? (
              <>
                <h1 className={classes.titleIC}>{t("title")}</h1>
                <Box className={classes.paragraphIC}>{t("description_1")}</Box>
                <Box className={classes.paragraphIC}>{t("description_2")}</Box>
              </>
            ) : (
              <>
                <h1 className={classes.titleCA}>{t("title")}</h1>
                <Box className={classes.paragraphCA}>{t("description_1")}</Box>
                <Box style={{ fontSize: 14, marginBottom: "2em" }} className={classes.paragraphCA}>
                  {t("description_2")}
                </Box>
              </>
            )}
          </div>
          <PcbRequest />
        </Box>
      </Container>
    </Page>
  );
};

export default Pcb;
