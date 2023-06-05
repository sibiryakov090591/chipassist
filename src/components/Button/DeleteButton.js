import React from "react";
import { Button } from "@material-ui/core";

const DeleteButton = (props) => {
  const { children, className, ...rest } = props;

  return (
    <Button className={`${className}`} {...rest}>
      {children}
    </Button>
  );
};

export default DeleteButton;
