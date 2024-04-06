import React, { useEffect, useState } from "react";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import useAppDispatch from "@src/hooks/useAppDispatch";
import clsx from "clsx";
// import list_icon from "@src/images/Icons/list-1.svg";
import { Button } from "@material-ui/core";
import { addCartItem } from "@src/store/cart/cartActions";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { NumberInput } from "@src/components/Inputs";
import useAppTheme from "@src/theme/useAppTheme";
import { Product } from "@src/store/products/productTypes";
import { addProductToCartBlock } from "@src/store/common/commonActions";
import { useNavigate } from "react-router-dom";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles } from "./addToCartStyles";

interface Props {
  product: any;
  sr: any;
  isSmDown: boolean;
  isXXSDown?: boolean;
  requestedQty?: number;
}

const AddToCartButton: React.FC<Props> = ({ requestedQty, product, sr, isSmDown, isXXSDown }) => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const anchorRef = React.useRef(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useI18n("product");

  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const cartItems = useAppSelector((state) => state.cart.items);

  const [hoverAddToList, setHoverAddToList] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  // const [inCartCount, setInCartCount] = useState(0);

  useEffect(() => {
    const cartItem = cartItems?.find((item) => item.stockrecord?.id === sr?.id);
    setInCart(!!cartItem);
    // setInCartCount(cartItem?.quantity || 0);
  }, [cartItems]);

  const handleAdd = () => {
    dispatch(addCartItem(product, sr, quantity, null, true)).then((res: Product) => {
      dispatch(addProductToCartBlock(product, quantity, res.id));
    });
    handleClose();
  };

  const handleChangeQty = (e: any) => {
    const qty = parseInt(e.target.value);
    setQuantity(qty);
  };

  const handleToggle = (e: any) => {
    e.stopPropagation();
    if (inCart) {
      return navigate("/cart");
    }
    return setOpen((prevOpen) => !prevOpen);
  };

  // TODO: Make a remove product and go to cart buttons into popup window instead just current navigate
  // const removeProduct = () => {
  //   dispatch(removeCartItem(cart?.info?.id, addedProduct?.lineId));
  //   setOpen(false);
  //   dispatch(deleteProductCartBlock());
  // };

  const handleClose = () => {
    setOpen(false);
    setQuantity(1);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <div>
        <Button
          variant="contained"
          ref={anchorRef}
          aria-haspopup="true"
          size="small"
          onClick={handleToggle}
          onMouseOver={() => setHoverAddToList(true)}
          onMouseOut={() => setHoverAddToList(false)}
          className={clsx(classes.addToCart, "add-to-cart-button", {
            [appTheme.buttonCreate]: !inCart,
            [classes.inCart]: inCart,
            [classes.inCartMobile]: inCart && isSmDown,
          })}
        >
          {inCart ? (
            hoverAddToList || isSmDown ? (
              isXXSDown ? (
                "Перейти в корзину"
              ) : (
                t("cart.in_list")
              )
            ) : (
              <span>В корзине</span>
            )
          ) : isXXSDown ? (
            "Добавить в корзину"
          ) : (
            t("cart.add_list")
          )}
        </Button>
        {!!requestedQty && isAuthenticated && (
          <div className={classes.requestButtonHelpText}>
            <span dangerouslySetInnerHTML={{ __html: `${t("already_req", { requestedQty })}` }}></span>
          </div>
        )}
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom"
        role={undefined}
        transition
        style={{ zIndex: 100 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper elevation={20} className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <div>
                  <div>
                    <NumberInput
                      className={classes.qty}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={quantity}
                      decimalScale={0}
                      onChange={handleChangeQty}
                      onFocus={(e: any) => e.target.select()}
                      size="small"
                    />
                  </div>

                  <Button
                    className={clsx(appTheme.buttonCreate, classes.addButton, "add-to-list-button")}
                    color="primary"
                    variant="contained"
                    onClick={handleAdd}
                    disabled={!quantity}
                  >
                    {t("common.add")}
                  </Button>
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default AddToCartButton;
