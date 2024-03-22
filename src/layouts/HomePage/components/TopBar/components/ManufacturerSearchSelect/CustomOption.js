import React from "react";
import PropTypes from "prop-types";
import { components } from "react-select";

const CustomOption = ({ children, ...props }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...props, innerProps: rest };
  return <components.Option {...newProps}>{children}</components.Option>;
};

CustomOption.propTypes = {
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomOption;
