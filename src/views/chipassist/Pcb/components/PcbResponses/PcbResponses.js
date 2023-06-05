import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import PcbResponsesTable from "../PcbResponsesTable/PcbResponsesTable";
import { useStyles } from "./style.js";

function PcbResponses(props) {
  const { pcb, onClose } = props;
  const classes = useStyles();
  const { t } = useI18n("pcb");

  return (
    <Dialog aria-labelledby="pcb answers" onClose={onClose} open={true} fullWidth>
      <div className={classes.modalContent}>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h3">{t("sellers_responses")}</Typography>
        <Box mt={3}>
          <Paper>
            <PcbResponsesTable item={pcb} size="small" />
          </Paper>
        </Box>
      </div>
    </Dialog>
  );
}

export default PcbResponses;
