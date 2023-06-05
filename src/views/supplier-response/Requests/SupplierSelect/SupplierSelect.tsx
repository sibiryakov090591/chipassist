import React from "react";
import useAppTheme from "@src/theme/useAppTheme";
import MenuItem from "@material-ui/core/MenuItem";
import { Partner } from "@src/store/profile/profileTypes";
import TextField from "@material-ui/core/TextField";
import { useStyles } from "../supplierResponseStyles";

interface Props {
  selectedPartner: Partner;
  partners: Partner[];
  onChangePartner: (id: number) => void;
}

const SupplierSelect: React.FC<Props> = ({ onChangePartner, selectedPartner, partners }) => {
  const classes = useStyles();
  const appTheme = useAppTheme();

  const onChangeHandler = (e: React.ChangeEvent<any>) => {
    onChangePartner(e.target.value);
  };

  return (
    <TextField
      className={classes.partnerSelect}
      variant="outlined"
      size="small"
      value={selectedPartner.id}
      onChange={onChangeHandler}
      select
    >
      {partners.map((p) => {
        return (
          <MenuItem
            key={p.id}
            className={appTheme.selectMenuItem}
            value={p.id}
            selected={selectedPartner.id === p.id}
            onClick={onChangeHandler}
          >
            {p.name}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SupplierSelect;
