import React, { useEffect, useState, useRef } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper, { PopperPlacementType } from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import { changeCurrency } from "@src/store/currency/currencyActions";
import useAppTheme from "@src/theme/useAppTheme";
import { CurrenciesAllowed, Currency } from "@src/store/currency/currencyTypes";
import constants from "@src/constants/constants";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./styles";

interface Props {
  containerClassName?: string;
  buttonComponent: JSX.Element;
  placement?: PopperPlacementType;
  newCurrency?: CurrenciesAllowed;
}

interface SelectedCurrency {
  symbol: string;
  code: CurrenciesAllowed;
}

const CurrencyMenu: React.FC<Props> = ({ newCurrency, containerClassName, buttonComponent, placement }) => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const anchorRef = useRef(null);

  const currency = useAppSelector((state) => state.currency);
  const currencyList = useAppSelector((state) => state.currency.currencyList);

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCurrencyList, setSelectedCurrencyList] = useState<Currency[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<SelectedCurrency>(null);

  useEffect(() => {
    setSelectedCurrency(() => ({
      symbol: currency?.selected?.symbol,
      code: currency?.selected?.code,
    }));

    if (constants?.currencyChanger && constants?.selectedCurrencyList) {
      const newCurrencyItems: Currency[] = [];
      constants.selectedCurrencyList.forEach((currencyCode: CurrenciesAllowed) => {
        currencyList.forEach((item) => {
          if (currencyCode === item.code) newCurrencyItems.push(item);
        });
      });
      setSelectedCurrencyList(newCurrencyItems);
    }
  }, [currency]);

  useEffect(() => {
    if (newCurrency && newCurrency !== currency.selected.code) {
      handleChange(newCurrency);
    }
  }, []);

  const handleChange = (code: CurrenciesAllowed) => {
    if (code === currency?.selected?.code) return;
    if (timeoutId) clearTimeout(timeoutId);

    dispatch(changeCurrency(code))
      .then(() => {
        if (error) setError(null);
        localStorage.setItem("currency", code);
      })
      .catch(() => {
        const id = setTimeout(() => handleChange(code), 3000);
        setTimeoutId(id);
        setError(code);
      });
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleListKeyDown(event: any) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={containerClassName || ""}>
      <div>
        <div ref={anchorRef} aria-haspopup="true" onClick={handleToggle}>
          {buttonComponent}
        </div>
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement={placement || "bottom-start"}
        role={undefined}
        transition
        style={{ zIndex: 100000 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  className={classes.menuList}
                  autoFocusItem={open}
                  id="currency-list"
                  onKeyDown={handleListKeyDown}
                  onClick={handleClose}
                >
                  {selectedCurrencyList.map((val) => {
                    const rate = currency.rates_from[selectedCurrency.code]?.find((curr) => curr.code === val.code);

                    return (
                      <MenuItem
                        disabled={val.code === selectedCurrency.code}
                        className={`${appTheme.selectMenuItem} ${error === val.code ? classes.error : ""}`}
                        key={val.code}
                        onClick={() => handleChange(val.code)}
                      >
                        <div>
                          <div>
                            {val.symbol} {val.code}
                          </div>
                          {selectedCurrency && val.code !== selectedCurrency.code && !!rate && (
                            <div className={classes.menuItemExchange}>
                              {selectedCurrency.code === "RUB"
                                ? `${rate.symbol}${rate.nominal} = ${selectedCurrency.symbol}${rate.rate.toFixed(4)}`
                                : `${selectedCurrency.symbol}${rate.nominal} = ${rate.symbol}${rate.rate.toFixed(4)}`}
                            </div>
                          )}
                        </div>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default CurrencyMenu;
