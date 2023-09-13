import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Avatar, Theme, Box } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";
import useAppSelector from "@src/hooks/useAppSelector";

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
  const profile = useAppSelector((state) => state.profile);
  const stateProfile = useAppSelector((state) => state.sellerProfile);
  const { profileInfo } = profile;
  const billingAddress = [...profileInfo?.addresses].sort((a, b) => a.id - b.id)[0];

  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={classes.content}>
        <Avatar className={classes.avatar} src={stateProfile.logoURL} />
        <Box display={"flex"} flexDirection={"column"}>
          <span style={{ fontSize: "2rem", paddingBottom: "1rem", marginTop: "1rem" }}>
            {billingAddress?.company_name || stateProfile.company_name}
          </span>
          <span style={{ fontSize: "1.rem", paddingBottom: "1rem" }}>{profileInfo?.email || stateProfile.email}</span>
          <span style={{ fontSize: "1.rem" }}>{billingAddress?.phone_number || stateProfile.phone}</span>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileDetails;
