import React, { useCallback } from "react";
import { TableSortLabel } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import useCurrency from "@src/hooks/useCurrency";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { useStyles } from "./style";

interface Props {
  labelOptions: {
    label: string;
    labelPostfix: string;
    name: string;
    hasSort: boolean;
    isHideable: boolean;
    isRequired: boolean;
    isShowDefault?: boolean;
  };
  orderBy: string;
  order: any;
  mode: string | null;
  onSort: (column: string) => void;
  HideComponent: any;
}

export const parseOrderValues = (val: string) => {
  if (!val) return [];
  return [val.substring(0, val.lastIndexOf("_")), val.substring(val.lastIndexOf("_") + 1, val.length)];
};

const TableHeadLabel: React.FC<Props> = ({ labelOptions, orderBy, order, mode, onSort, HideComponent }) => {
  const classes = useStyles();
  const { t } = useI18n("bom");
  const { currency } = useCurrency();

  const labelPostfix = labelOptions.labelPostfix === "currency" ? `, ${currency?.symbol}` : labelOptions.labelPostfix;

  const onSortClick = useCallback(() => {
    onSort(labelOptions.name);
  }, [labelOptions, order, orderBy]);

  const labelText = (
    <React.Fragment>
      {labelOptions.label && t(labelOptions.label)}
      {labelPostfix}
      {labelOptions.isRequired && <span style={{ color: red[500] }}>*</span>}
    </React.Fragment>
  );

  const labelWithSort = (
    <React.Fragment>
      {mode !== "create" && labelOptions.hasSort ? (
        <TableSortLabel
          active={orderBy === labelOptions.name}
          direction={orderBy === labelOptions.name ? order : "asc"}
          onClick={onSortClick}
          className={`${classes.tableSort} ${labelOptions.labelPostfix === "currency" ? classes.thCurrency : ""}`}
        >
          {labelText}
        </TableSortLabel>
      ) : (
        labelText
      )}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {labelOptions.isHideable && HideComponent ? (
        <HideComponent.Container>
          {labelWithSort}
          <HideComponent.Button label={labelOptions.label} />
        </HideComponent.Container>
      ) : (
        labelWithSort
      )}
    </React.Fragment>
  );
};

export default TableHeadLabel;
