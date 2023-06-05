import React, { useEffect, useRef, useState } from "react";
import useAppTheme from "@src/theme/useAppTheme";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SendIcon from "@material-ui/icons/Send";
import { ResponseManufacturer } from "@src/store/manufacturers/manufacturersTypes";
import { TextField, useMediaQuery, useTheme } from "@material-ui/core";
import clsx from "clsx";
import { useStyles } from "../supplierResponseStyles";

interface Props {
  selected: ResponseManufacturer;
  otherName: string;
  list: ResponseManufacturer[];
  onSelectHandler: (item: ResponseManufacturer) => void;
  onChangeHandler: (name: string) => void;
}

const ManufacturerSelect: React.FC<Props> = ({ onSelectHandler, onChangeHandler, selected, otherName, list }) => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const anchorRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) setName("");
  }, [open]);

  const onSelect = (e: React.ChangeEvent<any>) => {
    const manufacturer = list?.find((item) => item.id === e.currentTarget.value);
    if (manufacturer) onSelectHandler(manufacturer);
    setOpen(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      if (name) onChangeHandler(name);
      setOpen(false);
    }
  };

  const onSaveName = () => {
    if (name) onChangeHandler(name);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const onClickAway = () => {
    // if (name) onChangeHandler(name);
    setOpen(false);
  };

  return (
    <>
      {isSmDown && (
        <TextField
          onClick={handleToggle}
          ref={anchorRef}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: <KeyboardArrowDownIcon className={clsx(classes.arrow, { [classes.activeArrow]: open })} />,
          }}
          label={"Manufacturer"}
          value={otherName || selected?.name || ""}
          size="small"
          fullWidth
        />
      )}
      {!isSmDown && (
        <div onClick={handleToggle} ref={anchorRef} className={classes.manufacturerSelect}>
          <div className={classes.manufacturerName}>{otherName || selected?.name || ""}</div>
          <KeyboardArrowDownIcon className={clsx(classes.arrow, { [classes.activeArrow]: open })} />
        </div>
      )}
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} style={{ zIndex: 100 }} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={onClickAway}>
                <div>
                  <TextField
                    className={classes.otherManufacturerInput}
                    variant="outlined"
                    label={"Other manufacturer"}
                    size="small"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    InputProps={{
                      endAdornment: (
                        <SendIcon
                          className={clsx(classes.arrowButton, { [classes.disabledArrow]: !name })}
                          onClick={onSaveName}
                        />
                      ),
                    }}
                  />

                  {!!list?.length && (
                    <MenuList autoFocusItem={open} id="menu-list-grow">
                      {list.map((item) => {
                        return (
                          <MenuItem
                            key={item.id}
                            className={appTheme.selectMenuItem}
                            value={item.id}
                            selected={selected?.id === item.id}
                            onClick={onSelect}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  )}
                  {!list?.length && <div className={classes.emptyList}>No options</div>}
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default ManufacturerSelect;
