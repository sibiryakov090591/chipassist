import React, { useState } from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import FeedbackIcon from "@material-ui/icons/Feedback";
import clsx from "clsx";
import useAppTheme from "@src/theme/useAppTheme";
import Feedback from "@src/views/chipassist/Feedback/Feedback";
import { useStyles } from "./feedbackButtonStyles";

const FeedbackButton: React.FC = () => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const { t } = useI18n();

  const [openFeedback, setOpenFeedback] = useState(false);

  const handleFeedback = () => {
    setOpenFeedback(!openFeedback);
  };

  const buttonClassName = `${classes.feedbackButton} ${openFeedback && classes.hideFeedbackButton}`;

  return (
    <>
      <div className={clsx(buttonClassName, appTheme.feedbackButton)} onClick={handleFeedback}>
        <FeedbackIcon />
        <span className={classes.buttonText}>{t("menu.feedback")}</span>
      </div>
      <Feedback open={openFeedback} onClose={handleFeedback} />
    </>
  );
};

export default FeedbackButton;
