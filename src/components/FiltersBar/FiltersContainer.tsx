import clsx from "clsx";
import React, { useState, useMemo } from "react";
import { useMediaQuery, useTheme, IconButton } from "@material-ui/core";
import three_dots from "@src/images/Icons/three-dots.svg";
import { useStyles } from "./styles";

export const FiltersContext = React.createContext<{ showFilters: boolean; toggleShowFilters: () => void }>(null);

const FiltersContainer: React.FC = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [showFilters, setShowFilters] = useState(false);
  const isShowCollapseIcon = useMemo(() => isSmDown && React.Children.toArray(children).length > 2, [
    children,
    isSmDown,
  ]);

  const toggleShowFilters = () => setShowFilters((prevState) => !prevState);

  return (
    <FiltersContext.Provider value={{ showFilters, toggleShowFilters }}>
      <div
        className={clsx({
          [classes.rightControls]: true,
          [classes.rightControlsTwoItems]: isSmDown && !isShowCollapseIcon,
          [classes.rightControlsOpened]: showFilters,
        })}
      >
        {React.Children.toArray(children).map((child, i) => {
          if (i === 0) {
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
          }

          return (
            <React.Fragment key={i}>
              {!isSmDown && <div className={classes.counterF} />}
              <div
                className={clsx({
                  [classes.child]: isSmDown && i > (isShowCollapseIcon ? 0 : 1),
                  [classes.withBorder]: isShowCollapseIcon,
                  [classes.marginBottomLastChild]: isShowCollapseIcon,
                })}
              >
                {child}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </FiltersContext.Provider>
  );
};

export default FiltersContainer;
