import React from "react";
import { showCategories } from "@src/constants/defaults";
import FilterActions from "@src/views/chipassist/Search/components/Filters/components/FilterActions/FilterActions";
import BaseFilters from "@src/views/chipassist/Search/components/BaseFilters/BaseFilters";
import FilterAttributeGroups from "@src/views/chipassist/Search/components/FilterAttributeGroups/FilterAttributeGroups";
import AttributesFilters from "@src/views/chipassist/Search/components/Filters/components/AttributesFilters/AttributesFilters";
import useAppSelector from "@src/hooks/useAppSelector";
import useStyles from "./sidebarFiltersStyles";

function SidebarFilters() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const baseFilters = useAppSelector((state) => state.search.baseFilters);

  const onClickToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.sidebarFiltersWrapper}>
      <div>
        <BaseFilters categoriesHidden={true} />
        {showCategories && <FilterAttributeGroups />}
        {showCategories && <AttributesFilters />}
      </div>
      <div className={classes.sidebarFiltersActions}>
        <FilterActions onClose={onClickToggle} localBaseFilters={baseFilters} />
      </div>
    </div>
  );
}

export default SidebarFilters;
