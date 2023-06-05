import React, { useEffect, useRef, useState } from "react";

import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import useAppTheme from "@src/theme/useAppTheme";
import { useStyles } from "./styles";

interface Props {
  groupAction: (value: string) => void;
  groupBy: string;
}

const FilterGroupBar: React.FC<Props> = ({ groupAction, groupBy }) => {
  const classes = useStyles();
  const appTheme = useAppTheme();

  const [openRfqsGroup, setOpenRfqsGroup] = useState(false);

  const anchorRef = useRef(null);
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(openRfqsGroup);

  useEffect(() => {
    if (prevOpen.current === true && openRfqsGroup === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openRfqsGroup;
  }, [openRfqsGroup]);

  const handleRfqsToggle = () => {
    setOpenRfqsGroup((prevState) => !prevState);
  };

  const handleRfqsGroupClose = (value: string) => {
    localStorage.setItem("rfqsGroupBy", value);
    groupAction(value);
    setOpenRfqsGroup(false);
  };

  return (
    <div>
      <Button
        className={classes.showButton}
        aria-controls={openRfqsGroup ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleRfqsToggle}
        ref={anchorRef}
      >
        Group by {groupBy}
        <KeyboardArrowDownIcon className={classes.viewsFIcon} />
      </Button>
      <Popper open={openRfqsGroup} anchorEl={anchorRef.current} role={undefined} style={{ zIndex: 100 }} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpenRfqsGroup(false)}>
                <MenuList autoFocusItem={openRfqsGroup} id="menu-list-grow">
                  <MenuItem
                    className={appTheme.selectMenuItem}
                    selected={groupBy === "date"}
                    onClick={() => handleRfqsGroupClose("date")}
                  >
                    Group by date
                  </MenuItem>
                  <MenuItem
                    className={appTheme.selectMenuItem}
                    selected={groupBy === "time"}
                    onClick={() => handleRfqsGroupClose("time")}
                  >
                    Group by time
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default FilterGroupBar;
