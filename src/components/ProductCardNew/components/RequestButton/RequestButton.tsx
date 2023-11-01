import React from "react";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import CustomPopper from "@src/components/CustomPopper/CustomPopper";
import useAppSelector from "@src/hooks/useAppSelector";
import { Product } from "@src/store/products/productTypes";
import { rfqModalOpen } from "@src/store/rfq/rfqActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppTheme from "@src/theme/useAppTheme";
import { DisableProductRequestHint } from "@src/store/products/productsActions";

interface Props {
  requestedQty?: number;
  product: Product;
  classes: any;
}

const RequestButton: React.FC<Props> = ({ requestedQty, product, classes }) => {
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  const sendRfqOpenModal = () => {
    dispatch(DisableProductRequestHint());
    dispatch(rfqModalOpen(product.upc, 1, null, null, null, product, "rfq", product.id));
  };

  return (
    <div className={classes.requestButtonWrapper}>
      <Button
        aria-describedby={"popper"}
        variant="contained"
        className={clsx("tutorial-create-rfq", appTheme.buttonCreate, classes.requestButton)}
        onClick={sendRfqOpenModal}
      >
        {requestedQty ? "Requested" : "Get more quotes"}
      </Button>
      <CustomPopper productId={product.id} />

      {!!requestedQty && isAuthenticated ? (
        <div className={classes.requestButtonHelpText}>
          {`You have already requested`} <strong>{`${requestedQty}pcs`} </strong> {`of this product`}
        </div>
      ) : (
        <div className={classes.requestButtonHelpText}>Get additional quotes from connected sellers</div>
      )}
    </div>
  );
};

export default RequestButton;
