import React, { useState } from "react";
import { StatisticsItem } from "@src/store/supplierStatistics/statisticsTypes";
import clsx from "clsx";
import { formatMoney } from "@src/utils/formatters";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { isEven } from "@src/utils/bom";
import { TableCell, TableRow } from "@material-ui/core";
// import useAppSelector from "@src/hooks/useAppSelector";
import { format } from "date-fns";
import useCurrency from "@src/hooks/useCurrency";
import { useStyles } from "./statisticItemStyles";

interface Props {
  items: StatisticsItem[];
  index: number;
}

const StatisticItem: React.FC<Props> = ({ items, index }) => {
  const classes = useStyles();
  const { currencyPrice } = useCurrency();

  // const countries = useAppSelector((state) => state.checkout.countries);

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const createRow = (item: StatisticsItem, isFirstRow = false) => {
    const date = new Date(item.response_created);
    const isActiveArrow = isFirstRow && items?.length > 1;
    // let country = countries?.find((i) => i.iso_3166_1_a3 === item.country);
    // if (country?.iso_3166_1_a3 === "RUS") country = countries?.find((i) => i.iso_3166_1_a3 === "KAZ");
    return (
      <TableRow
        className={clsx({
          [classes.odd]: !open && !isEven(index),
          [classes.open]: open,
          [classes.pointer]: isActiveArrow,
          // [classes.firstChild]: open && item.id === items[0].id,
          // [classes.lastChild]: open && item.id === items[items.length - 1].id,
        })}
        onClick={isActiveArrow && toggleOpen}
      >
        <TableCell>
          <div className={clsx(classes.strong, classes.wordBreakAll)}>{item.rfq_mpn?.toUpperCase() || "-"}</div>
          {/* {country && ( */}
          {/*  <div className={classes.geoPin}> */}
          {/*    <span className={`fi fi-${country.code.toLowerCase()}`} /> */}
          {/*    <span className={classes.countryName}>{country.printable_name}</span> */}
          {/*  </div> */}
          {/* )} */}
        </TableCell>
        <TableCell>{item.rfq_quantity ? formatMoney(item.rfq_quantity, 0) : "-"}</TableCell>
        <TableCell>{item.response_quantity ? formatMoney(item.response_quantity, 0) : "-"}</TableCell>
        <TableCell className={classes.wordBreakAll}>{item.manufacturer_name || "-"}</TableCell>
        <TableCell>{item.response_datecode || "-"}</TableCell>
        <TableCell>
          <div className={classes.repliedData}>
            {date ? (
              <>
                {format(date, "dd.MM.yyyy")}
                <br />
                <span>{format(date, "HH:mm:ss")}</span>
              </>
            ) : (
              "-"
            )}
          </div>
        </TableCell>
        <TableCell>
          <div
            className={clsx({
              [classes.strong]: !!item.response_price,
              [classes.lowPrice]: !!item.response_price && !item.position?.includes("+"),
              [classes.biggerPrice]: !!item.response_price && !!item.position?.includes("+"),
            })}
          >
            {item.response_price ? formatMoney(currencyPrice(item.response_price, item.your_currency || "USD")) : "-"}
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
            {item.competitive_price
              ? formatMoney(currencyPrice(item.competitive_price, item.competitive_currency || "USD"))
              : "-"}
          </div>
        </TableCell>
        <TableCell>
          <div
            className={clsx(classes.position, classes.strong, classes.wordBreakAll, {
              [classes.lowPrice]: !!item.position?.includes("-") || (!item.competitive_price && !!item.response_price),
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
