import React from "react";
import CurrencyMenu from "@src/layouts/HomePage/components/TopBar/components/CurrencyMenu/CurrencyMenu";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Button from "@material-ui/core/Button";
import useAppSelector from "@src/hooks/useAppSelector";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { useStyles } from "./styles";

interface Props {
  className?: string;
}

const FilterCurrency: React.FC<Props> = ({ className }) => {
  const classes = useStyles();
  const currency = useAppSelector((state) => state.currency);
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <CurrencyMenu
      placement={isSmDown ? "bottom-end" : "bottom"}
      buttonComponent={
        <Button className={`${classes.currency} ${className || ""}`}>
          {currency?.selected?.code}
          <KeyboardArrowDownIcon className={classes.viewsFIcon} />
        </Button>
      }
    />
  );
};

export default FilterCurrency;
