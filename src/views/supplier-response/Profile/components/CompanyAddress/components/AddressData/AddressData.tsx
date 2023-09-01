import React from "react";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./AddressDataStyles";

function AddressData({ item }: any) {
  const classes = useStyles();
  const { t } = useI18n();

  const countries = useAppSelector((state) => state.checkout.countries);

  return (
    <Table className={classes.table} size="small">
      <TableBody>
        <TableRow>
          <TableCell className={classes.tableHeader}>{t("cart.address.company_name")}</TableCell>
          <TableCell>{item.company_name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableHeader}>{t("cart.address.first_name")}</TableCell>
          <TableCell>{item.first_name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableHeader}>{t("cart.address.last_name")}</TableCell>
          <TableCell>{item.last_name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableHeader}>{t("cart.address.phone_number")}</TableCell>
          <TableCell>{item.phone_number || item.phone_number_str}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableHeader}>{t("cart.address.country")}</TableCell>
          <TableCell>{countries && countries.find((i) => i.url === item.country)?.printable_name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableHeader}>{t("cart.address.line4")}</TableCell>
          <TableCell>{item.line4}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableHeader}>{t("cart.address.postcode")}</TableCell>
          <TableCell>{item.postcode}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.tableHeader}>{t("cart.address.line1")}</TableCell>
          <TableCell>{item.line1}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default AddressData;
