import React, { useEffect, useState } from "react";
import { ResponseItem as IResponseItem } from "@src/store/supplierStatistics/statisticsTypes";
import clsx from "clsx";
import { formatMoney } from "@src/utils/formatters";
import { DataField, DataLabel, DataRow, DataValue } from "@src/components/DataTable/DataTable";
import { isEven } from "@src/utils/bom";
import { useStyles } from "./statisticItemStyles";

interface Props {
  item: IResponseItem;
  index: number;
}

const StatisticItem: React.FC<Props> = ({ item, index }) => {
  const classes = useStyles();

  const [repliedDate, setRepliedDate] = useState(null);

  useEffect(() => {
    if (item.date) {
      const date = new Date(item.date);
      setRepliedDate(
        <>
          {date.toLocaleDateString()}
          <br />
          <span>{date.toLocaleTimeString()}</span>
        </>,
      );
    } else if (repliedDate) setRepliedDate(null);
  }, [item]);

  return (
    <DataRow
      className={clsx({
        [classes.odd]: !isEven(index),
      })}
    >
      <DataField gridArea="mpn">
        <DataLabel>Requested MPN</DataLabel>
        <DataValue className={classes.strong}>{item.mpn?.toUpperCase()}</DataValue>
      </DataField>
      <DataField gridArea="qty">
        <DataLabel>Requested quantity</DataLabel>
        <DataValue>{formatMoney(item.quantity, 0)}</DataValue>
      </DataField>
      <DataField gridArea="yourQty">
        <DataLabel>Your quantity</DataLabel>
        <DataValue>{formatMoney(item.num_in_stock, 0)}</DataValue>
      </DataField>
      <DataField gridArea="manufacturer">
        <DataLabel>Manufacturer</DataLabel>
        <DataValue>{item.manufacturer_name}</DataValue>
      </DataField>
      <DataField gridArea="date">
        <DataLabel>Response date</DataLabel>
        <DataValue className={classes.repliedData}>{repliedDate}</DataValue>
      </DataField>
      <DataField gridArea="yourPrice">
        <DataLabel>Your price</DataLabel>
        <DataValue
          className={clsx({
            [classes.strong]: !!item.price,
            [classes.lowPrice]: !!item.price && !item.position?.includes("+"),
            [classes.biggerPrice]: !!item.price && !!item.position?.includes("+"),
          })}
        >
          {item.price ? formatMoney(item.price) : "-"}
        </DataValue>
      </DataField>
      <DataField gridArea="competitivePrice">
        <DataLabel>Competitive price</DataLabel>
        <DataValue
          className={clsx({
            [classes.strong]: !!item.competitive_price,
            [classes.lowPrice]: !!item.competitive_price && !!item.position?.includes("+"),
            [classes.biggerPrice]: !!item.competitive_price && !item.position?.includes("+"),
          })}
        >
          {item.competitive_price ? formatMoney(item.competitive_price) : "-"}
        </DataValue>
      </DataField>
      <DataField gridArea="position">
        <DataLabel>Your position</DataLabel>
        <DataValue
          className={clsx(classes.position, classes.strong, {
            [classes.lowPrice]: !!item.position?.includes("-") || (!item.competitive_price && !!item.price),
            [classes.biggerPrice]: !!item.position?.includes("+"),
          })}
        >
          {!!item.position?.includes("+") && <>&#9650; </>}
          {!!item.position?.includes("-") && <>&#9660; </>}
          {item.position}
        </DataValue>
      </DataField>
    </DataRow>
  );
};

export default StatisticItem;
