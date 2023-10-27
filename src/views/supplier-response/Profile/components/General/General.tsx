import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import { getPartnerInfo } from "@src/store/profile/profileActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useDebounce from "@src/hooks/useDebounce";
import ProfileDetailsPreloader from "@src/views/supplier-response/Profile/components/General/components/Preloaders/ProfileDetailsPreloader";
import GeneralSettingPreloader from "@src/views/supplier-response/Profile/components/General/components/Preloaders/GeneralSettingPreloader";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import GeneralSettingView from "@src/views/supplier-response/Profile/components/General/components/GeneralSettingsView/GeneralSettingView";
import { saveNewDetails } from "@src/store/sellerProfile/sellerProfileAction";
import { ProfileDetails, GeneralSettings } from "./components";

const useStyles = makeStyles(() => ({
  root: {},
}));

const General = () => {
  const classes = useStyles();
  const profileInfo = useAppSelector((state) => state.profile.profileInfo);
  const profile = useAppSelector((state) => state.profile);
  const isLoading = useAppSelector((state) => state.profile.partnerProfile.isLoading);
  const isEditView = useAppSelector((state) => state.sellerProfile.isEditView);
  const debouncedIsLoading = useDebounce(isLoading, 1000);
  const theme = useTheme();
  const isMdDowm = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let mounted = true;

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (profile.selectedPartner && !isEditView) dispatch(getPartnerInfo(profile.selectedPartner.id));
  }, [isEditView]);

  useEffect(() => {
    if (profile.partnerProfile) {
      dispatch(saveNewDetails(profile.partnerProfile));
    }
  }, [profile.partnerProfile]);

  if (!profileInfo) {
    return null;
  }
  return (
    <Grid className={clsx(classes.root)} container spacing={3} direction={"row"}>
      {isMdDowm ? (
        <Grid item lg={8} md={12} xl={9} xs={12}>
          {debouncedIsLoading ? <ProfileDetailsPreloader /> : <ProfileDetails />}
        </Grid>
      ) : (
        <Grid item container spacing={3} lg={4} md={3} xl={3} xs={12} direction={"column"}>
          <Grid item>{debouncedIsLoading ? <ProfileDetailsPreloader /> : <ProfileDetails />}</Grid>
        </Grid>
      )}
      <Grid item lg={8} md={12} xl={9} xs={12}>
        {debouncedIsLoading ? <GeneralSettingPreloader /> : !isEditView ? <GeneralSettingView /> : <GeneralSettings />}
      </Grid>
    </Grid>
  );
};

export default General;
