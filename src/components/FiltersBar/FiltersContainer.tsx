import clsx from "clsx";
import React, { useState, useMemo, PropsWithChildren } from "react";
import { useMediaQuery, useTheme, IconButton, Box } from "@material-ui/core";
import three_dots from "@src/images/Icons/three-dots.svg";
import { useStyles } from "./styles";

interface Props {
  filtersCountToCollapse?: number;
}

export const FiltersContext = React.createContext<{ showFilters: boolean; toggleShowFilters: () => void }>(null);

const FiltersContainer: React.FC<PropsWithChildren<Props>> = ({ filtersCountToCollapse, children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const isXsDown = useMediaQuery(theme.breakpoints.down(400));

  const [showFilters, setShowFilters] = useState(false);
  const isShowCollapseIcon = useMemo(
    () => isSmDown && React.Children.toArray(children).length >= (isXsDown ? 3 : filtersCountToCollapse || 3),
    [children, isSmDown, isXsDown],
  );

  const toggleShowFilters = () => setShowFilters((prevState) => !prevState);

  return (
    <FiltersContext.Provider value={{ showFilters, toggleShowFilters }}>
      <div
        className={clsx(classes.rightControls, {
          [classes.rightControlsTwoItems]: isSmDown && !isShowCollapseIcon,
          [classes.rightControlsOpened]: showFilters,
        })}
      >
        {React.Children.toArray(children)
          .slice(0, 1)
          .map((child, i) => {
            if (isShowCollapseIcon) {
              return (
                <div key={i} className={classes.firstChild}>
                  {child}
                  <IconButton className={classes.filtersIcon} onClick={toggleShowFilters}>
                    <img src={three_dots} alt="Filters" />
                  </IconButton>
                </div>
              );
            }
            return child;
          })}
        <Box
          display="flex"
          alignItems="center"
          className={clsx({ [classes.restFiltersContainer]: isShowCollapseIcon })}
        >
          {React.Children.toArray(children).map((child, i) => {
            if (i === 0) return null;
            return (
              <React.Fragment key={i}>
                {(!isSmDown || (!isShowCollapseIcon && i > 1)) && <div className={classes.counterF} />}
                <div
                  className={clsx({
                    [classes.child]: isShowCollapseIcon,
                    [classes.withBorder]: isShowCollapseIcon,
                    [classes.marginBottomLastChild]: isShowCollapseIcon,
                  })}
                >
                  {child}
                </div>
              </React.Fragment>
            );
          })}
        </Box>
      </div>
    </FiltersContext.Provider>
  );
};

export default FiltersContainer;
