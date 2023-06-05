import React from "react";
import { Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import moment from "moment";
import useCurrency from "@src/hooks/useCurrency";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { DATE_FORMAT } from "@src/config";
import { units, STATUS_CHOICES } from "@src/store/pcb/pcbTypes";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./PcbViewDataStyles";
import { useStyles as usePcbStyles } from "../../style";

function getSellers(items) {
  if (!items || !items.length) return "Any";
  return items.map((i) => i.name).join(", ");
}

function getLabel(items, val) {
  if (!items) return val;
  const res = items.find((item) => item.value === val);
  return res ? res.label : val;
}

function PcbData(props) {
  const { item, type } = props;
  const classes = useStyles();
  const classesPcb = usePcbStyles();
  const { t } = useI18n("pcb");
  const { currency, currencyPrice } = useCurrency();
  const pcbConstants = useAppSelector((state) => state.pcb.pcbConstants);

  return (
    <Table className={classes.table} size="small">
      <TableBody>
        <TableRow>
          <TableCell>{t("column.id")}</TableCell>
          <TableCell>{item.id}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.part_number")}</TableCell>
          <TableCell>{item.part_number}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.qty")}</TableCell>
          <TableCell>{item.quantity}</TableCell>
        </TableRow>
        {type !== "partner" && (
          <TableRow>
            <TableCell>{t("distributor.distributors")}</TableCell>
            <TableCell>{t(getSellers(item.seller))}</TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableCell>{t("column.type")}</TableCell>
          <TableCell>{pcbConstants && getLabel(pcbConstants.PANEL, item.pcbtype)}</TableCell>
        </TableRow>
        {/* <TableRow>
          <TableCell>Panel X</TableCell>
          <TableCell>{item.panel_x}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Panel Y</TableCell>
          <TableCell>{item.panel_y}</TableCell>
        </TableRow> */}
        <TableRow>
          <TableCell>{t("column.x")}</TableCell>
          <TableCell>
            {item.pcbtype === "PANEL" && item.x}
            <span className={classesPcb.units}>{!!item.x && t(units.x)}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.y")}</TableCell>
          <TableCell>
            {item.pcbtype === "PANEL" && item.y}
            <span className={classesPcb.units}>{!!item.y && t(units.y)}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.unit_x")}</TableCell>
          <TableCell>
            {item.unit_x}
            <span className={classesPcb.units}>{!!item.unit_x && t(units.unit_x)}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.unit_y")}</TableCell>
          <TableCell>
            {item.unit_y}
            <span className={classesPcb.units}>{!!item.unit_y && t(units.unit_y)}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.count_rigid")}</TableCell>
          <TableCell>{item.count_rigid}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.count_flex")}</TableCell>
          <TableCell>{item.count_flex}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.soldermask")}</TableCell>
          <TableCell>{(pcbConstants && getLabel(pcbConstants.SOLDERMASK, item.soldermask)) || ""}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.soldermask_color")}</TableCell>
          <TableCell>
            {item.soldermask && pcbConstants && (getLabel(pcbConstants.SOLDERMASK_COLOR, item.soldermask_color) || "")}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.legend")}</TableCell>
          <TableCell>{(pcbConstants && getLabel(pcbConstants.LEGEND, item.legend)) || ""}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.legend_color")}</TableCell>
          <TableCell>
            {item.legend && pcbConstants && (getLabel(pcbConstants.LEGEND_COLOR, item.legend_color) || "")}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.hole")}</TableCell>
          <TableCell>
            {item.hole}
            <span className={classesPcb.units}>{!!item.hole && t(units.hole)}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.hole_count")}</TableCell>
          <TableCell>{item.hole_count}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.thickness")}</TableCell>
          <TableCell>
            {item.thickness}
            <span className={classesPcb.units}>{!!item.thickness && t(units.thickness)}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.base")}</TableCell>
          <TableCell>{(pcbConstants && getLabel(pcbConstants.BASE, item.base)) || ""}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.copper")}</TableCell>
          <TableCell>{(pcbConstants && getLabel(pcbConstants.COPPER, item.copper)) || ""}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.finish")}</TableCell>
          <TableCell>{(pcbConstants && getLabel(pcbConstants.FINISH, item.finish)) || ""}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.track")}</TableCell>
          <TableCell>
            {item.track}
            <span className={classesPcb.units}>{!!item.track && t(units.track)}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.spacing")}</TableCell>
          <TableCell>
            {item.spacing}
            <span className={classesPcb.units}>{!!item.spacing && t(units.spacing)}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.profiling")}</TableCell>
          <TableCell>{(pcbConstants && getLabel(pcbConstants.PROFILING, item.profiling)) || ""}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.period")}</TableCell>
          <TableCell>
            {item.period}
            <span className={classesPcb.units}>{!!item.period && t(units.period)}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.valid_date")}</TableCell>
          <TableCell>{moment(item.valid_date).format(DATE_FORMAT)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.price")}</TableCell>
          <TableCell>
            {currencyPrice(item.price)}
            <span className={classesPcb.units}>{!!item.price && currency.symbol}</span>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.xout")}</TableCell>
          <TableCell>{item.xout ? t("common.yes") : t("common.no")}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.files_pcb")}</TableCell>
          <TableCell>
            {item.files_pcb.map((val) => (
              <div key={val.id}>
                <a href={val.url}>{val.url.match(new RegExp("([^/]*)$"))[0]}</a>
              </div>
            ))}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.comment")}</TableCell>
          <TableCell>{item.comment}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.status")}</TableCell>
          <TableCell>{t(getLabel(STATUS_CHOICES, item.status))}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("column.created")}</TableCell>
          <TableCell>{moment(item.created).format(DATE_FORMAT)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default PcbData;
