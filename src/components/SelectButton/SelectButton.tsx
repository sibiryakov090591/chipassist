import React, { useState, useRef } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Button, Popper, Grow, Paper, MenuList, MenuItem, ClickAwayListener } from "@material-ui/core";
import useAppTheme from "@src/theme/useAppTheme";
import { useStyles } from "./styles";

interface Props {
  onChange: (value: any) => void;
  options: { label: string; value: string }[];
  className?: string;
  selected?: any;
}

const SelectButton: React.FC<Props> = ({ onChange, selected, options }) => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);

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
          <Button className={classes.button}>
            {options.find((i) => i.value === selected)?.label || selected}
            <KeyboardArrowDownIcon className={classes.arrow} />
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
                <MenuList className={classes.menuList} autoFocusItem={open} id="list" onClick={handleClose}>
                  {options.map((val) => {
                    return (
                      <MenuItem
                        selected={val.value === selected}
                        className={appTheme.selectMenuItem}
                        key={val.value}
                        onClick={() => onChange(val.value)}
                      >
                        <div>{val.label}</div>
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

export default SelectButton;
