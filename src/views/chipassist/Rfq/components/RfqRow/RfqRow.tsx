import React from "react";
// import useAppDispatch from "@src/hooks/useAppDispatch";
// import CheckIcon from "@material-ui/icons/Check";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
// import green from "@material-ui/core/colors/green";
// import ExpandLessIcon from "@material-ui/icons/ExpandLess";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import ConfirmButton from "@src/components/ConfirmButton/ConfirmButton";
// import { deleteRfqThunk } from "@src/store/rfq/rfqActions";
// import useCurrency from "@src/utils/hooks/useCurrency";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
// import useAppTheme from "@src/theme/useAppTheme";
import { RfqItem } from "@src/store/rfq/rfqTypes";
import { DataField, DataLabel, DataRow, DataValue } from "@src/components/DataTable/DataTable";
// import useAppSelector from "@src/hooks/useAppSelector";
import { format } from "date-fns";
import { RFQ_TYPE_PARTNERS } from "../../Rfq";
import { useStyles } from "./styles";

interface RfqRowProps {
  fillRow: boolean;
  key: number | string;
  rfq: RfqItem;
  isPartner: boolean;
  rfqType: string;
  onOpenResponses?: (e: React.SyntheticEvent) => void;
  onMakeResponse?: (e: React.SyntheticEvent) => void;
  onCommentClick: (e: React.SyntheticEvent) => void;
}

const RfqRow = (props: RfqRowProps) => {
  const { rfq, rfqType, onCommentClick, isPartner, fillRow } = props;
  const classes = useStyles();
  // const appTheme = useAppTheme();
  // const dispatch = useAppDispatch();
  // const [showAllSellers, setShowAllSellers] = useState(false);
  // const [willDelete, setWillDelete] = useState(null);
  // const allSellers = useAppSelector((state) => state.sellers.items || []);
  const { t } = useI18n("rfq");
  // const { currencyPrice } = useCurrency();
  // const deliveryDate = moment(rfq.delivery_date).format(DATE_FORMAT);
  const createdDate = format(new Date(rfq.created), "dd.MM.yyyy");
  const commentLength = 100;

  const hasResponse = isPartner && rfq.response_rfq && rfq.response_rfq.length && rfqType === RFQ_TYPE_PARTNERS;

  const rowClass = clsx({
    [classes.disabledRow]: hasResponse,
  });

  // const onToggleShowAll = useCallback(() => {
  //   setShowAllSellers((prev) => !prev);
  // }, []);

  // const sellers = (rfq.seller && !!rfq.seller.length && rfq.seller) || [];

  // const sellers = useMemo(() => {
  //   if (rfq.seller.length === allSellers.length - 1) {
  //     return [allSellers[0]];
  //   }
  //   return (rfq.seller && !!rfq.seller.length && rfq.seller) || [];
  // }, [rfq.seller.length, allSellers.length]);

  // const onDeleteClick = (id: number) => () => {
  //   dispatch(deleteRfqThunk(id));
  // };
  //
  // const onDeleteSubmitOpen = (key: number) => () => {
  //   setWillDelete(key);
  // };
  //
  // const onDeleteSubmitClose = () => {
  //   setWillDelete(null);
  // };

  return (
    // <TableRow
    //   className={`${rowClass} test-rfq-row ${
    //     // eslint-disable-next-line no-nested-ternary
    //     rfq.id === willDelete ? classes.rfqListRowRed : ""
    //   }`}
    // > При восстановлении удалить TableRow ниже и переделать на DataRow
    <DataRow
      className={clsx(rowClass, classes.row, "test-rfq-row", {
        [classes.fillRow]: fillRow,
      })}
    >
      <DataField gridArea="id">
        <DataLabel>{t("column.id")}</DataLabel>
        <DataValue className="rfq-row-id">{rfq.id}</DataValue>
      </DataField>
      <DataField className={`${classes.tdPartNumber} rfq-row-part-number-td`} gridArea="partnumber">
        <DataLabel>{t("column.part_number")}</DataLabel>
        <DataValue>{rfq.part_number}</DataValue>
      </DataField>
      <DataField gridArea="qty">
        <DataLabel>{t("column.qty")}</DataLabel>
        <DataValue>{rfq.quantity}</DataValue>
      </DataField>
      {/* <TableCell>
        <div className="text">{currencyPrice(parseFloat(rfq.price))}</div>
      </TableCell>
      <TableCell>
        <div className="text">{deliveryDate}</div>
      </TableCell>
      <TableCell>
        <div className="text">{rfq.address}</div>
      </TableCell> */}
      {/* <TableCell>
        <div className="text">{!!rfq.approved && <CheckIcon style={{ color: green[500] }} />}</div>
      </TableCell> */}
      <DataField gridArea="comment">
        <DataLabel>{t("column.comment")}</DataLabel>
        <DataValue>
          {rfq.comment && (
            <span className={classes.tdCommentText}>
              {`${rfq.comment.substring(0, commentLength)}${rfq.comment.length > commentLength ? "..." : ""}`}
            </span>
          )}
          {rfqType !== RFQ_TYPE_PARTNERS && (
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={onCommentClick}
              className={classes.commentBtn}
            >
              {rfq.comment
                ? rfq.comment.length > commentLength
                  ? t("common.view_all")
                  : t("common.edit")
                : t("common.add")}
            </Button>
          )}
        </DataValue>
      </DataField>
      <DataField gridArea="created">
        <DataLabel>{t("column.created")}</DataLabel>
        <DataValue>
          <div className="text">{createdDate}</div>
        </DataValue>
      </DataField>
      <DataField gridArea="status">
        <DataLabel>{t("column.status")}</DataLabel>
        <DataValue>
          {rfq.status || "-"}
          {/* <div className="text test-rfq-row-seller"> */}
          {/*  {(sellers.length > 2 && !showAllSellers ? sellers.slice(0, 2) : sellers).map( */}
          {/*    (partner: Record<any, any>, index: number) => ( */}
          {/*      <div key={index} className={classes.seller}> */}
          {/*        {partner.name} */}
          {/*      </div> */}
          {/*    ), */}
          {/*  )} */}
          {/* </div> */}
          {/* {sellers.length > 2 && ( */}
          {/*  <Button */}
          {/*    variant="outlined" */}
          {/*    color="secondary" */}
          {/*    className={classes.sellersDisplayBtn} */}
          {/*    onClick={onToggleShowAll} */}
          {/*  > */}
          {/*    {showAllSellers ? t("show_less") : t("show_more")} */}
          {/*    {showAllSellers ? <ExpandLessIcon /> : <ExpandMoreIcon />} */}
          {/*  </Button> */}
          {/* )} */}
        </DataValue>
      </DataField>
      {/* <DataField gridArea="response"> */}
      {/*  <DataLabel></DataLabel> */}
      {/*  <DataValue> */}
      {/*    {isPartner && ( */}
      {/*      <div className="text"> */}
      {/*        {rfqType === RFQ_TYPE_PARTNERS ? ( */}
      {/*          <Button */}
      {/*            variant="contained" */}
      {/*            size="small" */}
      {/*            onClick={onMakeResponse} */}
      {/*            className={clsx( */}
      {/*              classes.responseBtn, */}
      {/*              hasResponse && appTheme.buttonCreate, */}
      {/*              !hasResponse && appTheme.buttonCreate, */}
      {/*            )} */}
      {/*          > */}
      {/*            {hasResponse ? t("response_show") : t("response")} */}
      {/*          </Button> */}
      {/*        ) : ( */}
      {/*          <> */}
      {/*            /!* {rfq.response_rfq && !!rfq.response_rfq.length && ( *!/ */}
      {/*            <Button variant="contained" className={appTheme.buttonPrimary} size="small" onClick={onOpenResponses}> */}
      {/*              {t("responses")} */}
      {/*              <span className={classes.counter}>{rfq.response_rfq.length}</span> */}
      {/*            </Button> */}
      {/*            /!* )} *!/ */}
      {/*          </> */}
      {/*        )} */}
      {/*      </div> */}
      {/*    )} */}
      {/*  </DataValue> */}
      {/* </DataField> */}

      {/* <TableCell align="right"> */}
      {/*  <Box display="flex" alignItems="center" justifyContent="flex-end" className="rfq-row-response"> */}
      {/*    {rfqType === RFQ_TYPE_PARTNERS ? ( */}
      {/*      <Button */}
      {/*        variant="contained" */}
      {/*        size="small" */}
      {/*        onClick={onMakeResponse} */}
      {/*        className={clsx( */}
      {/*          classes.responseBtn, */}
      {/*          hasResponse && appTheme.buttonCreate, */}
      {/*          !hasResponse && appTheme.buttonCreate, */}
      {/*        )} */}
      {/*      > */}
      {/*        {hasResponse ? t("response_show") : t("response")} */}
      {/*      </Button> */}
      {/*    ) : ( */}
      {/*      <> */}
      {/*        {rfq.response_rfq && !!rfq.response_rfq.length && ( */}
      {/*          <Button variant="contained" className={appTheme.buttonPrimary} size="small" onClick={onOpenResponses}> */}
      {/*            {t("responses")} */}
      {/*            <span className={classes.counter}>{rfq.response_rfq.length}</span> */}
      {/*          </Button> */}
      {/*        )} */}
      {/*        {!rfq.response_rfq || */}
      {/*          (!rfq.response_rfq.length && ( */}
      {/*            <div className={`rfq-row-delete`}> */}
      {/*              <ConfirmButton */}
      {/*                onAction={onDeleteClick(rfq.id)} */}
      {/*                onOpen={onDeleteSubmitOpen(rfq.id)} */}
      {/*                onClose={onDeleteSubmitClose} */}
      {/*                question={t("delete_rfq")} */}
      {/*              /> */}
      {/*            </div> */}
      {/*          ))} */}
      {/*      </> */}
      {/*    )} */}
      {/*  </Box> */}
      {/* </TableCell> */}
    </DataRow>
  );
};

export default RfqRow;
