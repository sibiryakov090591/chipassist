import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, CardActions, Avatar, Button, Theme, TextField } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";
import useAppTheme from "@src/theme/useAppTheme";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import useAppDispatch from "@src/hooks/useAppDispatch";

const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  root: {},
  content: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
    paddingBottom: 0,
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row",
    },
  },
  avatar: {
    cursor: "pointer",
    height: 100,
    width: 100,
    [theme.breakpoints.down("xs")]: {
      height: 55,
      width: 55,
    },
  },
  actions: {
    justifyContent: "center",
  },
}));

const ProfileDetails = () => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();

  const [url, setUrl] = useState("");
  const [savedUrl, setSavedUrl] = useState("");

  const onUpdateLogo = () => {
    setSavedUrl(url);
    dispatch(
      showBottomLeftMessageAlertAction({
        text: "The logo was updated successfully!",
        severity: "success",
      }),
    );
  };

  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={classes.content}>
        <Avatar className={classes.avatar} src={savedUrl} />
        <TextField
          style={{ marginTop: 16 }}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          label={"Logo (url)"}
          name="logo"
          variant="outlined"
          size="small"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </CardContent>

      <CardActions className={classes.actions}>
        <Button style={{ minWidth: 150 }} className={appTheme.buttonCreate} variant="contained" onClick={onUpdateLogo}>
          Update
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProfileDetails;
