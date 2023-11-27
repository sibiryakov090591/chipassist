import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import _ from "lodash";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Checkbox, FormControlLabel, Box } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { useStyles } from "./styles";

interface Props {
  action: (values: string[]) => void;
  selected: string[];
}

const regions = {
  africaCountries: "Africa",
  arabStatesCountries: "Arab States",
  asiaPacificCountries: "Asia & Pacific",
  europeCountries: "Europe",
  middleEastCountries: "Middle East",
  northAmericaCountries: "North America",
  southLatinAmericaCountries: "South America",
};

const FilterRegions: React.FC<Props> = ({ action, selected }) => {
  const classes = useStyles();
  const { t } = useI18n("common");

  const [open, setOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [prevState, setPrevState] = useState([]);

  const anchorRef = useRef(null);
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (selected) {
      setSelectedRegions(selected);
      setPrevState(selected);
    }
  }, [selected]);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    if (!_.isEqual(prevState, selectedRegions)) action(selectedRegions);
    setOpen(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      return setSelectedRegions((prev) => [...prev, name]);
    }
    return setSelectedRegions((prev) => prev.filter((i) => i !== name));
  };

  return (
    <div>
      <Button
        className={classes.showButton}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={toggleOpen}
        ref={anchorRef}
      >
        {t("regions")}
        <KeyboardArrowDownIcon className={classes.viewsFIcon} />
      </Button>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} style={{ zIndex: 100 }} transition>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Box p="2px 16px">
                  {Object.entries(regions).map(([key, label]) => {
                    return (
                      <div key={key}>
                        <FormControlLabel
                          name={key}
                          control={
                            <Checkbox
                              className={classes.checkbox}
                              onChange={onChange}
                              checked={selectedRegions.includes(key)}
                            />
                          }
                          label={label}
                        />
                      </div>
                    );
                  })}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default FilterRegions;
