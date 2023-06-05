import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useStyles } from "./styles";

interface Props {
  disable: boolean;
  action: any;
  hasResponse: boolean;
}

const HasResponseChoice: React.FC<Props> = ({ disable, action, hasResponse }) => {
  const classes = useStyles();

  const checked = React.useMemo(() => !hasResponse, [hasResponse]);

  const onChangeHandler = () => {
    action(!hasResponse);
  };

  return (
    <FormControlLabel
      className={classes.filterStockBar}
      disabled={disable}
      control={
        <Checkbox
          className={classes.checkbox}
          checked={checked}
          onChange={onChangeHandler}
          name="has_response"
          disabled={disable}
        />
      }
      label={"Hide my responses"}
    />
  );
};

export default HasResponseChoice;
