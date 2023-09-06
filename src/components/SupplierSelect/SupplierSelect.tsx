import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";
import { Hidden } from "@material-ui/core";
import { onChangePartner } from "@src/store/profile/profileActions";
import { useDispatch } from "react-redux";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./styles";

interface Props {
  beforeChange?: any;
  hidden?: any;
  [key: string]: any;
}

const SupplierSelect: React.FC<Props> = ({ beforeChange, hidden, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch<any>();
  const theme = useTheme();
  const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));

  const partners = useAppSelector((state) => state.profile.profileInfo?.partners);
  const selectedPartner = useAppSelector((state) => state.profile.selectedPartner);

  const onChangeHandler = (e: React.ChangeEvent<any>) => {
    if (beforeChange) beforeChange();
    const id = e.target.value;
    const partner = partners?.find((p) => p.id === id);
    if (partner) {
      dispatch(onChangePartner(partner));
    }
  };

  if (!selectedPartner || (hidden && partners?.length < 2)) return null;
  return (
    <div className={clsx(classes.supplier, { flexible: partners?.length > 1 })} {...rest}>
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
              <MenuItem key={p.id} value={p.id} selected={selectedPartner.id === p.id} onClick={onChangeHandler}>
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
