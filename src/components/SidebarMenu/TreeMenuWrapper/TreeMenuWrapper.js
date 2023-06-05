import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import CloseIcon from "@material-ui/icons/Close";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Input } from "semantic-ui-react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import Preloader from "@src/components/Preloader/Preloader";
import TreeBeard from "../TreeMenu/TreeMenu";
import { useStyles } from "./treeMenuWrapperStyles";

function TreeMenuWrapper({
  data,
  onToggle,
  onToggleTreeMenu,
  styles,
  isOpen,
  rightPosition,
  inputOnchangeHandle,
  searchClearHandle,
  inputValue,
  inputSearch,
}) {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const classes = useStyles();
  const { t } = useI18n("home");

  return (
    <>
      {isLgUp && (
        <button className={`${classes.toggleTreeMenu} categories-button`} onClick={onToggleTreeMenu}>
          <span>{t("common.categories")}</span>
          <MenuIcon />
        </button>
      )}
      <div
        className={`
          ${isLgUp ? classes.treeMenuDesktop : classes.treeMenuMobile} 
          ${isOpen ? "is-active" : ""}
          ${rightPosition ? "right" : ""}
        `}
      >
        {isLgUp && (
          <button
            className={`
              ${classes.closeBtn}
              ${rightPosition ? "right" : ""}
            `}
            onClick={onToggleTreeMenu}
          >
            <KeyboardArrowLeftIcon />
          </button>
        )}
        <div className="cat-search">
          <Input
            onChange={inputOnchangeHandle}
            icon={{ name: "search", circular: false, link: true }}
            placeholder={t("common.catalog_search")}
            value={inputValue}
          />
          {inputSearch ? (
            <button onClick={searchClearHandle} style={styles.clearSearch}>
              <CloseIcon />
            </button>
          ) : (
            ""
          )}
        </div>
        {data.length === 0 ? <Preloader /> : <TreeBeard data={data} onToggle={onToggle} style={styles} />}
      </div>
    </>
  );
}

export default TreeMenuWrapper;
