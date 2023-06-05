/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import BreadCrumbs from "@src/components/BreadCrumbs/BreadCrumbs";
import { useStyles } from "./centralColumnStyles";
import Products from "./Products/Products";

const CentralColumn = () => {
  const classes = useStyles();
  const { categoriesId } = useParams();

  return (
    <div className={classes.root}>
      <BreadCrumbs categoriesId={categoriesId} />
      <Products categoriesId={categoriesId} />
    </div>
  );
};

CentralColumn.propTypes = {
  className: PropTypes.string,
};

export default CentralColumn;
