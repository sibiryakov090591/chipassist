import React from "react";
import styled from "styled-components";
import { addApiUrl } from "@src/utils/transformUrl";

const Image = styled.div`
  width: "37px";
  height: "37px";
`;

const img = require("../search-small.png");

const Header = ({ onSelect, style, customStyles, node }) => {
  return (
    <div className="item_header" style={style.base} onClick={onSelect}>
      <div style={node.selected ? { ...style.title, ...customStyles.header.title } : style.title}>
        {node.parentId === -1 && (
          <Image>
            <img alt="image" style={style.image} src={node && node.slug === "search" ? img : addApiUrl(node.image)} />
          </Image>
        )}
        <div style={node.active ? { ...style.textBlock, fontWeight: "bold" } : style.textBlock}>{node.name}</div>
      </div>
    </div>
  );
};

export default Header;
