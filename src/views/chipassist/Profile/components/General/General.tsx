import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import { ProfileDetails, GeneralSettings } from "./components";

const useStyles = makeStyles(() => ({
  root: {},
}));

const General = () => {
  const profile = useAppSelector((state) => state.profile.profileInfo);
  const classes = useStyles();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let mounted = true;

    return () => {
      mounted = false;
    };
  }, []);

  if (!profile) {
    return null;
  }

  return (
    <Grid className={clsx(classes.root)} container spacing={3}>
      <Grid item lg={4} md={3} xl={3} xs={12}>
        <ProfileDetails />
      </Grid>
      <Grid item lg={8} md={9} xl={9} xs={12}>
        <GeneralSettings />
      </Grid>
    </Grid>
  );
};

export default General;
