import React, { useEffect, useState } from "react";
import { ResponseItem as IResponseItem } from "@src/store/rfq/rfqTypes";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { removeRfqResponse, saveResponse } from "@src/store/rfq/rfqActions";
import CreateIcon from "@material-ui/icons/Create";
import clsx from "clsx";
import CommentModal from "@src/views/supplier-response/Requests/CommentModal/CommentModal";
import useDebounce from "@src/hooks/useDebounce";
import useAppSelector from "@src/hooks/useAppSelector";
import { Paper, TextField, Grid, Tooltip, Box } from "@material-ui/core";
import { ImportErrorItem } from "@src/views/supplier-response/Requests/SupplierResponse";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Alert from "@material-ui/lab/Alert";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { Partner } from "@src/store/profile/profileTypes";
import HelpIcon from "@material-ui/icons/Help";
import constants from "@src/constants/constants";
import CircularProgress from "@src/components/CircularProgress/CircularProgress";
import ManufacturerSelect from "@src/views/supplier-response/Requests/ManufacturerSelect/ManufacturerSelect";
import { ResponseManufacturer } from "@src/store/manufacturers/manufacturersTypes";
import addBusinessDays from "date-fns/addBusinessDays";
import { format, isWeekend, nextMonday } from "date-fns";
import { NumberInput } from "@src/components/Inputs";
import { formatMoney } from "@src/utils/formatters";
import { useStyles } from "./responseItemStyles";
import { useStyles as useResponseStyles } from "../supplierResponseStyles";

interface Props {
  responseItem: IResponseItem;
  error: ImportErrorItem | undefined;
  isSmDown?: boolean;
  selectedPartner: Partner | false;
  wasSent: boolean;
}

const responseErrorsMatch: { [key: string]: string } = {
  "duplicate data": "You sent a duplicate set of data. Your stock remains unchanged.",
};

const ResponseItem: React.FC<Props> = ({ responseItem, selectedPartner, isSmDown, error, wasSent }) => {
  const classes = useStyles();
  const responseClasses = useResponseStyles();
  const commonClasses = useCommonStyles();
  const dispatch = useAppDispatch();
  const { t } = useI18n("supplier_response");
  const validDays = constants.validDaysForResponse || 3;
  const validHours = validDays * 24;

  const [item, setItem] = useState(responseItem);
  const [repliedDate, setRepliedDate] = useState(null);
  const [isActiveValidating, setIsActiveValidating] = useState(false);
  const [wasChanged, setWasChanged] = useState(false);
  const [willBeResponded, setWillBeResponded] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [validHoursLeft, setValidHoursLeft] = useState(null);

  const debouncedItemValue = useDebounce(item, 200);

  const { selected, currencyList } = useAppSelector((state) => state.currency);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const savedResponse = useAppSelector((state) => responseItem?.id && state.rfq.rfqResponseData[responseItem.id]);
  // const countries = useAppSelector((state) => state.checkout.countries);
  const symbol =
    item?.requested_price?.currency &&
    (currencyList.find((curr) => curr.code === item.requested_price.currency)?.symbol ||
      item?.requested_price.currency);

  // const country = React.useMemo(() => {
  //   let countryItem = countries?.find((i) => i.iso_3166_1_a3 === item.country);
  //   if (countryItem?.iso_3166_1_a3 === "RUS") countryItem = countries?.find((i) => i.iso_3166_1_a3 === "KAZ");
  //   return countryItem;
  // }, [countries]);

  useEffect(() => {
    if (item.created) {
      const getStartDate = (date: Date) => {
        if (isWeekend(date)) return nextMonday(date.setHours(0, 0, 0));
        return date;
      };

      const startDate = getStartDate(new Date(item.created));
      const endDate = addBusinessDays(startDate, validDays);
      const hoursLeft = Math.trunc((endDate.getTime() - Date.now()) / 1000 / 60 / 60);
      setValidHoursLeft(hoursLeft > 0 ? (hoursLeft > validHours ? validHours : hoursLeft) : 0);
    }
  }, []);

  useEffect(() => {
    if (responseItem) {
      setItem(() => {
        if (isAuthenticated) return responseItem;

        const unAuthItem = { ...responseItem };
        const pnLength = responseItem.part_number?.length;
        if (pnLength === 3 || pnLength === 4) {
          unAuthItem.part_number = `${responseItem.part_number.slice(0, 2)}...`;
          unAuthItem.alter_upc = `${responseItem.part_number.slice(0, 2)}...`;
        }
        if (pnLength === 5) {
          unAuthItem.part_number = `${responseItem.part_number.slice(0, 3)}...`;
          unAuthItem.alter_upc = `${responseItem.part_number.slice(0, 3)}...`;
        }
        if (pnLength === 6) {
          unAuthItem.part_number = `${responseItem.part_number.slice(0, 4)}...`;
          unAuthItem.alter_upc = `${responseItem.part_number.slice(0, 4)}...`;
        }
        if (pnLength >= 7) {
          unAuthItem.part_number = `${responseItem.part_number.slice(0, 5)}...`;
          unAuthItem.alter_upc = `${responseItem.part_number.slice(0, 5)}...`;
        }
        return unAuthItem;
      });
    }
  }, [responseItem, selectedPartner]);

  useEffect(() => {
    if (wasSent) setWasChanged(false);
  }, [wasSent]);

  useEffect(() => {
    if (responseItem?.response_rfq?.created) {
      const date = format(new Date(responseItem.response_rfq.created), "dd.MM.yyyy, HH:mm");
      setRepliedDate(date);
    } else if (repliedDate) setRepliedDate(null);
  }, [responseItem, selectedPartner]);

  useEffect(() => {
    if (debouncedItemValue && wasChanged) {
      if (isActiveValidating) {
        dispatch(saveResponse(debouncedItemValue));
      } else {
        dispatch(removeRfqResponse(item.id));
      }
    }
  }, [debouncedItemValue]);

  useEffect(() => {
    if (item) {
      const requiredFields = [item.stock, item.price, item.datecode];
      if (requiredFields.some((i) => (typeof i === "string" ? !i?.trim() : !i))) {
        setWillBeResponded(false);
      } else {
        setWillBeResponded(true);
      }
      setIsActiveValidating([...requiredFields, item.comment].some((i) => (typeof i === "string" ? !!i?.trim() : !!i)));
    }
  }, [item]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (["price", "stock"].includes(name) && parseFloat(value) === 0) return false;

    if (!isActiveValidating) setIsActiveValidating(true);
    if (!wasChanged) setWasChanged(true);

    return setItem({ ...item, [name]: value });
  };

  const onOpenCommentModal = () => {
    if (validHoursLeft) setOpenCommentModal(true);
  };

  const onCloseCommentModal = () => {
    setOpenCommentModal(false);
  };

  const onSaveComment = (value: string) => {
    if (!wasChanged) setWasChanged(true);
    setItem({ ...item, comment: value });
    setOpenCommentModal(false);
  };

  const onSelectManufacturer = (selected_manufacturer: ResponseManufacturer) => {
    setItem({ ...item, other_manufacturer_name: "", selected_manufacturer });
  };

  const onChangeManufacturer = (name: string) => {
    setItem({ ...item, selected_manufacturer: null, other_manufacturer_name: name });
  };

  const isDifferentAlterUps = item.alter_upc?.toLowerCase() !== item.part_number?.toLowerCase();

  return isSmDown ? (
    <Paper
      className={clsx(classes.paperMobile, {
        [classes.willBeRespondedPaper]: willBeResponded,
        [classes.rowDisabled]: !validHoursLeft,
      })}
    >
      <Box display="flex" justifyContent="center">
        {repliedDate && <div className={classes.repliedMobile}>Replied {repliedDate}</div>}
      </Box>
      <Box mb={1.5}>
        <div>
          <Box display="flex" justifyContent="space-between" className={classes.info}>
            <CircularProgress
              value={validHoursLeft / ((constants.validDaysForResponse * 24) / 100)}
              label={`${validHoursLeft}h`}
              tooltip={
                !!validHoursLeft &&
                t("circular_progress_tooltip", {
                  count: validHoursLeft,
                  validTime: validHours,
                })
              }
            />
            <div>{/* <span>#</span> {item.index} */}</div>
          </Box>
          <div className={classes.info}>
            <span>Requested MPN:</span> {item.part_number}
          </div>
          <div className={classes.info}>
            <span>Requested quantity:</span>{" "}
            {isAuthenticated ? item.quantity : "Please login to see full information and provide your quotes"}
          </div>
        </div>
        {/* <div className={classes.leadingOfferContainerMobile}> */}
        {/*  <div className={classes.leadingOfferMobile}> */}
        {/*    <span>Leading offer:</span> {item.response_rfq?.summary?.min_price || "-"} {currency.symbol} */}
        {/*  </div> */}
        {/*  {!selectedPartner && ( */}
        {/*    <div className={classes.leadingOfferHint}> */}
        {/*      You can`t see leading offer <br /> as you are not a supplier. */}
        {/*    </div> */}
        {/*  )} */}
        {/*  {!!item.response_rfq?.summary?.count && ( */}
        {/*    <div className={classes.leadingOfferCountMobile}> */}
        {/*      {item.response_rfq?.summary?.count */}
        {/*        ? `${item.response_rfq.summary.count} ${t("offer", { count: item.response_rfq.summary.count })}` */}
        {/*        : "-"} */}
        {/*    </div> */}
        {/*  )} */}
        {/* </div> */}
      </Box>
      {!!error && (
        <Alert style={{ marginBottom: 10 }} severity="error">
          {error.error}
        </Alert>
      )}
      {!!item?.response_rfq?.summary?.best_price_other && (
        <Alert style={{ marginBottom: 10 }} severity="warning">
          There are lower unit prices for this item. You can try reducing the price to provide a competitive offer.
        </Alert>
      )}
      <Grid container spacing={2} className={classes.inputContainer}>
        <Grid item sm={6} xs={12}>
          <TextField
            label="Your MPN"
            placeholder="Your MPN"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            value={item.alter_upc}
            name="alter_upc"
            onChange={onChangeHandler}
            fullWidth
            disabled={!validHoursLeft}
          />
        </Grid>
        <Grid item sm={6} xs={12} className={clsx({ [classes.disabledSelect]: !validHoursLeft })}>
          <ManufacturerSelect
            selected={item.selected_manufacturer}
            otherName={item.other_manufacturer_name}
            list={item.response_rfq?.manufacturers}
            onSelectHandler={onSelectManufacturer}
            onChangeHandler={onChangeManufacturer}
          />
        </Grid>

        <Grid item sm={3} xs={6}>
          <NumberInput
            className={clsx({
              [classes.inputError]: isActiveValidating && !item.stock,
            })}
            label="Your quantity"
            placeholder="Specify quantity"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            value={item.stock}
            name="stock"
            onChange={onChangeHandler}
            fullWidth
            disabled={!validHoursLeft}
            decimalScale={0}
            isAllowedZero={false}
          />
        </Grid>
        <Grid item sm={3} xs={6}>
          <NumberInput
            className={clsx({
              [classes.inputError]: isActiveValidating && !item.price,
              [classes.bestPriseError]: !!item?.response_rfq?.summary?.best_price_other,
            })}
            label={`Unit price (${selected?.symbol}):`}
            placeholder="Your unit price"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            value={item.price}
            name="price"
            onChange={onChangeHandler}
            fullWidth
            disabled={!validHoursLeft}
            decimalScale={4}
            isAllowedZero={false}
          />
        </Grid>
        <Grid item sm={3} xs={6}>
          <TextField
            className={clsx({
              [classes.inputError]: isActiveValidating && !item.datecode,
            })}
            label="Date code:"
            size="small"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Date code"
            value={item.datecode}
            name="datecode"
            onChange={onChangeHandler}
            fullWidth
            disabled={!validHoursLeft}
          />
        </Grid>
        <Grid item sm={3} xs={6}>
          <NumberInput
            label="Lead time (days):"
            placeholder="Lead time"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            value={item.lead_time}
            name="lead_time"
            onChange={onChangeHandler}
            fullWidth
            disabled={!validHoursLeft}
            decimalScale={0}
            isAllowedZero={true}
          />
        </Grid>
      </Grid>
      <div>
        <TextField
          fullWidth
          variant="outlined"
          value={item.comment}
          name="comment"
          onChange={onChangeHandler}
          type="text"
          label="Comment:"
          multiline
          rows={4}
          InputLabelProps={{
            shrink: true,
          }}
          disabled={!validHoursLeft}
        />
      </div>
    </Paper>
  ) : (
    <tr
      className={clsx({
        [classes.willBeResponded]: willBeResponded,
        [classes.rowDisabled]: !validHoursLeft,
      })}
    >
      {/* <td className={clsx(classes.infoColumn, { [classes.error]: !!error })}>{item.index}</td> */}
      <td className={clsx(classes.infoColumn, { [classes.error]: !!error })}>
        <div className={classes.partNumber}>
          {item.part_number?.toUpperCase()}
          {!!error && (
            <Tooltip
              enterTouchDelay={1}
              classes={{ tooltip: commonClasses.tooltip }}
              title={<div>{responseErrorsMatch[error.error] || error.error}</div>}
            >
              <div className={classes.errorToolTip}>
                <ErrorOutlineIcon style={{ padding: 0 }} className={commonClasses.errorIcon} />
              </div>
            </Tooltip>
          )}
        </div>
        {/* {country && ( */}
        {/*  <div className={classes.geoPin}> */}
        {/*    <span className={`fi fi-${country.code.toLowerCase()}`} /> */}
        {/*    <span className={classes.countryName}>{country.printable_name}</span> */}
        {/*  </div> */}
        {/* )} */}
        {item?.requested_price?.price && symbol && (
          <div className={classes.geoPin}>
            <span>
              Target price: {formatMoney(item.requested_price.price)} {symbol}
            </span>
          </div>
        )}
        {repliedDate && <div className={classes.replied}>Replied {repliedDate}</div>}
      </td>
      <td className={clsx(classes.infoColumn, { [classes.error]: !!error })}>
        {isAuthenticated ? (
          item.quantity
        ) : (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Tooltip
              enterTouchDelay={1}
              classes={{ tooltip: responseClasses.tooltip }}
              title={<div>Please login to see full information and provide your quotes.</div>}
            >
              <HelpIcon className={classes.helpIcon} />
            </Tooltip>
          </Box>
        )}
      </td>
      <td className={clsx(classes.infoColumn, { [classes.error]: !!error })}>New only</td>
      {/* <td className={classes.leadingOffer}> */}
      {/*  {selectedPartner ? ( */}
      {/*    <div className={classes.leadingOfferContainer}> */}
      {/*      <div className={classes.leadingOfferPrice}> */}
      {/*        {item.response_rfq?.summary?.min_price || "-"} */}
      {/*        {!!item.response_rfq?.summary?.min_price && ` ${currency.symbol}`} */}
      {/*      </div> */}
      {/*      <div className={classes.leadingOfferCount}> */}
      {/*        {item.response_rfq?.summary?.count */}
      {/*          ? `${item.response_rfq.summary.count} ${t("offer", { count: item.response_rfq.summary.count })}` */}
      {/*          : "-"} */}
      {/*      </div> */}
      {/*    </div> */}
      {/*  ) : ( */}
      {/*    <Box display="flex" alignItems="center" justifyContent="center"> */}
      {/*      <Tooltip enterTouchDelay={1} */}
      {/*        classes={{ tooltip: commonClasses.tooltip }} */}
      {/*        title={<div>You can`t see leading offer as you are not a supplier.</div>} */}
      {/*      > */}
      {/*        <HelpIcon className={classes.helpIcon} /> */}
      {/*      </Tooltip> */}
      {/*    </Box> */}
      {/*  )} */}
      {/* </td> */}
      <td
        className={clsx(classes.input, {
          [classes.inputError]: isActiveValidating && !item.stock,
        })}
      >
        <NumberInput
          customInput={false}
          disabled={!validHoursLeft}
          placeholder="Specify quantity"
          value={item.stock}
          name="stock"
          onChange={onChangeHandler}
          decimalScale={0}
          isAllowedZero={false}
        />
      </td>
      <td
        className={clsx(classes.input, {
          [classes.inputError]: isActiveValidating && !item.price,
          [classes.bestPriseError]:
            !!item?.response_rfq?.summary?.best_price_other || !!savedResponse?.errors?.priceWarning,
        })}
      >
        <div>
          <NumberInput
            customInput={false}
            disabled={!validHoursLeft}
            placeholder="Your unit price"
            value={item.price}
            name="price"
            onChange={onChangeHandler}
            decimalScale={4}
            isAllowedZero={false}
          />
          {savedResponse?.errors?.priceWarning && (
            <Tooltip
              enterTouchDelay={1}
              classes={{ tooltip: responseClasses.tooltip }}
              title={
                <div>
                  You are trying to set a different price for the same product with the same stock quantity.
                  <br />
                  We recommend to set the same price for stockrecords with the same quantity and date code.
                </div>
              }
            >
              <HelpIcon className={clsx(classes.helpIcon, classes.helpPriceIcon)} />
            </Tooltip>
          )}
          {!savedResponse?.errors?.priceWarning && !!item?.response_rfq?.summary?.best_price_other && (
            <Tooltip
              enterTouchDelay={1}
              classes={{ tooltip: responseClasses.tooltip }}
              title={
                <div>
                  There are lower unit prices for this item.
                  <br />
                  You can try reducing the price to provide a competitive offer.
                </div>
              }
            >
              <HelpIcon className={clsx(classes.helpIcon, classes.helpPriceIcon)} />
            </Tooltip>
          )}
        </div>
      </td>
      <td className={classes.input}>
        <div>
          <input
            className={clsx(classes.alterUps, {
              active: isDifferentAlterUps,
            })}
            disabled={!validHoursLeft}
            placeholder="Your MPN"
            value={item.alter_upc}
            name="alter_upc"
            onChange={onChangeHandler}
          />
          {isDifferentAlterUps && (
            <Tooltip
              enterTouchDelay={1}
              classes={{ tooltip: responseClasses.tooltip }}
              title={<div>The MPN does not fully match the requested one</div>}
            >
              <HelpIcon className={clsx(classes.helpIcon, classes.helpPriceIcon)} />
            </Tooltip>
          )}
        </div>
      </td>
      {constants.showManufacturerField && (
        <td className={clsx(classes.tdManufacturer, { [classes.disabledSelect]: !validHoursLeft })}>
          <ManufacturerSelect
            selected={item.selected_manufacturer}
            otherName={item.other_manufacturer_name}
            list={item.response_rfq?.manufacturers}
            onSelectHandler={onSelectManufacturer}
            onChangeHandler={onChangeManufacturer}
          />
        </td>
      )}
      <td className={clsx(classes.input, { [classes.inputError]: isActiveValidating && !item.datecode })}>
        <input
          disabled={!validHoursLeft}
          placeholder="Date code"
          value={item.datecode}
          name="datecode"
          onChange={onChangeHandler}
        />
      </td>
      <td className={classes.input}>
        <NumberInput
          customInput={false}
          disabled={!validHoursLeft}
          placeholder="Lead time (days)"
          value={item.lead_time}
          name="lead_time"
          onChange={onChangeHandler}
          decimalScale={0}
          isAllowedZero={true}
        />
      </td>
      <td>
        <div className={clsx(classes.comment, { [classes.offPointer]: !validHoursLeft })} onClick={onOpenCommentModal}>
          <CreateIcon className={clsx(classes.commentIcon, { [classes.emptyComment]: !!item.comment.trim() })} />
        </div>
      </td>
      <td>
        <CircularProgress
          value={validHoursLeft / ((constants.validDaysForResponse * 24) / 100)}
          label={`${validHoursLeft}h`}
          tooltip={!!validHoursLeft && t("circular_progress_tooltip", { count: validHoursLeft, validTime: validHours })}
        />
      </td>
      {openCommentModal && (
        <CommentModal comment={item.comment} onSaveHandler={onSaveComment} onClose={onCloseCommentModal} open={true} />
      )}
    </tr>
  );
};

export default React.memo(ResponseItem);
