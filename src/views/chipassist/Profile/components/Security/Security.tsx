import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Card, CardHeader, CardContent, CardActions, Grid, Button, Divider, TextField } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppTheme from "@src/theme/useAppTheme";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Security = () => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const { t } = useI18n("profile");

  const [values, setValues] = useState({
    password: "",
    confirm: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const valid = values.password && values.password === values.confirm;

  return (
    <Card className={clsx(classes.root)}>
      <CardHeader title={t("security.password_change")} />
      <Divider />
      <CardContent>
        <form>
          <Grid container spacing={3}>
            <Grid item md={4} sm={6} xs={12}>
              <TextField
                fullWidth
                label={t("security.password_new")}
                name="password"
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <TextField
                fullWidth
                label={t("security.password_confirm")}
                name="confirm"
                onChange={handleChange}
                type="password"
                value={values.confirm}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <Divider />
      <CardActions>
        <Button className={appTheme.buttonPrimary} disabled={!valid} variant="contained">
          {t("save_changes")}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Security;
