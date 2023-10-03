import React, { useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Grid, Theme } from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import { turnEditMode } from "@src/store/sellerProfile/sellerProfileAction";
import EditIcon from "@material-ui/icons/Edit";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useStyles from "@src/views/supplier-response/Profile/components/General/components/GeneralSettingsView/style";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { AppTheme } from "@src/themes/AppTheme";

export const CollapsableText = ({ text }: any) => {
  const useStyle = makeStyles((theme: AppTheme & Theme) => ({
    button: {
      color: `${theme.palette.app.blue800}`,
      fontWeight: 600,
      textDecoration: "underline",
      "&:hover": {
        color: `${theme.palette.app.blue200}`,
        cursor: "pointer",
      },
    },
    notCollapsableContainer: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    lessButtonContainer: {
      display: "flex",
      width: "100%",
      justifyContent: "flex-end",
    },
  }));

  const classes = useStyle();

  const [isCollapsed, setIsCollapsed] = useState(true);

  const MoreButton = () => {
    const onChangeHandler = () => {
      setIsCollapsed(!isCollapsed);
    };
    return (
      <span className={classes.button} onClick={onChangeHandler}>
        {isCollapsed ? "more" : "less"}
      </span>
    );
  };

  return (
    <>
      {text.length > 300 && isCollapsed ? (
        <span>
          {`${text.slice(0, 300)}...`} <MoreButton />
        </span>
      ) : !isCollapsed ? (
        <div className={classes.notCollapsableContainer}>
          <span>
            {text}
          </span>
          <div className={classes.lessButtonContainer}>
            <MoreButton />
          </div>
        </div>
      ) : (
        text
      )}
    </>
  );
};

export const GeneralSettingView = () => {
  const partner = useAppSelector((state) => state.profile.partnerProfile);
  const checkout = useAppSelector((state) => state.checkout);
  const country = checkout?.countries?.find((i) => i.iso_3166_1_a3 === partner.country)?.printable_name;
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const isDownXs = useMediaQuery(theme.breakpoints.down("xs"));
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
                  {/* {partner.description || "Details are not provided"} */}
                  {partner.description ? <CollapsableText text={partner.description} /> : "Details are not provided"}
                </span>
              </div>
            </Box>
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
            className={classes.divideLine}
            style={isDownXs ? { paddingLeft: 0, paddingRight: 0 } : null}
          >
            <Box display={"flex"} justifyContent={"end"}>
              <Button
                className={classes.editButton}
                style={isDownXs ? { width: "100%" } : null}
                variant={"outlined"}
                onClick={() => dispatch(turnEditMode(true))}
              >
                <div
                  style={{
                    width: isDownXs ? "20%" : "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
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
