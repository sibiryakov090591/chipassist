import React from "react";

export const Menu = (props) => {
  const shadow = "hsla(218, 50%, 10%, 0.1)";
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 4,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        position: "absolute",
        zIndex: 2,
      }}
      {...props}
    />
  );
};
export const Blanket = (props) => (
  <div
    style={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: "fixed",
      zIndex: 1,
    }}
    {...props}
  />
);
