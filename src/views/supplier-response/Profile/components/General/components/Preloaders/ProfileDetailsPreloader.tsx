import React from "react";
import clsx from "clsx";
import { Box, Card, CardContent, Theme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
  const theme = useTheme();
  const isDownXs = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={classes.content}>
        <Skeleton variant="circle" className={classes.avatar} />
        <Box display={"flex"} flexDirection={"column"} width={"100%"} style={isDownXs ? { marginLeft: "15px" } : null}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileDetailsPreloader;
