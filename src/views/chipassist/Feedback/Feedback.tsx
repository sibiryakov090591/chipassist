import React from "react";
import { Dialog, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import FeedbackForm from "@src/views/chipassist/Feedback/components/FeedbackForm/FeedbackForm";
import { useStyles } from "./FeedbackStyles";

interface FeedbackProps {
  open: boolean;
  onClose: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ open, onClose }) => {
  const classes = useStyles();
  const { t } = useI18n("feedback");

  return (
    <Dialog id="feedback-modal" className={classes.root} open={open} onClose={onClose}>
      <div className={classes.formContainer}>
        <Typography className={classes.formHeader} variant="h5" component="h5" gutterBottom>
          {t("title")}
        </Typography>
        <IconButton aria-label="close" onClick={onClose} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
        <FeedbackForm onClose={onClose} />
      </div>
    </Dialog>
  );
};

export default Feedback;
