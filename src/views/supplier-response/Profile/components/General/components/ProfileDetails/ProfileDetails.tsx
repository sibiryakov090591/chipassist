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
    [theme.breakpoints.down("sm")]: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-evenly",
    },
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  avatar: {
    height: 100,
    width: 100,
    [theme.breakpoints.down("sm") && theme.breakpoints.up("xs")]: {
      height: 150,
      width: 150,
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
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownXs = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={classes.content}>
        <Avatar
          className={classes.avatar}
          src={stateProfile.isEditView ? stateProfile.logoURL : profile.partnerProfile.avatar}
        />
        <Box
          display={"flex"}
          flexDirection={"column"}
          // maxWidth={"50%"}
          width={"100%"}
          style={isDownSm ? { marginLeft: "15px" } : null}
        >
          <p
            style={{
              fontSize: isDownXs ? "1.5rem" : "2rem",
              paddingBottom: "1rem",
              marginTop: "1rem",
              marginBottom: 0,
              wordWrap: "break-word",
              textAlign: "center",
              maxWidth: "100%",
            }}
          >
            {stateProfile.isEditView
              ? stateProfile.company_name
              : profile.partnerProfile.company_name || "Company name is not provided"}
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
