import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { Page } from "@src/components";
import { useStyles } from "../Login/styles";
import LoginFormAs from "./components/LoginFormAs/LoginFormAs";

const LoginAs = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Login" description="Login page">
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Typography gutterBottom variant="h3">
            Sign in as
          </Typography>
          <Typography variant="subtitle2">Sign in on the internal platform</Typography>
          <LoginFormAs className={classes.loginForm} />
        </CardContent>
        <CardMedia
          className={classes.media}
          // eslint-disable-next-line global-require
          image={require("@src/components/Authentication/auth.png")}
        >
          <Typography color="inherit" variant="subtitle1">
            Connecting the world of electronics
          </Typography>
        </CardMedia>
      </Card>
    </Page>
  );
};

export default LoginAs;
