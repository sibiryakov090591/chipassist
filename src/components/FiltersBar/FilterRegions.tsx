import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import * as countriesData from "@src/constants/countries";
import { clsx } from "clsx";
import { useStyles } from "./styles";

interface Props {
  action: (values: string[]) => void;
  selected: string[];
}

interface Data {
  [key: string]: {
    [key: string]: {
      name: string;
      checked: boolean;
    };
  };
}

const getRegionData = (iso3codes: string[]) => {
  return iso3codes.reduce((acc, code) => {
    const country = countriesData.countriesList.find((i) => i.iso_3166_1_a3 === code);
    if (country) return { ...acc, [code]: { name: country.printable_name, checked: false } };
    return acc;
  }, {});
};

const stateData = {
  Africa: getRegionData(countriesData.africaCountries),
  Asia: getRegionData(countriesData.asiaPacificCountries),
  Europe: getRegionData(countriesData.europeCountries),
  "Middle East": getRegionData(countriesData.middleEastCountries),
  "North America": getRegionData(countriesData.northAmericaCountries),
  "South America": getRegionData(countriesData.southLatinAmericaCountries),
};

const FilterRegions: React.FC<Props> = ({ action, selected }) => {
  const classes = useStyles();
  const { t } = useI18n("common");

  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Data>(stateData);
  const [extended, setExtended] = useState<{ [key: string]: boolean }>(
    Object.keys(stateData).reduce((acc, region) => ({ ...acc, [region]: false }), {}),
  );
  const [wasChanged, setWasChanged] = useState(false);

  const anchorRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setWasChanged(false);
    }
  }, [open]);

  useEffect(() => {
    if (selected) {
      const newData = { ...data };
      selected.forEach((code) => {
        Object.entries(newData).some(([region, countries]) => {
          if (countries[code]) {
            newData[region][code] = { ...countries[code], checked: true };
            return true;
          }
          return false;
        });
      });
      setData(newData);
    }
  }, [selected]);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const onExtendedHandler = (region: string) => () => {
    setExtended((prev) => ({ ...prev, [region]: !prev[region] }));
  };

  const handleClose = () => {
    if (wasChanged) {
      const codes: string[] = [];
      // eslint-disable-next-line guard-for-in
      for (const region in data) {
        for (const country in data[region]) {
          if (data[region][country].checked) {
            codes.push(country);
          }
        }
      }
      action(codes);
    }
    setOpen(false);
  };

  const onChangeRegion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (!wasChanged) setWasChanged(true);
    const newData = { ...data };
    Object.entries(data[name]).forEach(([code, value]) => {
      newData[name][code] = { ...value, checked };
    });
    setData(newData);
  };

  const onChangeCountry = (region: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (!wasChanged) setWasChanged(true);
    const newData = { ...data };
    Object.entries(data[region]).some(([code, value]) => {
      if (code === name) {
        newData[region][code] = { ...value, checked };
        return true;
      }
      return false;
    });
    setData(newData);
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
                <div className={classes.countriesBlock}>
                  {Object.entries(data).map(([region, countries]) => {
                    return (
                      <div key={region}>
                        <div className={classes.regionRow}>
                          <FormControlLabel
                            name={region}
                            control={
                              <Checkbox
                                className={classes.checkbox}
                                onChange={onChangeRegion}
                                defaultChecked={true}
                                checked={Object.values(data[region]).some((country) => country.checked)}
                              />
                            }
                            label={region}
                          />
                          <span className={classes.extendedIcon} onClick={onExtendedHandler(region)}>
                            {extended[region] ? <RemoveIcon /> : <AddIcon />}
                          </span>
                        </div>
                        <div className={clsx(classes.countriesWrapper, { show: extended[region] })}>
                          {Object.entries(countries).map(([code, value]) => {
                            return (
                              <div key={code}>
                                <FormControlLabel
                                  name={code}
                                  control={
                                    <Checkbox
                                      className={classes.checkbox}
                                      onChange={onChangeCountry(region)}
                                      checked={value.checked}
                                    />
                                  }
                                  label={value.name}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default FilterRegions;
