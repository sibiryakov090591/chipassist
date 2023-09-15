import React from "react";
import clsx from "clsx";
import { Box, Card, CardContent, Theme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

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

export const ProfileDetailsPreloader = () => {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={classes.content}>
        <Skeleton variant="circle" className={classes.avatar} />
        <Box display={"flex"} flexDirection={"column"} width={"100%"}>
          {/* <span style={{ fontSize: "2rem", paddingBottom: "1rem", marginTop: "1rem" }}> */}
          {/*  {billingAddress?.company_name || stateProfile.company_name} */}
          {/* </span> */}
          {/* <span style={{ fontSize: "1.rem", paddingBottom: "1rem" }}>{profileInfo?.email || stateProfile.email}</span> */}
          {/* <span style={{ fontSize: "1.rem" }}>{billingAddress?.phone_number || stateProfile.phone}</span> */}
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileDetailsPreloader;
