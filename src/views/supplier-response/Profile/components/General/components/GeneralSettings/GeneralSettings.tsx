import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, Theme, TableBody, TableRow, TableCell, Table } from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { loadProfileInfoThunk } from "@src/store/profile/profileActions";
import useAppSelector from "@src/hooks/useAppSelector";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";

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

const GeneralSettings = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);
  const checkout = useAppSelector((state) => state.checkout);
  const { profileInfo } = profile;
  const billingAddress = [...profileInfo?.addresses].sort((a, b) => a.id - b.id)[0];

  useEffect(() => {
    dispatch(loadProfileInfoThunk());
  }, []);

  return (
    <Card>
      <CardHeader className={classes.cardHeader} title={"Company details"} />
      <CardContent style={{ padding: 0 }}>
        <Table className={classes.table} size="medium">
          <TableBody>
            {/* <TableRow> */}
            {/*  <TableCell className={classes.tableHeader}>Name</TableCell> */}
            {/*  <TableCell>{billingAddress?.company_name || "-"}</TableCell> */}
            {/* </TableRow> */}
            {/* <TableRow> */}
            {/*  <TableCell className={classes.tableHeader}>Email</TableCell> */}
            {/*  <TableCell>{profileInfo?.email || "-"}</TableCell> */}
            {/* </TableRow> */}
            <TableRow>
              <TableCell className={classes.tableHeader}>Website</TableCell>
              <TableCell>{billingAddress?.line2 || "-"}</TableCell>
            </TableRow>
            {/* <TableRow> */}
            {/*  <TableCell className={classes.tableHeader}>Phone</TableCell> */}
            {/*  <TableCell>{billingAddress?.phone_number || billingAddress?.phone_number_str || "-"}</TableCell> */}
            {/* </TableRow> */}
            <TableRow>
              <TableCell className={classes.tableHeader}>Country</TableCell>
              <TableCell>
                {(checkout?.countries &&
                  checkout.countries.find((i) => i.url === billingAddress?.country)?.printable_name) ||
                  "-"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableHeader}>Post/Zip-code</TableCell>
              <TableCell>{billingAddress?.postcode || "-"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableHeader}>Address</TableCell>
              <TableCell>{billingAddress?.line1 || "-"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableHeader}>Other details</TableCell>
              <TableCell>{billingAddress?.notes || "-"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
