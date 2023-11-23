import React, { useState } from "react";
import { ResponseItem as IResponseItem } from "@src/store/supplierStatistics/statisticsTypes";
import clsx from "clsx";
import { formatMoney } from "@src/utils/formatters";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { isEven } from "@src/utils/bom";
import { TableCell, TableRow } from "@material-ui/core";
import { useStyles } from "./statisticItemStyles";

interface Props {
  items: IResponseItem[];
  index: number;
}

const StatisticItem: React.FC<Props> = ({ items, index }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const createRow = (item: any, isFirstRow = false) => {
    const date = new Date(item.date);
    const isActiveArrow = isFirstRow && items?.length > 1;
    return (
      <TableRow
        className={clsx({
          [classes.odd]: !open && !isEven(index),
          [classes.open]: open,
          [classes.pointer]: isActiveArrow,
          [classes.lastChild]: open && item.id === items[items.length - 1].id,
        })}
        onClick={isActiveArrow && toggleOpen}
      >
        <TableCell>
          <div className={classes.strong}>{item.mpn?.toUpperCase() || "-"}</div>
        </TableCell>
        <TableCell>{item.quantity ? formatMoney(item.quantity, 0) : "-"}</TableCell>
        <TableCell>{item.num_in_stock ? formatMoney(item.num_in_stock, 0) : "-"}</TableCell>
        <TableCell>{item.manufacturer_name || "-"}</TableCell>
        <TableCell>
          <div className={classes.repliedData}>
            {date ? (
              <>
                {date.toLocaleDateString()}
                <br />
                <span>{date.toLocaleTimeString()}</span>
              </>
            ) : (
              "-"
            )}
          </div>
        </TableCell>
        <TableCell>
          <div
            className={clsx({
              [classes.strong]: !!item.price,
              [classes.lowPrice]: !!item.price && !item.position?.includes("+"),
              [classes.biggerPrice]: !!item.price && !!item.position?.includes("+"),
            })}
          >
            {item.price ? formatMoney(item.price) : "-"}
          </div>
        </TableCell>
        <TableCell>
          <div
            className={clsx({
              [classes.strong]: !!item.competitive_price,
              [classes.lowPrice]: !!item.competitive_price && !!item.position?.includes("+"),
              [classes.biggerPrice]: !!item.competitive_price && !item.position?.includes("+"),
            })}
          >
            {item.competitive_price ? formatMoney(item.competitive_price) : "-"}
          </div>
        </TableCell>
        <TableCell>
          <div
            className={clsx(classes.position, classes.strong, {
              [classes.lowPrice]: !!item.position?.includes("-") || (!item.competitive_price && !!item.price),
              [classes.biggerPrice]: !!item.position?.includes("+"),
            })}
          >
            {!!item.position?.includes("+") && <>&#9650; </>}
            {!!item.position?.includes("-") && <>&#9660; </>}
            {item.position}
          </div>
        </TableCell>
        <TableCell className={classes.tdArrow}>
          {isActiveArrow && <ExpandMoreIcon className={clsx(classes.arrow, { active: open })} />}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <React.Fragment>
      {createRow(items[0], true)}
      {open && (
        <>
          {items.map((item, i) => {
            if (i === 0) return null;
            return createRow(item);
          })}
        </>
      )}
    </React.Fragment>
  );
};

export default StatisticItem;
