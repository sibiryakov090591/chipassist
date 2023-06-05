import React, { useState, useEffect } from "react";
import { Hidden } from "@material-ui/core";
import { batch } from "react-redux";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import palette from "@src/themes/palette";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { withBaseIcon } from "react-icons-kit";
import { ic_list } from "react-icons-kit/md/ic_list";
import styled from "styled-components";
import useAppSelector from "@src/hooks/useAppSelector";
import Skeletons from "./components/Skeleton/Skeleton";
import FilterActions from "./components/FilterActions/FilterActions";
import FilterAttributeGroups from "../FilterAttributeGroups/FilterAttributeGroups";
import BaseFilters from "../BaseFilters/BaseFilters";
import AttributesFilters from "./components/AttributesFilters/AttributesFilters";
import BaseFilterPrice from "../BaseFilterPrice/BaseFilterPrice";
import { useStyles } from "./styles";

const TreeMenuPositionBtn = styled.button`
  position: relative;
  margin-left: auto;
  width: 24px;
  height: 18px;
  border: 1px solid #000;
  background: none;
  border-radius: 2px;
  cursor: pointer;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
  &::before {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 8px;
    background: #000;
  }
  &.right::before {
    right: auto;
    left: 0;
  }
`;

const HideMenuButtonText = styled.div`
  text-transform: uppercase;
  margin-bottom: 15px;
  white-space: nowrap;
  transform: rotate(-90deg);
  &.right {
    transform: rotate(90deg);
  }
`;

const Filters = (props: any) => {
  const classes = useStyles();
  const { t } = useI18n("search");
  const [localBaseFilters, setLocalBaseFilters] = useState({});
  const [prices, setPrices] = useState({ min: null, max: null });
  const [expanded, setExpanded] = useState(false);
  const isLoadingSearchResultsInProgress = useAppSelector((state) => state.search.isLoadingSearchResultsInProgress);
  const baseFilters = useAppSelector((state) => state.search.baseFilters);
  const maxPrice = useAppSelector((state) => state.search.searchResultsMaxPrice || 0);
  const minPrice = useAppSelector((state) => state.search.searchResultsMinPrice || 0);

  useEffect(() => {
    setLocalBaseFilters(baseFilters);
    setPrices({ min: baseFilters.base_price_min, max: baseFilters.base_price_max });
  }, [baseFilters]);

  const onClickToggle = () => {
    setExpanded(!expanded);
  };

  const onPriceChanged = (newPrices: { min: number; max: number }) => {
    batch(() => {
      setPrices({ ...newPrices, max: newPrices.max !== maxPrice ? newPrices.max : null });
      setLocalBaseFilters((prevState) => ({
        ...prevState,
        base_price_min: newPrices.min,
        base_price_max: newPrices.max,
      }));
    });
  };

  const onClearFilter = () => {
    batch(() => {
      setPrices({ min: null, max: null });
      setLocalBaseFilters(baseFilters);
    });
  };

  const onToggleMenuPosition = () => {
    localStorage.setItem("sidebarMenuRightPosition", `${!props.isRightSidebar}`);
    props.togglePosition();
  };

  const LeftMenuIconList = withBaseIcon({
    size: 24,
    style: {
      marginRight: 10,
      color: palette.primary.main,
    },
  });

  return (
    <div className={classes.wrapper}>
      <div className={classes.inner}>
        <button
          onClick={props.onHideToggle}
          className={`${classes.hideFiltersButton} ${props.isRightSidebar ? "right" : ""} ${
            props.isHideFilters ? "hideFilters" : ""
          }`}
        >
          <HideMenuButtonText className={props.isRightSidebar ? "right" : ""}>{t("common.filters")}</HideMenuButtonText>
          <ArrowForwardIcon />
        </button>

        <div>
          <div className={classes.menuHeader}>
            <LeftMenuIconList icon={ic_list} />
            {t("common.filters")}
            <Hidden mdDown>
              <TreeMenuPositionBtn
                onClick={onToggleMenuPosition}
                className={`${props.isRightSidebar ? "right" : ""}`}
              />
            </Hidden>
          </div>
          <div className={classes.filtersWrapper}>
            <div className={classes.filtersInner}>
              <div className={classes.filterContainerMain}>
                <div className={classes.baseFilters}>
                  {isLoadingSearchResultsInProgress && <Skeletons />}
                  {!isLoadingSearchResultsInProgress && (
                    <div className={classes.baseFiltersItems}>
                      <BaseFilters />
                      <BaseFilterPrice
                        prices={prices}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        onPriceChanged={onPriceChanged}
                      />
                    </div>
                  )}
                </div>
                <FilterAttributeGroups />
                <AttributesFilters />
              </div>
              <div className={classes.filtersActions}>
                <FilterActions
                  onClose={onClickToggle}
                  localBaseFilters={localBaseFilters}
                  onClearFilter={onClearFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
