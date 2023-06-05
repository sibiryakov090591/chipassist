import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { useStyles } from "./styles";

interface Props {
  onScrollHandler: () => void;
  active: boolean;
}

const ScrollToBottom: React.FC<Props> = ({ onScrollHandler, active }) => {
  const classes = useStyles();

  return <ExpandMoreIcon className={clsx(classes.root, { active })} onClick={onScrollHandler} />;
};

export default ScrollToBottom;
