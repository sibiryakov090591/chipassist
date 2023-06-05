import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import SaveIcon from "@material-ui/icons/Save";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RestoreIcon from "@material-ui/icons/Restore";
import { batch } from "react-redux";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useLocation, useNavigate } from "react-router-dom";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import {
  removeFilterFieldsAction,
  saveFiltersAction,
  loadFiltersAction,
  clearFilterFieldsValuesAction,
  resetBaseFilters,
  toggleReloadSearchFlag,
} from "@src/store/search/searchActions";
import { setUrlWithFilters } from "@src/utils/setUrl";
import { orderByValues } from "@src/components/FiltersBar/FilterOrderByBar";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useStyles } from "./styles";

const FilterActions = ({ localBaseFilters, onClearFilter, onClose }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const navigate = useNavigate();
  const pageSize = useAppSelector((state) => state.search.pageSize);
  const query = useAppSelector((state) => state.search.query);
  const filtersValues = useAppSelector((state) => state.search.filtersValues);
  const isSearchPage = window.location.pathname === "/search";
  const params = new URLSearchParams(location.search);
  const urlBaseFilters = useURLSearchParams("base_filters", true, null);
  const { t } = useI18n("search");

  const orderBy = params.get("order_by")
    ? params.get("order_by")
    : localStorage.getItem("mainOrderBy") || orderByValues[0].value;

  const onApplyHandler = () => {
    setUrlWithFilters(
      window.location.pathname,
      navigate,
      isSearchPage ? query : "",
      1,
      pageSize,
      orderBy,
      filtersValues,
      localBaseFilters,
    );
    dispatch(toggleReloadSearchFlag());
    onClose();
  };

  const onSaveHandler = () => {
    dispatch(saveFiltersAction(localBaseFilters));
  };

  const onLoadHandler = () => {
    dispatch(loadFiltersAction());
  };

  const onClearHandler = () => {
    if (onClearFilter) onClearFilter();

    batch(() => {
      dispatch(resetBaseFilters());
      dispatch(removeFilterFieldsAction());
      dispatch(clearFilterFieldsValuesAction());
    });

    setUrlWithFilters(window.location.pathname, navigate, isSearchPage ? query : "", 1, pageSize, orderBy);
    dispatch(toggleReloadSearchFlag());
    onClose();
  };

  const onRestoreHandler = () => {
    setUrlWithFilters(
      window.location.pathname,
      navigate,
      isSearchPage ? query : "",
      1,
      pageSize,
      orderBy,
      {},
      urlBaseFilters,
    );
    dispatch(toggleReloadSearchFlag());
    onClose();
  };

  return (
    <BottomNavigation
      onChange={() => {
        return true;
      }}
      showLabels
      className={classes.menu}
    >
      <BottomNavigationAction
        label={t("apply_filters")}
        onClick={onApplyHandler}
        className={classes.applyFilters}
        icon={<CheckCircleOutlineIcon />}
      />

      {isAuthenticated && (
        <BottomNavigationAction
          label={t("save_filters")}
          onClick={onSaveHandler}
          className={classes.saveFilters}
          icon={<SaveIcon />}
        />
      )}

      {isAuthenticated && (
        <BottomNavigationAction
          label={t("load_filters")}
          onClick={onLoadHandler}
          className={classes.loadFilters}
          icon={<GetAppIcon />}
        />
      )}

      <BottomNavigationAction
        label={t("restore_defaults")}
        onClick={onRestoreHandler}
        className={classes.restoreFilters}
        icon={<RestoreIcon />}
      />

      <BottomNavigationAction
        label={t("clear_all")}
        onClick={onClearHandler}
        className={classes.deleteFilters}
        icon={<DeleteForeverIcon />}
      />
    </BottomNavigation>
  );
};

export default FilterActions;
