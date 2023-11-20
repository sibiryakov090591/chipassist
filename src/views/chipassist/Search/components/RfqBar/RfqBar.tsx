import React, { useState, useEffect } from "react";
import { Button, InputAdornment, TextField, Paper } from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import { NumberInput } from "@src/components/Inputs";
import { clsx } from "clsx";
import useAppTheme from "@src/theme/useAppTheme";
import { rfqModalOpen } from "@src/store/rfq/rfqActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import formSchema from "@src/utils/formSchema";
import validate from "validate.js";
import { useStyles } from "./styles";

interface FormStateValues {
  part_number: string;
  quantity: string;
  price: any;
}

interface FormStateErrors {
  part_number?: string[];
  quantity?: string[];
  price?: string[];
  [key: string]: string[];
}

interface FormState {
  values: FormStateValues;
  errors: FormStateErrors;
}

const RfqBar: React.FC = () => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();

  const query = useAppSelector((state) => state.search.query);
  const currency = useAppSelector((state) => state.currency.selected);
  const products = useAppSelector((state) => state.products.products);

  const defaultState = {
    values: {
      part_number: query || "",
      quantity: "",
      price: "",
    },
    errors: {},
  };

  const schema = React.useMemo(() => {
    return {
      part_number: formSchema.partNumber,
    };
  }, []);

  const [formState, setFormState] = useState<FormState>(defaultState);

  useEffect(() => {
    setFormState(defaultState);
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    const errors = { ...formState.errors };
    if (errors[name]) delete errors[name];

    return setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: name === "part_number" ? value?.toUpperCase() : value,
      },
      errors,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate(formState.values, schema);
    if (errors) {
      return setFormState((prevState) => ({
        ...prevState,
        isValid: !errors,
        errors: errors || {},
      }));
    }

    const { part_number, quantity, price } = formState.values;
    const isProductExists = products?.some((i) => i.upc?.toUpperCase() === part_number);
    dispatch(rfqModalOpen(part_number, quantity, null, price, null, null, "rfq", isProductExists ? 1 : null)); // productId required for creating RFQ from RFQForm instead missing product feedback
    return setFormState(defaultState);
  };

  return (
    <Paper elevation={3} className={classes.root}>
      <div className={classes.title}>
        Want to see more offers? Place your RFQ and sellers will respond to your request in 48 hours.
      </div>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          className={classes.input}
          fullWidth
          name="part_number"
          variant="outlined"
          size="small"
          value={formState.values.part_number || ""}
          onChange={handleChange}
          placeholder="Part number"
          error={!!formState.errors.part_number}
          helperText={!!formState.errors.part_number && formState.errors.part_number[0]}
        />
        <NumberInput
          style={{ width: "100%" }}
          name="quantity"
          variant="outlined"
          size="small"
          value={formState.values.quantity}
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
          value={formState.values.price}
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
