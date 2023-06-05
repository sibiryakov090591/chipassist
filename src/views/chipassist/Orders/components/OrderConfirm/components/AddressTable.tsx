import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "../styles";

interface PropsType {
  address: any;
  isBilling?: boolean;
}

const AddressTable: React.FC<PropsType> = ({ address, isBilling }) => {
  const { t } = useI18n("order");
  const classes = useStyles();

  const countries = useAppSelector((state) => state.checkout.countries);
  const country = countries?.find((item) => item.url === address?.country)?.printable_name;

  return (
    <Table size="small" className={classes.table}>
      <TableBody>
        <TableRow>
          <TableCell className={classes.th} style={{ width: "30%" }}>
            {t("cart.address.first_name")}
          </TableCell>
          <TableCell>{address?.first_name || "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th}>{t("cart.address.last_name")}</TableCell>
          <TableCell>{address?.last_name || "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th}>{t("cart.address.country")}</TableCell>
          <TableCell>{country || "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th}>{t("cart.address.line4")}</TableCell>
          <TableCell>{address?.line4 || "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th}>{t("cart.address.postcode")}</TableCell>
          <TableCell>{address?.postcode || "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th}>{t("cart.address.line1")}</TableCell>
          <TableCell>{address?.line1 || "-"}</TableCell>
        </TableRow>
        {!isBilling && (
          <TableRow>
            <TableCell className={classes.th}>{t("cart.address.phone_number")}</TableCell>
            <TableCell>{address?.phone_number_str || "-"}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AddressTable;
