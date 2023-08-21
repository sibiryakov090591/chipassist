import React, { useEffect, useState, useRef } from "react";
import useAppSelector from "@src/hooks/useAppSelector";
import { CurrenciesAllowed, Currency } from "@src/store/currency/currencyTypes";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Button, Popper, Grow, Paper, MenuList, MenuItem, ClickAwayListener } from "@material-ui/core";
import useAppTheme from "@src/theme/useAppTheme";
import { useStyles } from "./styles";

interface Props {
  setCurrencyHandler: (currency: CurrenciesAllowed) => void;
  className: string;
  selected?: CurrenciesAllowed;
}

const CurrencyMenu: React.FC<Props> = ({ setCurrencyHandler, selected }) => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const anchorRef = useRef(null);

  const currency = useAppSelector((state) => state.currency);
  const currencyList = useAppSelector((state) => state.currency.currencyList);

  const [open, setOpen] = useState(false);
  const [selectedCurrencyList, setSelectedCurrencyList] = useState<Currency[]>([]);

  useEffect(() => {
    setSelectedCurrencyList(currencyList);
  }, [currency]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        <div ref={anchorRef} aria-haspopup="true" onClick={handleToggle}>
          <Button className={classes.currency}>
            {selected}
            <KeyboardArrowDownIcon className={classes.viewsFIcon} />
          </Button>
        </div>
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement={"bottom-start"}
        role={undefined}
        transition
        style={{ zIndex: 100000 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList className={classes.menuList} autoFocusItem={open} id="currency-list" onClick={handleClose}>
                  {selectedCurrencyList.map((val) => {
                    return (
                      <MenuItem
                        disabled={val.code === selected}
                        className={appTheme.selectMenuItem}
                        key={val.code}
                        onClick={() => setCurrencyHandler(val.code)}
                      >
                        <div>
                          {val.symbol} {val.code}
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
