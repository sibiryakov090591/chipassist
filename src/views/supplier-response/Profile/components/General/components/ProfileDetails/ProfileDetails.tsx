import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Avatar, Theme, Box } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

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

const ProfileDetails = () => {
  const classes = useStyles();
  const profile = useAppSelector((state) => state.profile);
  const stateProfile = useAppSelector((state) => state.sellerProfile);
  const theme = useTheme();
  const isDownXs = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={classes.content}>
        <Avatar
          className={classes.avatar}
          src={stateProfile.isEditView ? stateProfile.logoURL : profile.partnerProfile.avatar}
        />
        <Box display={"flex"} flexDirection={"column"} style={isDownXs ? { marginLeft: "15px" } : null}>
          <p style={{ fontSize: "2rem", paddingBottom: "1rem", marginTop: "1rem", marginBottom: 0 }}>
            {stateProfile.isEditView ? stateProfile.company_name : profile.partnerProfile.company_name}
          </p>
          <span style={{ fontSize: "1.rem", paddingBottom: "1rem" }}>
            {stateProfile.isEditView ? stateProfile.email : profile.partnerProfile.email}
          </span>
          <span style={{ fontSize: "1.rem" }}>
            {stateProfile.isEditView ? stateProfile.phone : profile.partnerProfile.phone}
          </span>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileDetails;
