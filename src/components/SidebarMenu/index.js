import React from "react";
import SidebarMenu from "./SidebarMenu";

const SidebarMenuBlock = (props) => {
  return (
    <SidebarMenu
      treeMenu={props.treeMenu}
      activeNode={props.activeNode}
      toggled={props.toggled}
      onToggleNode={props.onToggleNode}
      onHideToggle={props.onHideToggle}
      isHideFilters={props.isHideFilters}
    />
  );
};

export default SidebarMenuBlock;
