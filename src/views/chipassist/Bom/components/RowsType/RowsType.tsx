import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import React from "react";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppTheme from "@src/theme/useAppTheme";
import { useStyles } from "./styles";

export const rowsTypesValues = [
  {
    title: "all",
    value: "all",
  },
  {
    title: "found",
    value: "found",
  },
  {
    title: "not_found",
    value: "notfound",
  },
];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const RowsType: React.FC<Props> = ({ value, onChange }) => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const { t } = useI18n("bom");
  const options = rowsTypesValues;
  const currentItem = options.filter((item) => item.value === value);
  const orderTitle = currentItem && currentItem.length ? t(currentItem[0].title) : t("default");
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement | null>(null);
  const prevOpen = React.useRef(open);
  const isNotDefault = value !== rowsTypesValues[0].value;

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleSelect = (v: string) => (event: any) => {
    if (onChange) {
      onChange(v);
    }
    handleClose(event);
  };

  function handleListKeyDown(event: any) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.orderBy}>
      <div>
        <Button
          className={classes.orderButton}
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {t("product.products")}:
          <span className={`${isNotDefault ? classes.highlight : ""} ${classes.value}`}>
            {orderTitle.toLowerCase()}
          </span>
          <KeyboardArrowDownIcon className={classes.viewsFIcon} />
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition style={{ zIndex: 100 }}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {options.map((item) => {
                      return (
                        <MenuItem
                          className={appTheme.selectMenuItem}
                          key={item.value}
                          selected={value === item.value}
                          value={item.value}
                          onClick={handleSelect(item.value)}
                        >
                          {t(item.title)}
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
    </div>
  );
};

export default RowsType;
