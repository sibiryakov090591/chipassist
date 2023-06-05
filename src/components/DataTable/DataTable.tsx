import { useMediaQuery, useTheme } from "@material-ui/core";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import clsx from "clsx";
import React, { PropsWithChildren, useContext } from "react";
import { useStyles } from "./dataTableStyles";

interface PropsContext {
  gridClass: string;
  gridAreasBreakpoint: Breakpoint;
  gridLabelsBreakpoint: Breakpoint;
}
interface PropsTable {
  gridClass: string;
  gridAreasBreakpoint: Breakpoint;
  gridLabelsBreakpoint?: Breakpoint;
  className?: string;
}
interface PropsHeader {
  className?: string;
}
interface PropsBody {
  className?: string;
}
interface PropsRow {
  className?: string;
  style?: React.CSSProperties;
}
interface PropsField {
  gridArea: string;
  className?: string;
  style?: React.CSSProperties;
}
interface PropsLabel {
  className?: string;
}
interface PropsValue {
  className?: string;
  style?: React.CSSProperties;
}

const DataContext = React.createContext<PropsContext>(null);

export const DataTable: React.FC<PropsWithChildren<PropsTable>> = ({
  children,
  className,
  gridClass,
  gridAreasBreakpoint,
  gridLabelsBreakpoint = "xs",
}) => {
  const classes = useStyles();
  return (
    <DataContext.Provider value={{ gridClass, gridAreasBreakpoint, gridLabelsBreakpoint }}>
      <section className={clsx(classes.dataTable, className)}>{children}</section>
    </DataContext.Provider>
  );
};

export const DataHeader: React.FC<PropsWithChildren<PropsHeader>> = ({ children, className }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dataContext = useContext(DataContext);
  const isGridAreasBreakpoint = useMediaQuery(theme.breakpoints.down(dataContext.gridAreasBreakpoint));
  let styles = {};
  if (isGridAreasBreakpoint) styles = { ...styles, display: "none" };
  return (
    <section
      className={clsx(
        classes.dataHeader,
        !isGridAreasBreakpoint && classes.dataGrid,
        !isGridAreasBreakpoint && dataContext.gridClass,
        className,
      )}
      style={styles}
    >
      {children}
    </section>
  );
};

export const DataBody: React.FC<PropsWithChildren<PropsBody>> = ({ children, className }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dataContext = useContext(DataContext);
  const isGridAreasBreakpoint = useMediaQuery(theme.breakpoints.down(dataContext.gridAreasBreakpoint));
  return (
    <section
      className={clsx(
        classes.dataBody,
        !isGridAreasBreakpoint && classes.dataGrid,
        !isGridAreasBreakpoint && dataContext.gridClass,
        className,
      )}
    >
      {children}
    </section>
  );
};

export const DataRow: React.FC<PropsWithChildren<PropsRow>> = ({ children, className, style }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dataContext = useContext(DataContext);
  const isGridAreasBreakpoint = useMediaQuery(theme.breakpoints.down(dataContext.gridAreasBreakpoint));
  return (
    <ul className={clsx(isGridAreasBreakpoint && dataContext.gridClass, classes.dataRow, className)} style={style}>
      {children}
    </ul>
  );
};

export const DataField: React.FC<PropsWithChildren<PropsField>> = ({ children, gridArea, className, style }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dataContext = useContext(DataContext);
  const isGridAreasBreakpoint = useMediaQuery(theme.breakpoints.down(dataContext.gridAreasBreakpoint));
  let styles = { ...style };
  if (isGridAreasBreakpoint) styles = { ...style, gridArea };
  return (
    <li className={clsx(classes.dataField, className)} style={styles}>
      {children}
    </li>
  );
};

export const DataLabel: React.FC<PropsWithChildren<PropsLabel>> = ({ children, className }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dataContext = useContext(DataContext);
  const isGridLabelsBreakpoint = useMediaQuery(theme.breakpoints.down(dataContext.gridLabelsBreakpoint));
  return (
    <div className={clsx(classes.dataLabel, className, isGridLabelsBreakpoint && classes.dataLabelBlock)}>
      {children}:
    </div>
  );
};

export const DataValue: React.FC<PropsWithChildren<PropsValue>> = ({ children, className, style }) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.dataValue, className)} style={style}>
      {children}
    </div>
  );
};

export default {
  DataTable,
  DataHeader,
  DataRow,
  DataField,
  DataLabel,
  DataValue,
};
