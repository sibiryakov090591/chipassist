import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Hidden, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useAppTheme from "@src/theme/useAppTheme";
import { formatMoney } from "@src/utils/formatters";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useCurrency from "@src/hooks/useCurrency";
import { Product, Stockrecord } from "@src/store/products/productTypes";
import { getDefaultQty, getDynamicMoq, getPrice, getQtyPrice, isProductAvailable } from "@src/utils/product";
import { BackendCartItem } from "@src/store/cart/cartTypes";
import Price from "@src/components/Price/Price";
import { NumberInput } from "@src/components/Inputs";
import clsx from "clsx";
import { addCartItem } from "@src/store/cart/cartActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { AddToBomButton } from "@src/components";
import StatusChip from "@src/components/StatusChip/StatusChip";
import constants from "@src/constants/constants";
import { ID_ELFARO, ID_ICSEARCH } from "@src/constants/server_constants";
import { useNavigate } from "react-router-dom";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { useStyles } from "./distributorsMobileStyles";

interface Props {
  product: Product;
  sortedStockrecords: Stockrecord[];
  cartItems: BackendCartItem[];
  searchQuery: string;
  countRowsInTable: number;
  handleSelectStockrecord: (stockrecord: Stockrecord) => () => void;
  isActiveTable: (productId: number) => boolean;
  addToBomButton: React.FC;
  addToCartButton: React.FC;
  isAuthenticated: boolean;
  isCartEnabled: boolean;
  quantityMap: { [key: number]: number };
  handleChangeQty: (stockrecord: Stockrecord) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DistributorsMobile: React.FC<Props> = ({
  product,
  sortedStockrecords,
  cartItems,
  countRowsInTable,
  handleSelectStockrecord,
  isActiveTable,
  isAuthenticated,
  isCartEnabled,
  quantityMap,
  handleChangeQty,
}) => {
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const { t } = useI18n("product");
  const { currency, currencyPrice } = useCurrency();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (id: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? id : false);
    handleSelectStockrecord(product.stockrecords.find((v) => v.id === id))();
  };

  const handleAddToCart = (stockrecord: Stockrecord, inCart: boolean) => {
    if (inCart) return navigate("/cart");
    return dispatch(addCartItem(product, stockrecord, quantityMap[stockrecord.id]));
  };

  const datacodeAttribute = product.attributes.find((v) => v.code === "datecode" || v.name === "Date Code");
  const showDistributor = constants.id !== ID_ICSEARCH && constants.id !== ID_ELFARO;
  const showDC = constants.id === ID_ELFARO;

  return (
    <React.Fragment>
      {sortedStockrecords &&
        sortedStockrecords.map((val, index) => {
          const countShowedRows = isActiveTable(product.id) ? sortedStockrecords.length : countRowsInTable;
          const inCart = cartItems.some((v) => v.stockrecord?.id === val.id);
          const { num_in_stock } = val;
          const isAvaible = isProductAvailable(val);

          const dynamicMoq = getDynamicMoq(val);
          const defaultQty = isAvaible ? getDefaultQty(dynamicMoq, num_in_stock) : dynamicMoq;

          const qty = quantityMap[val.id] || (defaultQty as number);
          const cost = Number(formatMoney(currencyPrice(getPrice(qty, val), val.price_currency))) * qty;

          const qtyPrice = getQtyPrice(1, val);
          // console.log(qtyPrice);

          if (index < countShowedRows) {
            return (
              <div className={classes.stockrecord} key={val.id}>
                <ul className={classes.tableAreas}>
                  <li>
                    <span>{t("distributor.status")}</span>
                    {isProductAvailable(val) ? <StatusChip isRfq={false} /> : <StatusChip isRfq={true} />}
                  </li>
                  <li>
                    <span>{t("distributor.price")}</span>
                    <span>
                      {(getPrice(1, val, false) &&
                        `${formatMoney(currencyPrice(getPrice(1, val, false), val.price_currency))} ${
                          currency?.code
                        }`) ||
                        (qtyPrice.price?.price &&
                          ` ${formatMoney(currencyPrice(qtyPrice.price.price, val.price_currency))} ${
                            currency?.code
                          } x ${qtyPrice.amount}`) ||
                        t("distributor.price_by_request")}
                    </span>
                  </li>
                  {showDistributor && (
                    <li>
                      <span>{t("distributor.distributor")}</span>
                      <span>{val.partner_name}</span>
                    </li>
                  )}
                  {showDC && (
                    <li>
                      <span>DC</span>
                      <span>
                        {datacodeAttribute?.value && typeof datacodeAttribute.value === "string" ? (
                          datacodeAttribute.value.length > 10 ? (
                            <Tooltip
                              enterTouchDelay={1}
                              classes={{ tooltip: commonClasses.tooltip }}
                              title={<div>{datacodeAttribute.value}</div>}
                            >
                              <span>{`${datacodeAttribute.value.slice(0, 10)}...`}</span>
                            </Tooltip>
                          ) : (
                            datacodeAttribute.value
                          )
                        ) : (
                          "-"
                        )}
                      </span>
                    </li>
                  )}
                  <li>
                    <span>{t("distributor.in_stock")}</span>
                    <span>{formatMoney(val.num_in_stock, 0, ".", "`") || 0}</span>
                  </li>
                  <li>
                    <span>{t("distributor.lead_period")}</span>
                    <span>
                      {val.lead_period_str
                        ? val.lead_period_str
                        : val.lead_period
                        ? `${val.lead_period}${t("common.d")}`
                        : "-"}
                    </span>
                  </li>
                  <li>
                    <span>{t("distributor.moq")}</span>
                    <span>{formatMoney(dynamicMoq, 0, ".", "`")}</span>
                  </li>
                </ul>
                <div>
                  <div className={classes.dataColumns}>
                    <span>{t("distributor.qty")}:</span>
                    <span style={{ textAlign: "right" }}>
                      <NumberInput
                        className={classes.trQty}
                        // style={{ width: 120 }}
                        // label={t("qty_default")}
                        variant="outlined"
                        size="small"
                        required
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={quantityMap[val.id]}
                        defaultValue={defaultQty}
                        onChange={handleChangeQty(val)}
                        decimalScale={0}
                        isAllowedZero={false}
                      />
                    </span>
                  </div>

                  {!!sortedStockrecords.length && (
                    <div className={classes.dataColumns}>
                      <span>{t("bom.edit.cost")}:</span>
                      <span style={{ textAlign: "right" }}>
                        <strong>
                          {formatMoney(cost || "0.00")} {currency?.symbol}
                        </strong>
                      </span>
                    </div>
                  )}
                  <div className={classes.buttons}>
                    {isCartEnabled && (
                      <div>
                        <Button
                          variant="contained"
                          onClick={() => handleAddToCart(val, inCart)}
                          style={{ fontWeight: "bold" }}
                          className={clsx(appTheme.buttonPrimary)}
                        >
                          {inCart ? t("cart.in_cart") : t("cart.add_cart")}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <Accordion
                  expanded={expanded === val.id}
                  onChange={handleChange(val.id)}
                  classes={{ root: classes.accordionRoot, expanded: classes.accordionExpanded }}
                  key={val.id}
                  elevation={0}
                >
                  <AccordionSummary
                    classes={{ content: classes.AccordionSummaryContent }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                  >
                    <Typography className={clsx(classes.accordionTitle, appTheme.hyperlink)}>
                      <b>{t("common.prices")}</b>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails className={classes.accordionDetails}>
                    <div>
                      <table className={classes.table}>
                        <tbody>
                          <tr>
                            <td>{formatMoney(1, 0, ".", "`")}</td>
                            <td>{currency?.code}</td>
                            <td>
                              <Price>
                                {dynamicMoq <= 1
                                  ? getPrice(1, val, false) &&
                                    formatMoney(currencyPrice(getPrice(1, val, false), val.price_currency))
                                  : "-"}
                              </Price>
                            </td>
                          </tr>
                          <tr>
                            <td>{formatMoney(10, 0, ".", "`")}</td>
                            <td>{currency?.code}</td>
                            <td>
                              <Price>
                                {dynamicMoq <= 10
                                  ? getPrice(10, val, false) &&
                                    formatMoney(currencyPrice(getPrice(10, val, false), val.price_currency))
                                  : "-"}
                              </Price>
                            </td>
                          </tr>
                          <tr>
                            <td>{formatMoney(100, 0, ".", "`")}</td>
                            <td>{currency?.code}</td>
                            <td>
                              <Price>
                                {dynamicMoq <= 100
                                  ? getPrice(100, val, false) &&
                                    formatMoney(currencyPrice(getPrice(100, val, false), val.price_currency))
                                  : "-"}
                              </Price>
                            </td>
                          </tr>
                          <tr>
                            <td>{formatMoney(1000, 0, ".", "`")}</td>
                            <td>{currency?.code}</td>
                            <td>
                              <Price>
                                {dynamicMoq <= 1000
                                  ? getPrice(1000, val, false) &&
                                    formatMoney(currencyPrice(getPrice(1000, val, false), val.price_currency))
                                  : "-"}
                              </Price>
                            </td>
                          </tr>
                          <tr>
                            <td>{formatMoney(10000, 0, ".", "`")}</td>
                            <td>{currency?.code}</td>
                            <td>
                              <Price>
                                {dynamicMoq <= 10000
                                  ? getPrice(10000, val, false) &&
                                    formatMoney(currencyPrice(getPrice(10000, val, false), val.price_currency))
                                  : "-"}
                              </Price>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <br />
                      <br />
                      <div>
                        <div className={classes.buttons}>
                          <Hidden xsDown>
                            {isAuthenticated && constants.id !== ID_ELFARO && (
                              <div>
                                <AddToBomButton
                                  onOpen={() => true}
                                  product={product}
                                  stockrecords={[val]}
                                  quantityMap={quantityMap}
                                  completeHandler={() => true}
                                  renderButton={(prps: any) => (
                                    <Button
                                      variant="contained"
                                      color={"secondary"}
                                      className={clsx(appTheme.buttonCreate)}
                                      {...prps}
                                    >
                                      <AddIcon className={classes.addToBomIcon} />
                                      <div>{t("bom.add_bom")}</div>
                                    </Button>
                                  )}
                                />
                              </div>
                            )}
                          </Hidden>
                        </div>
                      </div>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          }
          return true;
        })}
    </React.Fragment>
  );
};

export default DistributorsMobile;
