import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Tooltip,
  Button,
  Box,
  Collapse,
} from "@material-ui/core";
import useAppTheme from "@src/theme/useAppTheme";
import { formatMoney } from "@src/utils/formatters";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useCurrency from "@src/hooks/useCurrency";
import { Stockrecord } from "@src/store/products/productTypes";
import { getDynamicMoq, getPrice, getQtyPrice } from "@src/utils/product";
import Price from "@src/components/Price/Price";
import clsx from "clsx";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Seller } from "@src/store/sellers/sellersTypes";
import useAppSelector from "@src/hooks/useAppSelector";
import { sendFeedbackMessageThunk } from "@src/store/feedback/FeedbackActions";
import { useStyles } from "./distributorsMobileStyles";

interface Props {
  sortedStockrecords: Stockrecord[];
  sellerMessageOpenModal: (sellerId: number, sellerName: string) => () => void;
}

const DistributorsMobile: React.FC<Props> = ({ sortedStockrecords, sellerMessageOpenModal }) => {
  const [expanded, setExpanded] = React.useState<{ [id: string]: boolean }>({});

  const { t } = useI18n("product");
  const { currency, currencyPrice } = useCurrency();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();

  const { sellersWithProductLink } = useAppSelector((state) => state.products);

  const handleChange = (id: number) => () => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // const datacodeAttribute = product.attributes?.find((v) => v.code === "datecode" || v.name === "Date Code");
  const showDC = true;

  const visitSellerHandler = (seller: Seller, url: string) => () => {
    dispatch(
      sendFeedbackMessageThunk("seller_site", {
        seller,
        url,
        date: new Date().toISOString(),
      }),
    );
  };

  return (
    <React.Fragment>
      <table cellPadding="0" cellSpacing="0" className={classes.table}>
        <thead>
          <tr className={classes.headers}>
            <th className={classes.tdSeller}>Seller</th>
            <th className={classes.tdPrice}>Unit price</th>
            <th className={classes.tdStock}>Stock</th>
            <th className={classes.tdIcon} />
          </tr>
        </thead>
        <tbody>
          {sortedStockrecords &&
            sortedStockrecords.map((val, index) => {
              const dynamicMoq = getDynamicMoq(val);
              const qtyPrice = getQtyPrice(1, val);
              const seller = sellersWithProductLink?.find((i) => i.id === val.partner);
              const isShowProductLink = !!val.product_url || !!seller;
              const dateCode = val.partner_sku.includes("datecode:") && val.partner_sku.split(":")[1];
              const isExpanded = !!expanded[val.id];

              return (
                <React.Fragment key={val.id}>
                  <tr
                    className={clsx(classes.tableRow, {
                      odd: index % 2 !== 0,
                      expanded: isExpanded,
                    })}
                    onClick={handleChange(val.id)}
                  >
                    <td className={classes.tdSeller}>{val.partner_name}</td>
                    <td className={classes.tdPrice}>
                      {(getPrice(1, val, false) &&
                        `${formatMoney(currencyPrice(getPrice(1, val, false), val.price_currency))} ${
                          currency?.code
                        }`) ||
                        t("distributor.price_by_request")}
                    </td>
                    <td className={classes.tdStock}>{formatMoney(val.num_in_stock, 0, ".", "`") || 0}</td>
                    <td className={classes.tdIcon}>
                      <ExpandMoreIcon className={clsx(classes.icon, { expanded: isExpanded })} />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4}>
                      <Collapse in={!!expanded[val.id]}>
                        <div className={classes.details}>test</div>
                      </Collapse>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
        </tbody>
      </table>

      {/*  <div className={classes.accordionStocksDetails}> */}
      {/*  {sortedStockrecords && */}
      {/*    sortedStockrecords.map((val) => { */}
      {/*      const dynamicMoq = getDynamicMoq(val); */}
      {/*      const qtyPrice = getQtyPrice(1, val); */}
      {/*      const seller = sellersWithProductLink?.find((i) => i.id === val.partner); */}
      {/*      const isShowProductLink = !!val.product_url || !!seller; */}
      {/*      const dateCode = val.partner_sku.includes("datecode:") && val.partner_sku.split(":")[1]; */}

      {/*      return ( */}
      {/*        <div className={classes.stockrecord} key={val.id}> */}
      {/*          <ul className={classes.tableAreas}> */}
      {/*            <li> */}
      {/*              <span>Shipping from</span> */}
      {/*              <span>{val.partner_name}</span> */}
      {/*            </li> */}
      {/*            <li> */}
      {/*              <span>{t("distributor.price")}</span> */}
      {/*              <span> */}
      {/*                {(getPrice(1, val, false) && */}
      {/*                  `${formatMoney(currencyPrice(getPrice(1, val, false), val.price_currency))} ${ */}
      {/*                    currency?.code */}
      {/*                  }`) || */}
      {/*                  (qtyPrice.price?.price && */}
      {/*                    ` ${formatMoney(currencyPrice(qtyPrice.price.price, val.price_currency))} ${ */}
      {/*                      currency?.code */}
      {/*                    } x ${qtyPrice.amount}`) || */}
      {/*                  t("distributor.price_by_request")} */}
      {/*              </span> */}
      {/*            </li> */}
      {/*            <li> */}
      {/*              <span>{t("distributor.in_stock")}</span> */}
      {/*              <span>{formatMoney(val.num_in_stock, 0, ".", "`") || 0}</span> */}
      {/*            </li> */}
      {/*            <li> */}
      {/*              <span>{t("distributor.lead_period")}</span> */}
      {/*              <span> */}
      {/*                {val.lead_period_str */}
      {/*                  ? val.lead_period_str */}
      {/*                  : val.lead_period */}
      {/*                  ? `${val.lead_period}${t("common.d")}` */}
      {/*                  : "-"} */}
      {/*              </span> */}
      {/*            </li> */}
      {/*            <li> */}
      {/*              <span>{t("distributor.mpq")}</span> */}
      {/*              <span>{val.mpq}</span> */}
      {/*            </li> */}
      {/*            <li> */}
      {/*              <span>{t("distributor.moq")}</span> */}
      {/*              <span>{formatMoney(dynamicMoq, 0, ".", "`")}</span> */}
      {/*            </li> */}
      {/*            {showDC && ( */}
      {/*              <li> */}
      {/*                <span>DC</span> */}
      {/*                <span> */}
      {/*                  {dateCode ? ( */}
      {/*                    dateCode.length > 10 ? ( */}
      {/*                      <Tooltip */}
      {/*                        enterTouchDelay={1} */}
      {/*                        classes={{ tooltip: commonClasses.tooltip }} */}
      {/*                        title={<div>{dateCode}</div>} */}
      {/*                      > */}
      {/*                        <span>{`${dateCode.slice(0, 10)}...`}</span> */}
      {/*                      </Tooltip> */}
      {/*                    ) : ( */}
      {/*                      dateCode */}
      {/*                    ) */}
      {/*                  ) : ( */}
      {/*                    "-" */}
      {/*                  )} */}
      {/*                </span> */}
      {/*              </li> */}
      {/*            )} */}
      {/*          </ul> */}
      {/*          <Box display="flex" justifyContent="center"> */}
      {/*            {isShowProductLink ? ( */}
      {/*              <a */}
      {/*                href={val.product_url || seller.url} */}
      {/*                target="_blank" */}
      {/*                rel="noreferrer" */}
      {/*                onClick={visitSellerHandler( */}
      {/*                  { id: val.partner, name: val.partner_name }, */}
      {/*                  val.product_url || seller.url, */}
      {/*                )} */}
      {/*              > */}
      {/*                <Button variant="contained" className={clsx(appTheme.buttonCreate, classes.contactSellerButton)}> */}
      {/*                  Visit site */}
      {/*                </Button> */}
      {/*              </a> */}
      {/*            ) : ( */}
      {/*              <Button */}
      {/*                variant="contained" */}
      {/*                className={clsx(appTheme.buttonCreate, classes.contactSellerButton)} */}
      {/*                onClick={sellerMessageOpenModal(val.partner, val.partner_name)} */}
      {/*              > */}
      {/*                Contact seller */}
      {/*              </Button> */}
      {/*            )} */}
      {/*          </Box> */}
      {/*          <Accordion */}
      {/*            expanded={expanded === val.id} */}
      {/*            onChange={handleChange(val.id)} */}
      {/*            classes={{ root: classes.accordionRoot, expanded: classes.accordionExpanded }} */}
      {/*            key={val.id} */}
      {/*            elevation={0} */}
      {/*          > */}
      {/*            <AccordionSummary */}
      {/*              classes={{ content: classes.AccordionSummaryContent }} */}
      {/*              expandIcon={<ExpandMoreIcon />} */}
      {/*              aria-label="Expand" */}
      {/*              aria-controls="additional-actions1-content" */}
      {/*              id="additional-actions1-header" */}
      {/*            > */}
      {/*              <Typography className={clsx(classes.accordionTitle, appTheme.hyperlink)}> */}
      {/*                <b>{t("common.prices")}</b> */}
      {/*              </Typography> */}
      {/*            </AccordionSummary> */}
      {/*            <AccordionDetails className={classes.accordionDetails}> */}
      {/*              <div> */}
      {/*                <table className={classes.table}> */}
      {/*                  <tbody> */}
      {/*                    <tr> */}
      {/*                      <td>{formatMoney(1, 0, ".", "`")}</td> */}
      {/*                      <td>{currency?.code}</td> */}
      {/*                      <td> */}
      {/*                        <Price> */}
      {/*                          {dynamicMoq <= 1 */}
      {/*                            ? getPrice(1, val, false) && */}
      {/*                              formatMoney(currencyPrice(getPrice(1, val, false), val.price_currency)) */}
      {/*                            : "-"} */}
      {/*                        </Price> */}
      {/*                      </td> */}
      {/*                    </tr> */}
      {/*                    <tr> */}
      {/*                      <td>{formatMoney(10, 0, ".", "`")}</td> */}
      {/*                      <td>{currency?.code}</td> */}
      {/*                      <td> */}
      {/*                        <Price> */}
      {/*                          {dynamicMoq <= 10 */}
      {/*                            ? getPrice(10, val, false) && */}
      {/*                              formatMoney(currencyPrice(getPrice(10, val, false), val.price_currency)) */}
      {/*                            : "-"} */}
      {/*                        </Price> */}
      {/*                      </td> */}
      {/*                    </tr> */}
      {/*                    <tr> */}
      {/*                      <td>{formatMoney(100, 0, ".", "`")}</td> */}
      {/*                      <td>{currency?.code}</td> */}
      {/*                      <td> */}
      {/*                        <Price> */}
      {/*                          {dynamicMoq <= 100 */}
      {/*                            ? getPrice(100, val, false) && */}
      {/*                              formatMoney(currencyPrice(getPrice(100, val, false), val.price_currency)) */}
      {/*                            : "-"} */}
      {/*                        </Price> */}
      {/*                      </td> */}
      {/*                    </tr> */}
      {/*                    <tr> */}
      {/*                      <td>{formatMoney(1000, 0, ".", "`")}</td> */}
      {/*                      <td>{currency?.code}</td> */}
      {/*                      <td> */}
      {/*                        <Price> */}
      {/*                          {dynamicMoq <= 1000 */}
      {/*                            ? getPrice(1000, val, false) && */}
      {/*                              formatMoney(currencyPrice(getPrice(1000, val, false), val.price_currency)) */}
      {/*                            : "-"} */}
      {/*                        </Price> */}
      {/*                      </td> */}
      {/*                    </tr> */}
      {/*                    <tr> */}
      {/*                      <td>{formatMoney(10000, 0, ".", "`")}</td> */}
      {/*                      <td>{currency?.code}</td> */}
      {/*                      <td> */}
      {/*                        <Price> */}
      {/*                          {dynamicMoq <= 10000 */}
      {/*                            ? getPrice(10000, val, false) && */}
      {/*                              formatMoney(currencyPrice(getPrice(10000, val, false), val.price_currency)) */}
      {/*                            : "-"} */}
      {/*                        </Price> */}
      {/*                      </td> */}
      {/*                    </tr> */}
      {/*                  </tbody> */}
      {/*                </table> */}
      {/*                <br /> */}
      {/*              </div> */}
      {/*            </AccordionDetails> */}
      {/*          </Accordion> */}
      {/*        </div> */}
      {/*      ); */}
      {/*    })} */}
      {/* </div> */}
    </React.Fragment>
  );
};

export default DistributorsMobile;
