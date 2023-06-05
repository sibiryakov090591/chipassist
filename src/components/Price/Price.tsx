import React, { PropsWithChildren } from "react";

const Price: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <span>{children || "-"}</span>;
};

export default Price;
