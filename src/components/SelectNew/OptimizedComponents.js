/* eslint-disable max-classes-per-file */
import React from "react";
import { FixedSizeList } from "react-window";
import { components } from "react-select";

export class OptimizedMenuList extends React.Component {
  render() {
    const { children, maxHeight } = this.props;

    return (
      <FixedSizeList height={maxHeight} itemCount={children.length} itemSize={35} initialScrollOffset={0} width={""}>
        {({ index, style }) => (
          <div className="option-wrapper" style={style}>
            {children[index]}
          </div>
        )}
      </FixedSizeList>
    );
  }
}

export class OptimizedOption extends React.Component {
  render() {
    delete this.props.innerProps.onMouseMove;
    delete this.props.style;

    return (
      <components.Option {...this.props}>
        <span title={this.props.children}>{this.props.children}</span>
      </components.Option>
    );
  }
}
