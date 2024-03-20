import React from "react";
import { Blanket, Menu } from "./components";

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.setIsOpen(false);
    }
  }

  render() {
    const { children, isOpen, target, onClose, style } = this.props;
    return (
      <div ref={this.setWrapperRef} style={{ position: "relative" }}>
        {target}
        {isOpen ? <Menu style={style || {}}>{children}</Menu> : null}
        {isOpen ? <Blanket onClick={onClose} /> : null}
      </div>
    );
  }
}
