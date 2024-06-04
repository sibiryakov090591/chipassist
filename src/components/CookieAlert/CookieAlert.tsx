import React, { useState, useEffect } from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { Button, Checkbox, FormControlLabel, Container } from "@material-ui/core";
import useAppTheme from "@src/theme/useAppTheme";
import clsx from "clsx";
import { useStyles } from "./cookieAlertStyles";

const CookieAlert = () => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const { t } = useI18n("cookie");

  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [formState, setFormState] = useState({
    strictly: true,
    analytic: false,
    personalization: false,
  });

  useEffect(() => {
    if (!localStorage.getItem("cookie_accepted")) {
      setOpen(true);
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name) {
      setFormState((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  const onSubmit = () => {
    localStorage.setItem("cookie_accepted", "true");
    setOpen(false);
  };

  return (
    <div className={clsx(classes.cookie, { [classes.open]: open })}>
      <Container maxWidth="xl" className={classes.container}>
        {showDetails && (
          <>
            <div>
              <FormControlLabel
                name="strictly"
                control={<Checkbox disabled={true} checked={true} />}
                label={t("strictly")}
              />
              <FormControlLabel
                name="analytic"
                control={<Checkbox className={appTheme.checkbox} onChange={onChange} checked={formState.analytic} />}
                label={t("analytic")}
              />
              <FormControlLabel
                name="personalization"
                control={
                  <Checkbox className={appTheme.checkbox} onChange={onChange} checked={formState.personalization} />
                }
                label={t("personalization")}
              />
            </div>
            <div className={classes.buttons}>
              <Button disabled={!open} onClick={onSubmit} variant="contained" className={appTheme.buttonCreate}>
                {t("accept_selected")}
              </Button>
            </div>
          </>
        )}
        {!showDetails && (
          <>
            <div>{t("title")}</div>
            <div className={classes.buttons}>
              <Button disabled={!open} variant="contained" onClick={() => setShowDetails(true)}>
                {t("settings")}
              </Button>
              <Button disabled={!open} onClick={onSubmit} variant="contained" className={appTheme.buttonCreate}>
                {t("accept_all")}
              </Button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};
export default CookieAlert;
