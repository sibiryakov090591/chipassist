import React, { useState } from "react";
import CurrencyMenu from "@src/layouts/HomePage/components/TopBar/components/CurrencyMenu/CurrencyMenu";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";
import useAppSelector from "@src/hooks/useAppSelector";
import { useMediaQuery, useTheme } from "@material-ui/core";
import ClickOutsideListener from "@src/components/ClickOutsideListener/ClickOutsideListener";
import { CurrenciesAllowed } from "@src/store/currency/currencyTypes";
import { useStyles } from "./styles";

interface Props {
  className?: string;
  newCurrency?: CurrenciesAllowed;
}

const FilterCurrency: React.FC<Props> = ({ newCurrency, className }) => {
  const classes = useStyles();
  const currency = useAppSelector((state) => state.currency);
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [clicked, setClicked] = useState(false);

  const handleOnClick = () => {
    setClicked((prevState) => !prevState);
  };

  return (
    <ClickOutsideListener onClickOutside={() => setClicked((prevState) => (prevState ? false : prevState))}>
      <CurrencyMenu
        newCurrency={newCurrency}
        placement={isSmDown ? "bottom-end" : "bottom"}
        buttonComponent={
          <Button className={`${classes.currency} ${className || ""}`} onClick={handleOnClick}>
            {currency?.selected?.code}
            {clicked ? (
              <KeyboardArrowUpIcon className={classes.viewsFIcon} />
            ) : (
              <KeyboardArrowDownIcon className={classes.viewsFIcon} />
            )}
          </Button>
        }
      />
    </ClickOutsideListener>
  );
};

export default FilterCurrency;
