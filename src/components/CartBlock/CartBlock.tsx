import React, { useEffect, useState } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import clsx from "clsx";
import list_icon from "@src/images/Icons/list.svg";
// import { shopping_cart } from "react-icons-kit/ikons/shopping_cart";
// import { removeCartItem } from "@src/store/cart/cartActions";
import useAppTheme from "@src/theme/useAppTheme";
import { Link } from "react-router-dom";
import useAppSelector from "@src/hooks/useAppSelector";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// import { withBaseIcon } from "react-icons-kit";
// import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Paper, Box, Fade } from "@material-ui/core";
import { getImage } from "@src/utils/product";
import placeholderImg from "@src/images/cpu.png";
// import IconButton from "@material-ui/core/IconButton";
import { deleteProductCartBlock } from "@src/store/common/commonActions";
import { useStyles } from "./cartBlockStyles";

const CartBlock: React.FC = () => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  // const Icon = withBaseIcon();

  const cart = useAppSelector((state) => state.cart);
  const addedProduct = useAppSelector((state) => state.common.addedProduct);

  const [open, setOpen] = useState(false);
  const [item, setItem] = React.useState(null);
  const [mainImage, setMainImg] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (addedProduct) {
      setMainImg(getImage(addedProduct.product));
      setItem(addedProduct);
      setOpen(true);
      if (timeoutId) clearTimeout(timeoutId);
      setTimeoutId(
        setTimeout(() => {
          setOpen(false);
          dispatch(deleteProductCartBlock());
        }, 3000),
      );
    }
  }, [addedProduct]);

  // const removeProduct = () => {
  //   dispatch(removeCartItem(cart?.info?.id, addedProduct?.lineId));
  //   setOpen(false);
  //   dispatch(deleteProductCartBlock());
  // };

  const onMouseEnter = () => {
    clearTimeout(timeoutId);
  };

  const onMouseLeave = () => {
    setTimeoutId(
      setTimeout(() => {
        setOpen(false);
        dispatch(deleteProductCartBlock());
      }, 600),
    );
  };

  return (
    <Box display="flex" alignItems="center" style={{ position: "relative" }}>
      <Link to="/cart" className={classes.cartBlock}>
        <div className={classes.cartImageCont}>
          {/* {!constants.isNewSearchPage && <Icon size={35} icon={shopping_cart} />} */}
          <img className={classes.listIcon} src={list_icon} alt="rfq list" />

          {cart.count > 0 && (
            <div className={clsx(classes.cartCount, appTheme.topBarCartCount, "cart-count")}>{cart.count}</div>
          )}
        </div>
      </Link>

      <Fade in={open}>
        <div className={classes.collapse}>
          <Paper elevation={10} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={classes.paper}>
            <Box display="flex">
              <div className={classes.imageColumn}>
                <img
                  alt="product logo"
                  className={classes.image}
                  src={mainImage}
                  onError={() => setMainImg(placeholderImg)}
                />
              </div>
              <div className={classes.titleColumn}>
                <div className={classes.title}>{item?.product?.upc}</div>
                <div className={clsx(classes.manufacturer, "added-to-cart-alert")}>
                  {item?.product?.manufacturer?.name}
                </div>
                <div className={classes.description}>{item?.product?.description}</div>
              </div>
            </Box>
            <div className={classes.pcs}>{item?.quantity} pcs.</div>
            {/* <div> */}
            {/*  <IconButton onClick={removeProduct} size="small" aria-label="delete" color="inherit"> */}
            {/*    <DeleteOutlineIcon fontSize="default" /> */}
            {/*  </IconButton> */}
            {/* </div> */}
          </Paper>
        </div>
      </Fade>
    </Box>
  );
};

export default CartBlock;
