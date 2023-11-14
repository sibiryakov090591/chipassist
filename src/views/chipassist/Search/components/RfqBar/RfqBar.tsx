import React, { useState } from "react";
import { Button, InputAdornment, TextField, Paper } from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import { NumberInput } from "@src/components/Inputs";
import { clsx } from "clsx";
import useAppTheme from "@src/theme/useAppTheme";
import { rfqModalOpen } from "@src/store/rfq/rfqActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { europeanCountries } from "@src/constants/countries";
import { useStyles } from "./styles";

const allowedCountries = [
  ...europeanCountries,
  "USA", // the United States
  "CAN", // Canada
  "AUS", // Australia
];

const RfqBar: React.FC = () => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();

  const query = useAppSelector((state) => state.search.query);
  const currency = useAppSelector((state) => state.currency.selected);
  const geolocation = useAppSelector((state) => state.profile.geolocation);

  const defaultState = {
    part_number: query || "",
    quantity: "",
    price: "",
  };
  const hiddenBar = geolocation?.country_code_iso3 ? !allowedCountries.includes(geolocation.country_code_iso3) : true;

  const [formState, setFormState] = useState(defaultState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    return setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { part_number, quantity, price } = formState;
    dispatch(rfqModalOpen(part_number, quantity, null, price, null, null, "rfq", null));
    setFormState(defaultState);
  };

  if (hiddenBar) return null;
  return (
    <Paper elevation={3} className={classes.root}>
      <div className={classes.title}>
        Want to see more offers? Place your RFQ and sellers will respond to your request in 48 hours.
      </div>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          fullWidth
          name="part_number"
          variant="outlined"
          size="small"
          value={formState.part_number || ""}
          onChange={handleChange}
          placeholder="Part number"
        />
        <NumberInput
          style={{ width: "100%" }}
          name="quantity"
          variant="outlined"
          size="small"
          value={formState.quantity}
          onChange={handleChange}
          decimalScale={0}
          isAllowedZero={true}
          placeholder="Quantity"
        />
        <NumberInput
          style={{ width: "100%" }}
          name="price"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="end">{currency?.symbol || <span>&#8364;</span>}</InputAdornment>,
          }}
          value={formState.price}
          onChange={handleChange}
          decimalScale={4}
          isAllowedZero={true}
          placeholder={`Target price (${currency?.code || "EUR"})`}
        />
        <Button variant="contained" className={clsx(appTheme.buttonPrimary, classes.button)} type="submit">
          SEND RFQ
        </Button>
      </form>
    </Paper>
  );
};

export default RfqBar;
