import { FormControlLabel, Checkbox } from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { toggleReloadSearchFlag } from "@src/store/search/searchActions";
import { setUrlWithFilters } from "@src/utils/setUrl";
import React from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useLocation, useNavigate } from "react-router-dom";
// import useAppTheme from "@src/theme/useAppTheme";
import { orderByValues } from "./FilterOrderByBar";
import { useStyles } from "./styles";

interface Props {
  disable: boolean;
}

const StockBarFilter: React.FC<Props> = ({ disable }) => {
  // const appTheme = useAppTheme();
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { t } = useI18n("search");
  const location = useLocation();
  const navigate = useNavigate();

  const baseFilters = useAppSelector((state) => state.search.baseFilters);
  const pageSize = useAppSelector((state) => state.search.pageSize);
  const query = useAppSelector((state) => state.search.query);
  // const filtersValues = useAppSelector((state) => state.search.filtersValues);

  const isSearchPage = window.location.pathname === "/search";
  const params = new URLSearchParams(location.search);
  const orderBy = params.get("order_by")
    ? params.get("order_by")
    : localStorage.getItem("mainOrderBy") || orderByValues[0].value;

  const onChangeInStock = () => {
    localStorage.setItem("productStock", !baseFilters.base_in_stock ? "true" : "false");
    setUrlWithFilters(window.location.pathname, navigate, isSearchPage ? query : "", 1, pageSize, orderBy, null, {
      ...baseFilters,
      base_in_stock: !baseFilters.base_in_stock,
      base_num_in_stock: !baseFilters.base_in_stock ? 1 : "",
    });
    dispatch(toggleReloadSearchFlag());
  };

  return (
    <FormControlLabel
      className={classes.filterStockBar}
      disabled={disable}
      control={
        <Checkbox
          className={classes.checkbox}
          checked={baseFilters.base_in_stock}
          onChange={onChangeInStock}
          name="base_in_stock"
          disableRipple={true}
          disabled={disable}
        />
      }
      label={t("product.status_online")}
    />
  );
};

export default StockBarFilter;
