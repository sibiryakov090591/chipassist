import React from "react";
import { Box, Button, Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import { defaultCountry } from "@src/constants/countries";
import { turnEditMode } from "@src/store/sellerProfile/sellerProfileAction";
import EditIcon from "@material-ui/icons/Edit";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useStyles from "@src/views/supplier-response/Profile/components/General/components/GeneralSettingsView/style";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const GeneralSettingView = () => {
  const partner = useAppSelector((state) => state.profile.partnerProfile);
  const checkout = useAppSelector((state) => state.checkout);
  const geolocation = useAppSelector((state) => state.profile.geolocation);
  const country =
    checkout?.countries?.find((i) => i.url === partner.country)?.printable_name ||
    checkout?.countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)?.printable_name ||
    defaultCountry.printable_name;
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Card>
      <CardHeader className={classes.cardHeader} title={"Company details"} />
      <CardContent>
        <Grid container spacing={3}>
          {!isDownMd && (
            <Grid item md={12} xs={12}>
              <p className={classes.name}>{partner.company_name}</p>
            </Grid>
          )}
          <Grid item md={12} xs={12} style={{ marginTop: "1em" }}>
            <span className={classes.title}>{"Company contacts and address: "}</span>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className={classes.infoContainer}>
              <MailOutlineIcon fontSize={"default"} />
              <span className={classes.info}>{partner.email || "Not provided"}</span>
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className={classes.infoContainer}>
              <PhoneOutlinedIcon fontSize={"default"} />
              <span className={classes.info}>{partner.phone || "Not provided"}</span>
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className={classes.infoContainer}>
              <LanguageOutlinedIcon fontSize={"default"} />
              <span className={classes.info}>{partner.website || "Not provided"}</span>
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className={classes.infoContainer}>
              <LocationOnOutlinedIcon fontSize={"default"} />
              <span className={classes.info}>{`${country || "Country is not provided"}, ${
                partner.address ? `${partner.address}, ` : ""
              } ${partner.postcode || "Postcode is not provided"}`}</span>
            </div>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box display={"flex"} flexDirection={"column"}>
              <span className={classes.title}>Company details:</span>
              <div className={classes.infoContainer}>
                <span className={classes.info} style={{ paddingLeft: 0, marginTop: "1em" }}>
                  {partner.description || "Details are not provided"}
                </span>
              </div>
            </Box>
          </Grid>
          <Grid item md={12} xs={12} className={classes.divideLine}>
            <Box display={"flex"} justifyContent={"end"}>
              <Button className={classes.editButton} variant={"outlined"} onClick={() => dispatch(turnEditMode(true))}>
                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                  <EditIcon />
                  {"Edit"}
                </div>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GeneralSettingView;
