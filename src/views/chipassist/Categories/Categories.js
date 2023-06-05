import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import clsx from "clsx";
import styled from "styled-components";
import constants from "@src/constants/constants";
import { loadBomListThunk } from "@src/store/bom/bomActions";
import { Page } from "@src/components";
import SidebarMenuBlock from "@src/components/SidebarMenu";
import CentralColumn from "./components/CentralColumn";

const Main = styled.div`
  height: 100%;
`;

const StyledContainer = styled.div`
  &.right {
    grid-template-areas: "cont cont fil";
    &.hideFilters {
      padding-left: 0;
      padding-right: 2em;
    }
  }
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 320px 1fr 320px;
  grid-template-areas: "fil cont cont";
  position: relative;
  &.hideFilters {
    padding-left: 2em;
    grid-template-areas: "cont cont cont";
  }
`;

@connect(
  createSelector(
    [
      (state) => state.categories.categoriesMap,
      (state) => state.categories.categoriesById,
      (state) => state.treeMenu.treeMenu,
    ],
    (categoriesMap, categoriesById, treeMenu) => {
      return { categoriesMap, categoriesById, treeMenu };
    },
  ),
  { loadBomListThunk },
)
class CategoriesView extends React.Component {
  constructor(props) {
    super(props);
    this.onToggleHandle = this.onToggleHandle.bind(this);
    this.onHideToggle = this.onHideToggle.bind(this);

    this.state = {
      context: null,
      activeNode: null,
      toggled: null,
      hideSideBar: false,
      isRightSidebar: false,
    };
  }

  onToggleHandle(node, toggled) {
    if (node && toggled) {
      this.setState((prevState) => ({ ...prevState, activeNode: node.id, toggled }));
    }
    this.setState((prevState) => ({ ...prevState, isRightSidebar: !this.state.isRightSidebar }));
  }

  onHideToggle() {
    localStorage.setItem("sidebarMenuHide", `${!this.state.hideSideBar}`);
    this.setState({ hideSideBar: !this.state.hideSideBar });
  }

  componentDidMount() {
    // this.props.loadPopularProductsThunk(0, 12);
    // this.props.loadProductBrandsThunk();
    // this.props.loadCategoriesThunk();
    // this.props.createTreeMenuThunk();
    this.props.loadBomListThunk(1, true);

    const menuPosition = localStorage.getItem("sidebarMenuRightPosition") === "true";
    const hideMenu = localStorage.getItem("sidebarMenuHide") === "true";
    this.setState((prevState) => ({ ...prevState, isRightSidebar: menuPosition, hideSideBar: hideMenu }));
  }

  render() {
    return (
      <Page title="Главная страница" description="Описание главной страницы">
        <Main>
          <StyledContainer
            className={clsx({
              right: this.state.isRightSidebar,
              hideFilters: this.state.hideSideBar || !constants.SHOW_FILTERS,
              removeFilters: !constants.SHOW_FILTERS,
            })}
          >
            {constants.SHOW_FILTERS && (
              <SidebarMenuBlock
                treeMenu={this.props.treeMenu}
                activeNode={this.state.activeNode}
                toggled={this.state.toggled}
                onToggleNode={this.onToggleHandle}
                onHideToggle={this.onHideToggle}
                isHideFilters={this.state.hideSideBar}
              />
            )}
            <CentralColumn />
          </StyledContainer>
        </Main>
      </Page>
    );
  }
}

export default CategoriesView;
