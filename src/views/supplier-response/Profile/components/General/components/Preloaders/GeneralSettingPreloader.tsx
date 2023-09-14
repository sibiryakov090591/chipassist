import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Card, CardContent, CardHeader, Grid, Theme } from "@material-ui/core";
import { AppTheme } from "@src/themes/AppTheme";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  root: {},
  table: {
    "& > tbody > tr:nth-child(odd)": {
      backgroundColor: "#fafafa",
    },
    "& > tbody > tr > td:first-child": {
      borderRight: `1px solid ${theme.palette.app.grey200}`,
    },
    wordWrap: "break-word",
  },
  tableHeader: {
    width: "20%",
    height: 40,
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  cardHeader: {
    backgroundColor: theme.palette.app.blue800,
    "& .MuiCardHeader-title": {
      color: "white",
      fontWeight: "bold",
    },
  },
}));

export const GeneralSettingPreloader = () => {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader className={classes.cardHeader} title={<Skeleton />} />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Skeleton width={"100%"} variant="rect" />
          </Grid>
          <Grid item md={6} xs={12}>
            <Skeleton variant="rect" />
          </Grid>
          <Grid item md={6} xs={12}>
            <Skeleton variant="rect" />
          </Grid>
          <Grid item md={6} xs={12}>
            <Skeleton variant="rect" />
          </Grid>
          <Grid item md={6} xs={12}>
            <Skeleton variant="rect" />
          </Grid>
          <Grid item md={6} xs={12}>
            <Skeleton variant="rect" />
          </Grid>
          <Grid item md={6} xs={12}>
            <Skeleton variant="rect" />
          </Grid>
          <Grid item md={12} xs={12}>
            <Skeleton variant="rect" />
          </Grid>
          <Grid item md={12} xs={12}>
            <Skeleton variant="rect" />
          </Grid>
          <Grid item md={12} xs={12}>
            <Box display={"flex"} justifyContent={"end"}>
              <Skeleton variant="rect" style={{ minWidth: 150, marginRight: "16px" }} />
              <Skeleton variant="rect" style={{ minWidth: 150 }} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GeneralSettingPreloader;
