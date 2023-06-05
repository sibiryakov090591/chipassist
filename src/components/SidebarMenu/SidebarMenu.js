/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-proto */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-rest-params */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-func-assign */
/* eslint-disable no-shadow */
/* eslint-disable no-void */
/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-multi-assign */
/* eslint-disable no-underscore-dangle */

import React from "react";
import styles from "./sidebarMenuStyles";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { showCategories } from "@src/constants/defaults";
import { filterTree } from "./TreeMenu/filter";
import palette from "@src/themes/palette";
import { withBaseIcon } from "react-icons-kit";
import { ic_list } from "react-icons-kit/md/ic_list";
import styled from "styled-components";
import { withTranslation } from "react-i18next";
import { loadCategoriesThunk, categoriesClickThunk } from "@src/store/categories/categoriesActions";
import "./TreeMenu/menuStyles.scss";
import { getCategoriesChildren } from "../BreadCrumbs/BreadCrumbs";
import { Hidden } from "@material-ui/core";
import SidebarFilters from "./SidebarFilters/SidebarFilters";
import TreeMenuWrapper from "./TreeMenuWrapper/TreeMenuWrapper";
import ClickOutsideListener from "@src/components/ClickOutsideListener/ClickOutsideListener";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

export function cleanActive(_tree) {
  const _nTree = [];
  _tree.map((_val) => {
    if (_val.children) {
      const _nChild = [];

      _val.children.map((_chVal) => {
        if (_chVal.active) {
          const _nChVal = { ..._chVal, active: false };
          _nChild.push(_nChVal);
        } else {
          _nChild.push({ ..._chVal });
        }
      });

      const __val = { ..._val, children: _nChild };

      if (__val.active) {
        const _nVal = { ...__val, active: false };
        _nTree.push(_nVal);
      } else {
        _nTree.push({ ...__val });
      }
    } else if (_val.active) {
      const _nVal = { ..._val, active: false };
      _nTree.push(_nVal);
    } else {
      _nTree.push({ ..._val });
    }
  });
  return _nTree;
}

export function cleanToggled(_tree) {
  const _nTree = [];
  _tree.map((_val) => {
    if (_val.children) {
      const _nChild = [];

      _val.children.map((_chVal) => {
        if (_chVal.toggled) {
          const _nChVal = { ..._chVal, toggled: false };
          _nChild.push(_nChVal);
        } else {
          _nChild.push({ ..._chVal });
        }
      });

      const __val = { ..._val, children: _nChild };

      if (__val.toggled) {
        const _nVal = { ...__val, toggled: false };
        _nTree.push(_nVal);
      } else {
        _nTree.push({ ...__val });
      }
    } else if (_val.toggled) {
      const _nVal = { ..._val, toggled: false };
      _nTree.push(_nVal);
    } else {
      _nTree.push({ ..._val });
    }
  });
  return _nTree;
}

const LeftMenuIconList = withBaseIcon({
  size: 24,
  style: {
    marginRight: 10,
    color: palette.primary.main,
  },
});
const navbarTopLine = 207;

const topFixLevel = navbarTopLine;

const HideMenuButtonText = styled.div`
  text-transform: uppercase;
  margin-bottom: 15px;
  white-space: nowrap;
  transform: rotate(-90deg);
  &.right {
    transform: rotate(90deg);
  }
`;

const TreeMenuBlock = styled.div`
  order: -1;
  transition: all 0.2s ease;
  margin: 0;
  grid-area: fil;
  @media (max-width: 1279.95px) {
    position: absolute;
  }
  &.hideFilters {
    position: absolute;
    top: 0;
    left: calc(-320px - 2em);
    bottom: 0;
    width: 320px;
  }
  &.right {
    transform: translateX(-4em);
    order: 2;
    &.hideFilters {
      position: absolute;
      top: 0;
      left: auto;
      right: calc(-320px - 2em);
      bottom: 0;
      width: 320px;
    }
  }
  @media (max-width: 1280px) {
    margin: 0;
  }
`;

const ToggleFiltersButton = styled.button`
  transform: translateX(-2em);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 2em;
  border: none;
  cursor: pointer;
  color: #fff;
  opacity: 0.8;
  transition: opacity 200ms;
  &:hover {
    opacity: 1;
  }

  & > svg {
    transition: transform 300ms;
    transform: rotate(180deg);
  }

  &.hideFilters {
    transform: translateX(320px);

    & > svg {
      transition: transform 300ms;
      transform: rotate(0deg);
    }
  }

  &.right {
    left: auto;
    right: -4em;
    direction: rtl;

    & > svg {
      transform: rotate(0deg);
    }

    &.hideFilters {
      transform: translateX(-320px);
      right: 0;
      & > svg {
        transform: rotate(180deg);
      }
    }
  }
`;

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

const TreeMenuBody = styled.div`
  transition: all 0.2s ease;
  &.right {
    transform: translateX(-2em);
  }
`;

const nodeSearch = (treeSlice, nodeId, tail = []) => {
  const searchedNode = treeSlice.children.filter((val) => {
    return val.id === nodeId;
  });
  if (searchedNode.length > 0) {
    tail.push(searchedNode[0]);
  }
  treeSlice.children.map((val) => {
    nodeSearch(val, nodeId, tail);
  });
};

@connect(
  createSelector(
    [
      (state) => state.categories.categoriesMap,
      (state) => state.categories.categories,
      (state) => state.categories.loadedCategories,
      (state, props) => props.treeMenu,
      (state, props) => props.toggled,
      (state, props) => props.activeNode,
    ],
    (categoriesMap, categories, loadedCategories, treeMenu, toggled, activeNode) => {
      return {
        categoriesMap,
        categoriesById: categories,
        loadedCategories,
        treeMenu: cleanActive(treeMenu),
      };
    },
  ),
  { loadCategoriesThunk, categoriesClickThunk },
)
class SidebarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
    this.onCloseTreeMenu = this.onCloseTreeMenu.bind(this);
    this.onToggleTreeMenu = this.onToggleTreeMenu.bind(this);
    this.searchClearHandle = this.searchClearHandle.bind(this);
    this.inputOnchangeHandle = this.inputOnchangeHandle.bind(this);
    this.onToggleMenuPosition = this.onToggleMenuPosition.bind(this);
    this.updateTreeMenu = this.updateTreeMenu.bind(this);
    this.state = {
      treeMenu: [],
      treeMenuIsOpen: false,
      isFixed: window.scrollY > topFixLevel,
      value: "",
      search: null,
      activeCategory: this.props.match.params.categoriesId,
      menuRightPosition: false,
      categoryId: null,
    };
  }

  componentDidMount() {
    const menuPosition = localStorage.getItem("sidebarMenuRightPosition") === "true";
    if (this.state.treeMenu.length === 0) {
      this.setState({
        treeMenu: this.props.treeMenu.slice(),
        menuRightPosition: menuPosition,
      });
    } else {
      this.setState({ menuRightPosition: menuPosition });
    }

    this.updateTreeMenu({});
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.categoriesId !== this.props.match.params.categoriesId ||
      prevProps.treeMenu !== this.props.treeMenu ||
      prevProps.activeNode !== this.props.activeNode
    ) {
      this.updateTreeMenu(prevProps);
    }
  }

  updateTreeMenu(prevProps) {
    if (prevProps.treeMenu !== this.props.treeMenu) {
      this.setState({ treeMenu: this.props.treeMenu.slice() });
    }

    const categoriesId =
      this.state.activeCategory || (this.props.match && this.props.match.params.categoriesId) || this.props.activeNode;
    if (!!categoriesId && this.props.loadedCategories) {
      const cats = getCategoriesChildren(categoriesId, this.props.categoriesById);
      let treeMenu = JSON.parse(JSON.stringify(this.props.treeMenu));
      cats.map((cat) => {
        const treeSlice = {
          id: 0,
          name: "root",
          children: treeMenu.slice(),
        };
        const cont = [];
        nodeSearch(treeSlice, cat.id, cont);
        let searchedNode;
        cont.length > 0 ? (searchedNode = cont[0]) : (searchedNode = {});
        if (searchedNode.depth !== 3) {
          searchedNode.toggled = true;
          searchedNode.active = !searchedNode.active;
        }
        if (searchedNode.depth === 3) {
          searchedNode.active = !searchedNode.active;
        }
        treeMenu = treeSlice.children.slice();
      });

      this.setState({ activeCategory: null, treeMenu });
    }
  }

  onToggle(node, toggled) {
    const treeSlice = {
      id: 0,
      name: "root",
      children: this.state.treeMenu.slice(),
    };
    const cont = [];
    nodeSearch(treeSlice, node.id, cont);
    let searchedNode;
    cont.length > 0 ? (searchedNode = cont[0]) : (searchedNode = {});
    if (searchedNode.depth !== 3) {
      searchedNode.toggled = toggled;
      searchedNode.active = !searchedNode.active;
    }
    this.setState(
      (prev) => ({
        ...prev,
        treeMenu: treeSlice.children.slice(),
        treeMenuIsOpen: searchedNode.depth === 3 ? false : prev.treeMenuIsOpen,
      }),
      () => {
        if (searchedNode.depth === 3) {
          this.props.categoriesClickThunk(searchedNode.id);
        } else if (searchedNode.slug === "search") {
          const previousElement = treeSlice.children[treeSlice.children.length - 2];
          const previousSecondLevelElement =
            previousElement.children.length > 0 && previousElement.children[previousElement.children.length - 1];
          const previousThirdLevelElement =
            previousSecondLevelElement.children.length > 0 &&
            previousSecondLevelElement.children[previousSecondLevelElement.children.length - 1];
          previousThirdLevelElement && this.props.categoriesClickThunk(previousThirdLevelElement.id);
        }
      },
    );
  }

  onToggleTreeMenu() {
    this.setState((prev) => {
      return { ...prev, treeMenuIsOpen: !prev.treeMenuIsOpen };
    });
  }

  onCloseTreeMenu() {
    if (this.state.treeMenuIsOpen) {
      this.setState((prev) => {
        return { ...prev, treeMenuIsOpen: false };
      });
    }
  }

  onToggleMenuPosition() {
    localStorage.setItem("sidebarMenuRightPosition", !this.state.menuRightPosition);
    this.setState((prev) => {
      return { ...prev, menuRightPosition: !prev.menuRightPosition };
    });
    this.props.onToggleNode();
  }

  inputOnchangeHandle(event, _data) {
    this.setState({
      treeMenu: filterTree(
        {
          name: "root",
          children: this.props.treeMenu.slice(),
        },
        _data.value,
      ).children,
      value: _data.value,
      search: _data.value,
    });
  }

  searchClearHandle(event) {
    this.setState((prev) => {
      return {
        ...prev,
        value: "",
        search: null,
        treeMenu: cleanToggled(this.props.treeMenu),
      };
    });
  }

  render() {
    const thumbStyle = {
      width: "320px",
    };
    const menuContainer = {
      transform: "translateX(2em)",
      position: "sticky",
      height: "100vh",
      top: 0,
      left: 0,
      zIndex: 100,
      marginTop: this.state.isFixed ? "50px" : "inherit",
      boxShadow: "0 5px 30px 0 rgba(0,0,0,0.1)",
      background: "#fff",
    };
    const filtersSection = {
      position: "absolute",
      top: showCategories ? 145 : 65,
      bottom: 0,
      left: 0,
      right: 0,
      overflowY: "scroll",
    };

    return (
      <TreeMenuBlock
        className={`${this.state.menuRightPosition ? "right" : ""} ${this.props.isHideFilters ? "hideFilters" : ""}`}
        style={{ zIndex: 1 }}
      >
        <div id="tree-menu-thumb" style={thumbStyle} />
        <TreeMenuBody style={menuContainer} classname={this.state.menuRightPosition ? "right" : ""}>
          <ToggleFiltersButton
            style={styles.hideMenuButton}
            onClick={this.props.onHideToggle}
            className={`${this.state.menuRightPosition ? "right" : ""} ${
              this.props.isHideFilters ? "hideFilters" : ""
            }`}
          >
            <HideMenuButtonText className={this.state.menuRightPosition ? "right" : ""}>
              {this.props.t("common.filters")}
            </HideMenuButtonText>
            <ArrowForwardIcon />
          </ToggleFiltersButton>
          <ClickOutsideListener onClickOutside={this.onCloseTreeMenu}>
            <div style={styles.menuHeader}>
              <LeftMenuIconList icon={ic_list} />
              {this.props.t("common.filters")}
              <Hidden mdDown>
                <TreeMenuPositionBtn
                  onClick={this.onToggleMenuPosition}
                  className={this.state.menuRightPosition ? "right" : ""}
                />
              </Hidden>
            </div>
            {showCategories && (
              <div style={styles.sidebarSection}>
                <TreeMenuWrapper
                  data={this.state.treeMenu}
                  onToggle={this.onToggle}
                  onToggleTreeMenu={this.onToggleTreeMenu}
                  styles={styles}
                  isOpen={this.state.treeMenuIsOpen}
                  rightPosition={this.state.menuRightPosition}
                  inputOnchangeHandle={this.inputOnchangeHandle}
                  searchClearHandle={this.searchClearHandle}
                  inputValue={this.state.value}
                  inputSearch={this.state.search}
                />
              </div>
            )}
            <div style={filtersSection}>
              <SidebarFilters rightPosition={this.state.menuRightPosition} />
            </div>
          </ClickOutsideListener>
        </TreeMenuBody>
      </TreeMenuBlock>
    );
  }
}

export default withTranslation()(SidebarMenu);
