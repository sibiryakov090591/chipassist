import React, { useEffect, useState } from "react";
import { batch } from "react-redux";

import { TableCell, TableRow, FormControl, Select, MenuItem, InputAdornment } from "@material-ui/core";
import constants from "@src/constants/constants";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { NumberInput } from "@src/components/Inputs";
import useAppTheme from "@src/theme/useAppTheme";
import useAppSelector from "@src/hooks/useAppSelector";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import { FilterValues } from "../productSelectModalTypes";
import { useStyles } from "../productSelectModalStyles";

interface Props {
  loading: boolean;
  manufacturers: { id: number | string; name: number | string }[];
  partnumbers: { id: number | string; name: number | string }[];
  distributors: { id: number | string; name: number | string }[];
  relatedFilters: string[];
  filterValues: FilterValues;
  setFilterValues: React.Dispatch<React.SetStateAction<FilterValues>>;
  relatedFilterQueue: Map<string, number>;
  setRelatedFilterQueue: React.Dispatch<React.SetStateAction<Map<string, number>>>;
}

const RowFilters: React.FC<Props> = ({
  loading,
  manufacturers,
  partnumbers,
  distributors,
  relatedFilters,
  filterValues,
  setFilterValues,
  relatedFilterQueue,
  setRelatedFilterQueue,
}) => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const { t } = useI18n("bom");

  const canSkip = useAppSelector((state) => state.profile?.profileInfo?.canSkip);
  const [headersHeight, setHeadersHeight] = useState(40);

  // TableCell top offset style will be change depends on headers height
  useEffect(() => {
    setTimeout(() => {
      const headers = document.getElementById("productsTableHeaderNames");
      if (headers) setHeadersHeight(headers.clientHeight);
    }, 0);
  }, [loading]);

  const setFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    setStateFn: React.Dispatch<React.SetStateAction<FilterValues>>,
    filterName: string,
  ) => {
    batch(() => {
      const filterNumber = relatedFilterQueue.get(filterName);
      const filterLastNumber = [...relatedFilterQueue.values()].pop() || 0;
      if (!filterNumber && relatedFilters.includes(filterName)) {
        setRelatedFilterQueue((prevState) => new Map(prevState.set(filterName, filterLastNumber + 1)));
      }
      if (filterNumber && parseInt(e.target.value) === 0) {
        setRelatedFilterQueue((prevState) => {
          const keys = [...prevState.keys()];
          keys.slice(keys.indexOf(filterName) + 1).forEach((key) => {
            prevState.set(key, prevState.get(key) - 1);
          });
          prevState.delete(filterName);
          return new Map(prevState);
        });
      }

      setStateFn((prevState) => ({ ...prevState, [filterName]: e.target.value }));
    });
  };

  return (
    <TableRow className={classes.productsTableHeaderFilters}>
      <TableCell style={{ top: headersHeight }} className={classes.thFilters}>
        <FormControl size="small" variant="outlined" className={classes.sortSelect}>
          <Select
            value={filterValues.manufacturer}
            onChange={(e) => setFilter(e as React.ChangeEvent<HTMLInputElement>, setFilterValues, "manufacturer")}
          >
            <MenuItem className={appTheme.selectMenuItem} value={0}>
              <em>{t("all")}</em>
            </MenuItem>
            {manufacturers
              .filter((val) => !!val.id)
              .map((val) => (
                <MenuItem className={appTheme.selectMenuItem} key={val.id} value={val.name}>
                  {val.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell style={{ top: headersHeight }} className={classes.thFilters}>
        <FormControl size="small" variant="outlined" className={classes.sortSelect}>
          <Select
            value={filterValues.partnumber}
            onChange={(e) => setFilter(e as React.ChangeEvent<HTMLInputElement>, setFilterValues, "partnumber")}
          >
            <MenuItem className={appTheme.selectMenuItem} value={0}>
              <em>{t("all")}</em>
            </MenuItem>
            {partnumbers.map((val) => (
              <MenuItem className={appTheme.selectMenuItem} key={val.id} value={val.name}>
                {val.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </TableCell>
      {constants.id !== ID_ICSEARCH && (
        <TableCell style={{ top: headersHeight }} className={classes.thFilters}>
          <FormControl size="small" variant="outlined" className={classes.sortSelect}>
            <Select
              value={filterValues.distributor}
              onChange={(e) => setFilter(e as React.ChangeEvent<HTMLInputElement>, setFilterValues, "distributor")}
            >
              <MenuItem className={appTheme.selectMenuItem} value={0}>
                <em>{t("all")}</em>
              </MenuItem>
              {distributors.map((val) => (
                <MenuItem className={appTheme.selectMenuItem} key={val.id} value={val.name}>
                  {val.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableCell>
      )}
      <TableCell style={{ top: headersHeight }} className={classes.thFilters}>
        <NumberInput
          variant="outlined"
          size="small"
          style={{ width: 80 }}
          value={filterValues.moq}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilter(e as React.ChangeEvent<HTMLInputElement>, setFilterValues, "moq")
          }
          InputProps={{
            startAdornment: <InputAdornment position="start">{"<="}</InputAdornment>,
          }}
          decimalScale={0}
        />
      </TableCell>
      <TableCell style={{ top: headersHeight }} className={classes.thFilters}></TableCell>
      <TableCell style={{ top: headersHeight }} className={classes.thFilters}>
        <NumberInput
          variant="outlined"
          size="small"
          style={{ width: 80 }}
          value={filterValues.price} // TODO::price
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilter(e as React.ChangeEvent<HTMLInputElement>, setFilterValues, "price")
          }
          InputProps={{
            startAdornment: <InputAdornment position="start">{"<="}</InputAdornment>,
          }}
          decimalScale={2}
        />
      </TableCell>
      <TableCell style={{ top: headersHeight }} className={classes.thFilters}>
        <NumberInput
          variant="outlined"
          size="small"
          style={{ width: 80 }}
          value={filterValues.stock}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilter(e as React.ChangeEvent<HTMLInputElement>, setFilterValues, "stock")
          }
          InputProps={{
            startAdornment: <InputAdornment position="start">{">="}</InputAdornment>,
          }}
          decimalScale={0}
        />
      </TableCell>
      <TableCell style={{ top: headersHeight }} className={classes.thFilters}></TableCell>
      <TableCell style={{ top: headersHeight }} className={classes.thFilters}></TableCell>
      {canSkip && <TableCell style={{ top: headersHeight }} className={classes.thFilters}></TableCell>}
      <TableCell style={{ top: headersHeight }} className={classes.thFilters}></TableCell>
      <TableCell style={{ top: headersHeight }} className={classes.thFilters}></TableCell>
    </TableRow>
  );
};

export default RowFilters;
