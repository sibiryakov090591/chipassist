import React, { useState, useEffect, Fragment } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  Divider,
  CircularProgress,
  Theme,
} from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppTheme from "@src/theme/useAppTheme";
import { loadMiscAction, saveMiscAction, updateMiscAction } from "@src/store/misc/miscActions";
import { batch } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import SuccessSnackbar from "@src/views/chipassist/Profile/components/General/components/SuccessSnackbar";
import { hideUpdateSuccess } from "@src/store/profile/profileActions";
import { AppTheme } from "@src/themes/AppTheme";

interface Misc {
  email: boolean;
  push: boolean;
  text: boolean;
  phone: boolean;
  chat_email: boolean;
  chat_push: boolean;
}

const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  root: {},
  cardHeader: {
    backgroundColor: theme.palette.app.blue800,
    "& .MuiCardHeader-title": {
      color: "white",
    },
  },
  item: {
    display: "flex",
    flexDirection: "column",
  },
}));

const getMiscName = (id: number) => `profile_${id}`;

const Notifications = () => {
  const [miscCreated, setMiscCreated] = useState(false);
  const [misc, setMisc] = useState<Misc>({
    email: true,
    push: false,
    text: true,
    phone: true,
    chat_email: true,
    chat_push: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const appTheme = useAppTheme();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const profileId = useAppSelector((state) => state.profile?.profileInfo?.id);
  const showUpdateSuccess = useAppSelector((state) => state.profile.showUpdateSuccess);
  const { t } = useI18n("profile");

  useEffect(
    () => () => {
      dispatch(hideUpdateSuccess());
    },
    [],
  );

  useEffect(() => {
    if (profileId)
      (dispatch(loadMiscAction(getMiscName(profileId))) as any).then((res: any) => {
        if (res) {
          batch(() => {
            setMiscCreated(true);
            setMisc(res.data);
          });
        }
        setIsLoading(false);
      });
  }, [profileId]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.currentTarget;
    setMisc((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = [...event.currentTarget.elements] as HTMLInputElement[];
    let data = {};
    formData.forEach((val) => {
      if (!val.name) return;
      data = { ...data, [val.name]: val.checked };
    });
    setIsSaving(true);
    if (miscCreated) {
      dispatch(updateMiscAction(getMiscName(profileId), data)).then(() => setIsSaving(false));
      setMisc(data as Misc);
    } else {
      dispatch(saveMiscAction(getMiscName(profileId), data)).then(() => {
        batch(() => {
          setMiscCreated(true);
          setMisc(data as Misc);
          setIsSaving(false);
        });
      });
    }
  };

  const handleSnackbarClose = () => {
    dispatch(hideUpdateSuccess());
  };

  return (
    <Card className={clsx(classes.root)}>
      <form onSubmit={handleSubmit}>
        <CardHeader className={classes.cardHeader} title={t("notifications.title")} />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid className={classes.item} item md={4} sm={6} xs={12}>
              <Typography gutterBottom variant="h6">
                {t("notifications.system")}
              </Typography>
              <Typography gutterBottom variant="body2">
                {t("notifications.system_info")}
              </Typography>
              {isLoading ? (
                <Skeleton style={{ height: 39 }} />
              ) : (
                <FormControlLabel
                  name="email"
                  control={<Checkbox className={appTheme.checkbox} onChange={onChange} checked={misc.email} />}
                  label={t("notifications.email_alerts")}
                />
              )}
              {isLoading ? (
                <Skeleton style={{ height: 39 }} />
              ) : (
                <FormControlLabel
                  name="push"
                  control={<Checkbox className={appTheme.checkbox} onChange={onChange} checked={misc.push} />}
                  label={t("notifications.push")}
                />
              )}
              {isLoading ? (
                <Skeleton style={{ height: 39 }} />
              ) : (
                <FormControlLabel
                  name="text"
                  control={<Checkbox className={appTheme.checkbox} onChange={onChange} checked={misc.text} />}
                  label={t("notifications.text")}
                />
              )}
              {isLoading ? (
                <Skeleton style={{ height: 39 }} />
              ) : (
                <FormControlLabel
                  name="phone"
                  control={<Checkbox className={appTheme.checkbox} onChange={onChange} checked={misc.phone} />}
                  label={
                    <Fragment>
                      <Typography variant="body1">{t("notifications.phone")}</Typography>
                      <Typography variant="caption">{t("notifications.phone_info")}</Typography>
                    </Fragment>
                  }
                />
              )}
            </Grid>
            <Grid className={classes.item} item md={4} sm={6} xs={12}>
              <Typography gutterBottom variant="h6">
                {t("notifications.chat")}
              </Typography>
              <Typography gutterBottom variant="body2">
                {t("notifications.chat_info")}
              </Typography>
              {isLoading ? (
                <Skeleton style={{ height: 39 }} />
              ) : (
                <FormControlLabel
                  name="chat_email"
                  control={<Checkbox className={appTheme.checkbox} onChange={onChange} checked={misc.chat_email} />}
                  label={t("notifications.email")}
                />
              )}
              {isLoading ? (
                <Skeleton style={{ height: 39 }} />
              ) : (
                <FormControlLabel
                  name="chat_push"
                  control={<Checkbox className={appTheme.checkbox} onChange={onChange} checked={misc.chat_push} />}
                  label={t("notifications.push")}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button className={appTheme.buttonCreate} type="submit" variant="contained" disabled={isSaving}>
            {isSaving && <CircularProgress style={{ marginRight: 10, color: "white" }} size="1.5em" />}
            {t("save_changes")}
          </Button>
        </CardActions>
      </form>
      <SuccessSnackbar onClose={handleSnackbarClose} open={showUpdateSuccess} />
    </Card>
  );
};

export default Notifications;
