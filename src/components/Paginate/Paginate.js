import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { colors, useMediaQuery, useTheme } from "@material-ui/core";
import ReactPaginate from "react-paginate";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.button,
    listStyle: "none",
    userSelect: "none",
    display: "flex",
    alignItems: "center",
  },
  active: {},
  activeLink: {},
  break: {},
  breakLink: {},
  disabled: {},
  next: {
    marginLeft: theme.spacing(1),
  },
  nextLink: {
    padding: "6px 16px",
    outline: "none",
    cursor: "pointer",
    borderRadius: 4,
    "&:hover": {
      backgroundColor: colors.blueGrey[50],
    },
  },
  page: {},
  pageLink: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(1, 2),
    outline: "none",
    cursor: "pointer",
    minWidth: 40,
    height: 40,
    borderRadius: "20px",
    display: "block",
    textAlign: "center",
    "&:hover": {
      backgroundColor: colors.blueGrey[50],
      color: theme.palette.text.primary,
    },
    "&$activeLink": {
      backgroundColor: theme.palette.app.red400,
      color: theme.palette.white,
      // color: theme.palette.text.primary
      // backgroundColor: colors.blueGrey[50],
    },
  },
  previous: {
    marginRight: theme.spacing(1),
  },
  previousLink: {
    padding: "6px 16px",
    outline: "none",
    cursor: "pointer",
    borderRadius: 4,
    "&:hover": {
      backgroundColor: colors.blueGrey[50],
    },
  },
}));

const Paginate = (props) => {
  const { pageCount, pageRangeDisplayed, onPageChange, className, activePage, ...rest } = props;
  const classes = useStyles();
  const { t } = useI18n("common");
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ReactPaginate
      activeClassName={classes.active}
      activeLinkClassName={classes.activeLink}
      breakClassName={classes.break}
      breakLabel="..."
      breakLinkClassName={classes.breakLink}
      containerClassName={clsx(classes.root, className)}
      disabledClassName={classes.disabled}
      marginPagesDisplayed={2}
      nextClassName={classes.next}
      nextLabel={isSmDown ? false : t("next")}
      nextLinkClassName={classes.nextLink}
      onPageChange={onPageChange}
      pageClassName={classes.page}
      pageCount={pageCount}
      pageLinkClassName={classes.pageLink}
      pageRangeDisplayed={isSmDown ? 2 : pageRangeDisplayed}
      previousClassName={classes.previous}
      previousLabel={isSmDown ? false : t("previous")}
      previousLinkClassName={classes.previousLink}
      subContainerClassName="pages pagination"
      initialPage={activePage - 1}
      forcePage={activePage - 1}
      disableInitialCallback={true}
      {...rest}
    />
  );
};

Paginate.propTypes = {
  className: PropTypes.string,
  onPageChange: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageRangeDisplayed: PropTypes.number.isRequired,
  activePage: PropTypes.number,
};

Paginate.defaultProps = {
  onPageChange: () => {
    return true;
  },
  pageRangeDisplayed: 5,
  activePage: 1,
};

export default Paginate;
