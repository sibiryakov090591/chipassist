import React from "react";
import { Link as RouterLink } from "react-router-dom";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./breadCrumbsStyles.js";

export const getCategoriesChildren = (categoriesId, categories) => {
  const cats = [];
  let parentId = categoriesId;
  while (parentId !== -1) {
    const cat = categories[parentId];
    cats.unshift(cat);
    parentId = cat.parentId;
  }
  return cats;
};

const BreadCrumbs = (props) => {
  const classes = useStyles();
  const categories = useAppSelector((state) => state.categories.categories);
  const loadedCategories = useAppSelector((state) => state.categories.loadedCategories);
  const breadCrumbs = loadedCategories && props.categoriesId && getCategoriesChildren(props.categoriesId, categories);

  return (
    <div className={classes.breadcrumbs}>
      {breadCrumbs &&
        breadCrumbs.length > 0 &&
        breadCrumbs.map((value, index, arr) => {
          return (
            <span key={value.id}>
              <RouterLink className={classes.breadcrumb} to={`/categories/${value.id}`}>
                {value.name}
              </RouterLink>
              {arr.length !== index + 1 && <ChevronRightIcon className={classes.breadcrumbSpan} />}
            </span>
          );
        })}
    </div>
  );
};

export default BreadCrumbs;
