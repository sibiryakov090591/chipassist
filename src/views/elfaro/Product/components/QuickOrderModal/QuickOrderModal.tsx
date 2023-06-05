import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { Backdrop, TextField, Grid, Button, CircularProgress, Box } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppTheme from "@src/theme/useAppTheme";
import { showQuickOrderConfirmModal } from "@src/store/alerts/alertsActions";
import { ProductStateItem, Stockrecord } from "@src/store/products/productTypes";
import { getCostAndQuantity, getPrice, isProductAvailable, validateQuantity } from "@src/utils/product";
import { authSignup, defaultRegisterData } from "@src/store/authentication/authActions";
import useAppSelector from "@src/hooks/useAppSelector";
import validate from "validate.js";
import { formatMoney } from "@src/utils/formatters";
import { getTotalPrices } from "@src/utils/cart";
import { useStyles as useCartStyles } from "@src/views/chipassist/Cart/components/CartItems/cartItemsStyles";
import useCurrency from "@src/hooks/useCurrency";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { CurrenciesAllowed } from "@src/store/currency/currencyTypes";
import { useStyles } from "./styles";

interface Props {
  product: ProductStateItem;
  stockrecord: Stockrecord;
  qty: number | string;
  handleClose: () => void;
}

export interface QuickOrder {
  quantity: string | number;
  product: number;
  stockrecord: number;
  price: number;
  cost: number;
  currency: CurrenciesAllowed;
  rfq: 0 | 1;
  basket: number;
  attributes: any;
  email: string;
}

const saveOrderLocalStorage = (item: QuickOrder) => {
  const orderItems: QuickOrder[] = JSON.parse(localStorage.getItem("Quick_order")) || [];
  if (orderItems.some((v) => v.stockrecord === item.stockrecord && v.email === item.email)) return;
  orderItems.push(item);
  localStorage.setItem("Quick_order", JSON.stringify(orderItems));
};

const QuickOrderModal: React.FC<Props> = ({ product, stockrecord, qty, handleClose }) => {
  const classes = useStyles();
  const cartClasses = useCartStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const { t } = useI18n();
  const { currency, currencyPrice } = useCurrency();

  const geolocation = useAppSelector((state) => state.profile.geolocation);
  const serviceTax = useAppSelector((state) => state.checkout.serviceTax);

  const [item, setItem] = useState(() => ({
    firstName: "",
    lastName: "",
    email: "",
    website: "",
    quantity: qty || "",
    comment: "",
    product_id: product.id,
    stockrecord_id: stockrecord.id,
    price_id: null,
  }));
  const [errors, setErrors] = useState<any>({});
  const [qtyError, setQtyError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const schema = {
    firstName: {
      presence: { allowEmpty: false, message: `^First name is required` },
    },
    lastName: {
      presence: { allowEmpty: false, message: `^Last name is required` },
    },
    email: {
      presence: { allowEmpty: false, message: `^Email is required` },
    },
    quantity: {
      presence: { allowEmpty: false, message: `^Quantity is required` },
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    let { value } = e.currentTarget;

    if (errors[name]) {
      const newState = { ...errors };
      delete newState[name];
      setErrors(newState);
    }

    if (name === "quantity") {
      value = value.replace(/\D/g, "");
      if (+value > stockrecord.num_in_stock) value = stockrecord.num_in_stock.toString();
      setQtyError(validateQuantity(+value, stockrecord));
    }
    return setItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validation
    const formErrors = validate(item, schema);
    if (qtyError) return false;
    if (formErrors) return setErrors(formErrors);

    saveOrderLocalStorage({
      product: item.product_id,
      stockrecord: item.stockrecord_id,
      price: getCostAndQuantity(item.quantity as number, stockrecord)?.price?.id || null,
      cost: getCostAndQuantity(item.quantity as number, stockrecord)?.price?.price * +item.quantity || 0,
      currency: currency.code,
      quantity: item.quantity,
      rfq: isProductAvailable(stockrecord) ? 0 : 1,
      attributes: null,
      basket: 0,
      email: item.email,
    });
    const registeredEmail = localStorage.getItem("registered_email");
    if (registeredEmail !== item.email) {
      setIsLoading(true);
      let registerData = { ...defaultRegisterData };
      registerData.email = item.email;
      registerData.first_name = item.firstName;
      registerData.last_name = item.lastName;
      registerData.country = geolocation.country_code_iso3;
      registerData.line1 = "-";
      registerData.line2 = item.website;
      registerData = Object.fromEntries(
        Object.entries(registerData)
          .map((i: any) => {
            if (typeof i[1] === "boolean" || i[1]) return i;
            return false;
          })
          .filter((i: any) => !!i),
      );

      dispatch(authSignup(registerData, { subj: "order" }))
        .then(() => {
          localStorage.setItem("registered_email", item.email);
          dispatch(showQuickOrderConfirmModal());
          handleClose();
        })
        .finally(() => setIsLoading(false));
    } else {
      dispatch(showQuickOrderConfirmModal());
      handleClose();
    }
    return false;
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={true}
      className={classes.modal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <div className={classes.paper}>
          <h2 className={classes.header}>You can order in one click!</h2>
          <form onSubmit={onSubmit} className={classes.form}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  name="firstName"
                  label="First name *"
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={item.firstName || ""}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={!!errors.firstName && errors.firstName[0]}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  label="Last name *"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={item.lastName || ""}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={!!errors.lastName && errors.lastName[0]}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Your Email *"
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={item.email || ""}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={!!errors.email && errors.email[0]}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="website"
                  label="Company`s website"
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={item.website || ""}
                  onChange={handleChange}
                  error={!!errors.website}
                  helperText={!!errors.website && errors.website[0]}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="quantity"
                  label="Quantity *"
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={item.quantity || ""}
                  onChange={handleChange}
                  error={!!errors.quantity || !!qtyError}
                  helperText={
                    (!!errors.quantity && errors.quantity[0]) ||
                    (!!qtyError && t(`${t(qtyError.i18message)} ${qtyError.amount}`))
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="partNumber"
                  label="Part number"
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={product.upc || ""}
                  disabled
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.total}>
                  {!!serviceTax && (
                    <div className={cartClasses.estTax}>
                      Service fee({serviceTax}%):{" "}
                      <strong>
                        {formatMoney(
                          getTotalPrices(
                            getPrice(+item.quantity, stockrecord) * +item.quantity,
                            serviceTax,
                            currencyPrice,
                          ).tax || 0,
                        )}{" "}
                        {currency.symbol}
                      </strong>
                    </div>
                  )}
                  <div className={cartClasses.estTotal}>
                    Estimated Total:{" "}
                    <strong>
                      {formatMoney(
                        getTotalPrices(
                          getPrice(+item.quantity, stockrecord) * +item.quantity,
                          serviceTax,
                          currencyPrice,
                        ).result || 0,
                      )}{" "}
                      {currency.symbol}
                    </strong>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Box className={classes.buttonContainer}>
                  <Button variant="contained" type="reset" className={appTheme.buttonPrimary} onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="contained" className={appTheme.buttonCreate} type="submit" disabled={isLoading}>
                    {isLoading && <CircularProgress style={{ marginRight: 10, color: "white" }} size="1.5em" />}
                    {isLoading ? "Sending" : "Order now"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default QuickOrderModal;
