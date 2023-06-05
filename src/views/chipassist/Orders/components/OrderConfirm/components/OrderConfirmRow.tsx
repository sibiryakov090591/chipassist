import React from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useCurrency from "@src/hooks/useCurrency";
import clsx from "clsx";
import { Checkbox } from "@material-ui/core";

interface PropsType {
  index: number;
  item: any;
  orderStatus: string;
  classes: any;
  cost: string | number | JSX.Element;
  unitPrice: string | number | JSX.Element;
  onChangeApproved: (id: number) => void;
}

const OrderConfirmRow: React.FC<PropsType> = ({
  orderStatus,
  onChangeApproved,
  index,
  item,
  cost,
  unitPrice,
  classes,
}) => {
  const { t } = useI18n("order");
  const { currency } = useCurrency();

  const onChange = () => {
    onChangeApproved(item.id);
  };

  return (
    <ul className={classes.tableAreas}>
      <li className={classes.columnNumber}>
        <span>№</span>
        <span>{index}</span>
      </li>
      <li className={`${classes.columnPartnumber} order-table-part-number`}>
        <span>{t("bom.column.part_number")}</span>
        <span>{item.upc}</span>
      </li>
      <li className={clsx(classes.columnQty, classes.columnTextRight)}>
        <span>{t("bom.column.qty")}</span>
        <span>{item.quantity}</span>
      </li>
      <li className={clsx(classes.columnPrice, classes.columnTextRight)}>
        <span>
          {t("bom.column.unit_price")}, {currency.symbol}
        </span>
        <span>{unitPrice}</span>
      </li>
      <li className={clsx(classes.columnTotal, classes.columnTextRight)}>
        <span>
          {t("bom.column.total_price")}, {currency.symbol}
        </span>
        <span>{cost}</span>
      </li>
      <li className={clsx(classes.columnApprove, classes.columnTextRight)}>
        <span>{t("bom.column.approved")}</span>
        <span>
          <Checkbox
            disabled={orderStatus !== "co sent"}
            className={classes.checkbox}
            checked={item.approved}
            onChange={onChange}
            name="approved"
          />
        </span>
      </li>
    </ul>
  );
};

export default OrderConfirmRow;
