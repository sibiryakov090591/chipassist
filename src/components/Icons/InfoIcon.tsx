import React from "react";
import Info from "@material-ui/icons/Info";
import clsx from "clsx";
import { useStyles } from "./styles";

interface Props {
  className?: string;
}

const InfoIcon: React.FC<Props> = ({ className }) => {
  const classes = useStyles();

  return <Info className={clsx(classes.hintIcon, className)} />;
};

export default InfoIcon;
