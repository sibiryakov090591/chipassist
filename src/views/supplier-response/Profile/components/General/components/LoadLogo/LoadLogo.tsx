import React, { useState } from "react";
import useAppTheme from "@src/theme/useAppTheme";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { makeStyles } from "@material-ui/styles";
import { Button, Card, CardActions, CardContent, TextField, Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import clsx from "clsx";
import { uploadNewAvatar } from "@src/store/sellerProfile/sellerProfileAction";

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
  actions: {
    justifyContent: "center",
  },
}));

export const LoadLogo = () => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const [url, setUrl] = useState("");
  const onUpdateLogo = () => {
    dispatch(uploadNewAvatar(url));
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

export default LoadLogo;
