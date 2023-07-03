import React from "react";
import useAppTheme from "@src/theme/useAppTheme";
import MenuItem from "@material-ui/core/MenuItem";
import { Partner } from "@src/store/profile/profileTypes";
import TextField from "@material-ui/core/TextField";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";
import { Hidden } from "@material-ui/core";
import { useStyles } from "../supplierResponseStyles";

interface Props {
  selectedPartner: Partner;
  partners: Partner[];
  onChangePartner: (id: number) => void;
}

const SupplierSelect: React.FC<Props> = ({ onChangePartner, selectedPartner, partners }) => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));

  const onChangeHandler = (e: React.ChangeEvent<any>) => {
    onChangePartner(e.target.value);
  };

  return (
    <div className={clsx(classes.supplier, { flexible: partners?.length > 1 })}>
      {!isXsDown && "You are logged in as "}
      {partners.length > 1 ? (
        <TextField
          className={classes.partnerSelect}
          variant="outlined"
          size="small"
          label={isXsDown && `Logged in as`}
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
      ) : (
        <Hidden xsDown>
          <strong>{selectedPartner.name}</strong>
        </Hidden>
      )}
      {!isXsDown && " supplier"}
    </div>
  );
};

export default SupplierSelect;
