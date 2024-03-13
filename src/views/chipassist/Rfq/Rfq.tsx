import React, { useEffect, useState } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { Box, Card, Accordion, AccordionSummary, AccordionDetails, Button, Collapse } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { loadRfq } from "@src/store/rfq/rfqActions";
import setUrl from "@src/utils/setUrl";
import { Page } from "@src/components";
import Preloader from "@src/components/Preloader/Preloader";
import Paginate from "@src/components/Paginate";
// import useAppTheme from "@src/theme/useAppTheme";
import FiltersContainer, {
  // FilterGroupBar,
  FilterPageSizeChoiceBar,
  FilterResultsBar,
} from "@src/components/FiltersBar";
import { DataBody, DataField, DataHeader, DataRow, DataTable, DataValue } from "@src/components/DataTable/DataTable";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppTheme from "@src/theme/useAppTheme";
import { isEven } from "@src/utils/bom";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useStyles } from "./style";
import RfqCommentModal from "./components/RfqCommentModal/RfqCommentModal";
import RfqRow from "./components/RfqRow/RfqRow";

export const RFQ_TYPE_YOUR = "RFQ_TYPE_YOUR";
export const RFQ_TYPE_PARTNERS = "RFQ_TYPE_PARTNERS";

// const rfqTableHeaders = [
//   {
//     label: "column.id",
//     labelPostfix: "",
//     name: "id",
//     isSort: true,
//   },
//   {
//     label: "column.part_number",
//     labelPostfix: "",
//     name: "partnumber",
//     isSort: true,
//   },
//   {
//     label: "column.qty",
//     labelPostfix: "",
//     name: "quantity",
//     isSort: true,
//   },
//   // {
//   //   label: "column.price",
//   //   labelPostfix: "currency",
//   //   name: "price",
//   //   isSort: true,
//   // },
//   // {
//   //   label: "column.delivery_date",
//   //   labelPostfix: "",
//   //   name: "date",
//   //   isSort: true,
//   // },
//   // {
//   //   label: "column.address",
//   //   labelPostfix: "",
//   //   name: "address",
//   //   isSort: false,
//   // },
//   {
//     label: "distributor.distributor",
//     labelPostfix: "",
//     name: "seller",
//     isSort: true,
//   },
//   // {
//   //   label: "column.approved",
//   //   labelPostfix: "",
//   //   name: "approved",
//   //   isSort: true,
//   // },
//   {
//     label: "column.comment",
//     labelPostfix: "",
//     name: "comment",
//     isSort: false,
//   },
//   {
//     label: "column.created",
//     labelPostfix: "",
//     name: "created",
//     isSort: true,
//   },
// ];

function getPageSettings(): { rfqType: string; showAll: boolean } | null {
  const storage: string | null = localStorage.getItem("rfqPageSettings");
  if (storage) {
    return JSON.parse(storage);
  }

  return null;
}

// function setPageSettings(rfqType: string, showAll: boolean): void {
//   localStorage.setItem(
//     "rfqPageSettings",
//     JSON.stringify({
//       rfqType,
//       showAll,
//     }),
//   );
// }

interface Expanded {
  [key: string]: { showMore: boolean };
}

function Rfq(props: Record<string, any>) {
  const { className } = props;
  // const appTheme = useAppTheme();
  const { t } = useI18n("rfq");
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const navigate = useNavigate();

  // const [openedResponses, setOpenedResponses] = useState(null);
  // const [makeResponse, setMakeResponse] = useState(null);
  const [openCommentModal, setOpenCommentModal] = useState(null);
  const [rfqType, setRfqType] = useState(RFQ_TYPE_YOUR);
  const [showAll, setShowAll] = useState(false);
  const [rfqsGroups, setRfqsGroups] = useState<any>({});
  const [expanded, setExpanded] = useState<Expanded>({});
  //  const [rfqsGroupBy, setRfqsGroupBy] = useState<string>(localStorage.getItem("rfqsGroupBy") || "date");

  // eslint-disable-next-line no-underscore-dangle
  const _pageSize = useAppSelector((state) => state.search.pageSize);
  const isRfqsLoading = useAppSelector((state) => state.rfq.rfqsLoading);
  const rfqsNeedUpdate = useAppSelector((state) => state.rfq.rfqsNeedUpdate);
  const rfqs = useAppSelector((state) => state.rfq.rfqs);
  // const profile = useAppSelector((state) => state.profile.profileInfo);
  const shouldUpdateBackend = useAppSelector((state) => state.common.shouldUpdateBackend);

  const storageKey = "rfqListShowBy";

  const page = +useURLSearchParams("page", false, 1, false) || 1;
  const pageSize =
    +useURLSearchParams("page_size", false, localStorage.getItem(`${storageKey}`) || _pageSize, false) || 15;
  const orderBy = useURLSearchParams("order_by", false, localStorage.getItem("rfqOrderBy") || "", false);

  // const [sort_name, sort_direction] = orderBy.split("_") as [string, "asc" | "desc"];
  // const sortHeader = rfqTableHeaders.find((val) => val.name === sort_name);
  const showPartnersRfq = rfqType === RFQ_TYPE_PARTNERS;
  // const isPartner = (profile && profile.partners && !!profile.partners.length) || false;
  const isPartner = React.useMemo(() => !!localStorage.getItem("show_old_rfqs") || false, []);

  useEffect(() => {
    const rfqPageSettings = getPageSettings();
    if (!isRfqsLoading) {
      dispatch(
        loadRfq(
          page,
          pageSize,
          orderBy,
          rfqPageSettings ? rfqPageSettings.rfqType === RFQ_TYPE_PARTNERS : showPartnersRfq,
          rfqPageSettings ? rfqPageSettings.showAll : showAll,
        ),
      );
    }
  }, [rfqsNeedUpdate, shouldUpdateBackend]);

  useEffect(() => {
    const rfqPageSettings = getPageSettings();
    if (rfqPageSettings) {
      setRfqType(isPartner ? rfqPageSettings.rfqType : RFQ_TYPE_YOUR);
      setShowAll(rfqPageSettings.showAll);
    }
  }, [isPartner]);

  useEffect(() => {
    if (rfqs.results?.length) {
      const newGroups: any = {};
      rfqs.results.forEach((item) => {
        const groupTime = item.created.slice(0, 10);
        // eslint-disable-next-line no-unused-expressions
        // rfqsGroupBy === "time" ? (groupTime = item.created.slice(0, 16)) : (groupTime = item.created.slice(0, 10));

        if (newGroups[groupTime]) {
          if (newGroups[groupTime].some((i: any) => i.id === item.id)) return;
          newGroups[groupTime].push(item);
        } else {
          newGroups[groupTime] = [];
          newGroups[groupTime].push(item);
        }
      });
      setRfqsGroups(newGroups);

      const exp: Expanded = {};
      Object.keys(newGroups).forEach((key) => {
        exp[key] = { showMore: false };
      });
      setExpanded(exp);
    }
  }, [rfqs.results]);

  // const handleRfqsGroupBy = (value: string) => {
  //   setExpanded([]);
  //   setRfqsGroupBy(value);
  // };

  const handleExtendedChange = (panelId: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    if (!isExpanded) {
      delete expanded[panelId];
      setExpanded({ ...expanded });
    } else {
      setExpanded({ ...expanded, [panelId]: { showMore: false } });
    }
  };

  const handleShowMoreChange = (panelId: string) => () => {
    if (expanded[panelId]) {
      setExpanded({ ...expanded, [panelId]: { showMore: !expanded[panelId].showMore } });
    }
  };

  const reloadList = (page_size: number, in_page: number) => {
    if (page_size !== pageSize) {
      const new_page = in_page || 1;
      setUrl(navigate, "/profile/requests", new_page, page_size, { order_by: orderBy });
      dispatch(loadRfq(new_page, page_size, orderBy, showPartnersRfq, showAll));
    }
  };

  const onPageChangeHandle = (data: Record<any, any>) => {
    setExpanded({});
    setRfqsGroups({});
    if (!isRfqsLoading) {
      setUrl(navigate, "/profile/requests", data.selected + 1, pageSize, {
        order_by: orderBy,
      });
      dispatch(loadRfq(data.selected + 1, pageSize, orderBy, showPartnersRfq, showAll));
    }
  };

  // const onOpenResponses = (id: number) => () => {
  //   setOpenedResponses(id);
  // };

  // const onCloseResponses = () => {
  //   setOpenedResponses(null);
  // };

  // const onOpenMakeResponse = (id: number) => () => {
  //   setMakeResponse(id);
  // };

  const onOpenCommentModal = (id: number) => () => {
    setOpenCommentModal(id);
  };

  // const onCloseMakeResponse = () => {
  //   setMakeResponse(null);
  //   dispatch(clearRfqResponse());
  // };

  const onCloseCommentModal = () => {
    setOpenCommentModal(null);
  };

  // const onDeleteRfqFromStore = (id: number) => {
  //   if (rfqType === RFQ_TYPE_PARTNERS && !showAll) {
  //     dispatch(deleteRfqFromStore(id));
  //   }
  // };

  const getRfqById = (id: number) => {
    return rfqs.results.filter((item) => item.id === id)[0];
  };

  // const onChangeShowAll = useCallback(
  //   (e) => {
  //     setShowAll(e.target.checked);
  //     setPageSettings(rfqType, e.target.checked);
  //     setUrl(history, "/profile/requests", 1, pageSize, { order_by: orderBy });
  //     dispatch(loadRfq(1, pageSize, orderBy, showPartnersRfq, e.target.checked));
  //   },
  //   [history, rfqType, pageSize, showPartnersRfq, orderBy],
  // );
  //
  // const onChangeRfqType = useCallback(
  //   (e) => {
  //     setRfqType(e.target.value);
  //     setPageSettings(e.target.value, showAll);
  //     setUrl(history, "/profile/requests", 1, pageSize, { order_by: orderBy });
  //     dispatch(loadRfq(1, pageSize, orderBy, e.target.value === RFQ_TYPE_PARTNERS, showAll));
  //   },
  //   [history, showAll, pageSize, orderBy],
  // );

  // const orderDirection = (name: string, reverse = false): "asc" | "desc" => {
  //   const isCurrentHeader = sortHeader && sortHeader.name === name;
  //   let order = isCurrentHeader ? sort_direction : "asc";
  //   if (reverse && isCurrentHeader) order = order === "asc" ? "desc" : "asc";
  //   return order;
  // };

  // const sortLabelHandler = (name: string, reverse = false) => {
  //   setExpanded([]);
  //   setRfqsGroups({});
  //   return onOrderChange(name, orderDirection(name, reverse));
  // };

  // const onOrderChange = useCallback(
  //   (name, sort) => {
  //     const value = `${name}_${sort}`;
  //     localStorage.setItem("rfqOrderBy", value);
  //     setUrl(history, "/profile/requests", 1, pageSize, { order_by: value });
  //     dispatch(loadRfq(1, pageSize, value, showPartnersRfq, showAll));
  //   },
  //   [history, pageSize, showPartnersRfq, showAll],
  // );

  // const openRfqModal = () => {
  //   dispatch(rfqModalOpen());
  // };

  return (
    <Page title={t("page_title")} description={t("page_description")}>
      <Box mb={5}>
        {/* <h1 className={commonClasses.pageTitle}>{t("title")}</h1> */}
        <div className={clsx(commonClasses.filtersRow, commonClasses.filtersRowMargin)}>
          <FiltersContainer>
            <FilterResultsBar count={rfqs?.count || 0} />
            {/* <FilterGroupBar groupBy={rfqsGroupBy} groupAction={handleRfqsGroupBy} /> */}
            <FilterPageSizeChoiceBar storageKey={`${storageKey}`} action={reloadList} />
          </FiltersContainer>
        </div>
        <Card className={clsx(className)}>
          {/* <Box m={2}> */}
          {/*  <Box display="flex" alignItems="center"> */}
          {/*    {isPartner && ( */}
          {/*      <TextField */}
          {/*        id="rfq-type" */}
          {/*        className="test-rfq-type" */}
          {/*        select */}
          {/*        label={t("type")} */}
          {/*        value={rfqType} */}
          {/*        onChange={onChangeRfqType} */}
          {/*        variant="outlined" */}
          {/*        size="small" */}
          {/*      > */}
          {/*        <MenuItem className={appTheme.selectMenuItem} value={RFQ_TYPE_YOUR}> */}
          {/*          {t("type_your")} */}
          {/*        </MenuItem> */}
          {/*        <MenuItem className={appTheme.selectMenuItem} value={RFQ_TYPE_PARTNERS}> */}
          {/*          {t("type_parent")} */}
          {/*        </MenuItem> */}
          {/*      </TextField> */}
          {/*    )} */}
          {/*    {rfqType === RFQ_TYPE_PARTNERS && ( */}
          {/*      <FormControlLabel */}
          {/*        className={`${classes.showAll} test-rfq-show-all`} */}
          {/*        control={<Switch checked={showAll} onChange={onChangeShowAll} name="checkedB" color="primary" />} */}
          {/*        label={t("show_all")} */}
          {/*      /> */}
          {/*    )} */}
          {/*    /!* <Button *!/ */}
          {/*    /!*  variant="contained" *!/ */}
          {/*    /!*  className={`${classes.btnCreateRfq} ${appTheme.buttonCreate} test-rfq-create-button`} *!/ */}
          {/*    /!*  onClick={openRfqModal} *!/ */}
          {/*    /!* > *!/ */}
          {/*    /!*  {t("create")} *!/ */}
          {/*    /!* </Button> *!/ */}
          {/*  </Box> */}
          {/* </Box> */}
          {isRfqsLoading && (
            <div className={classes.tableContentTdSkeleton}>
              <Preloader title={t("loading")} />
            </div>
          )}
          {!isRfqsLoading && !Object.keys(rfqsGroups).length && (
            <>
              <DataTable
                className={`${classes.table} rfq-table`}
                gridClass={classes.tableAreas}
                gridAreasBreakpoint="sm"
              >
                <DataHeader>
                  <DataRow>
                    <DataField gridArea="id">
                      <DataValue>{t("column.id")}</DataValue>
                    </DataField>
                    <DataField gridArea="partnumber">
                      <DataValue>{t("column.part_number")}</DataValue>
                    </DataField>
                    <DataField gridArea="qty">
                      <DataValue>{t("column.qty")}</DataValue>
                    </DataField>
                    <DataField gridArea="comment">
                      <DataValue>{t("column.comment")}</DataValue>
                    </DataField>
                    <DataField gridArea="created">
                      <DataValue>{t("column.created")}</DataValue>
                    </DataField>
                    <DataField gridArea="status">
                      <DataValue>{t("column.status")}</DataValue>
                    </DataField>
                  </DataRow>
                </DataHeader>
                <DataBody></DataBody>
              </DataTable>
              <div className={commonClasses.emptyContentMessage}>
                <h2>{t("not_found")}</h2>
                <h5>{t("not_found_sub")}</h5>
              </div>
            </>
          )}
          {!isRfqsLoading && !!Object.keys(rfqsGroups).length && (
            <div>
              {Object.keys(rfqsGroups).map((key) => {
                const requestDate = format(new Date(rfqsGroups[key][0].created), "dd.MM.yyyy");
                const positionsQty = rfqsGroups[key].length;

                return (
                  <Accordion
                    square
                    className={classes.accordion}
                    key={key}
                    expanded={!!expanded[key]}
                    onChange={handleExtendedChange(key)}
                  >
                    <AccordionSummary className={classes.accordionSum}>
                      <div className={classes.accordionTyp}>
                        <div className={classes.accordionInfo}>
                          <div>
                            <span>{t("submitted")}</span>: {requestDate}
                          </div>
                          <div>
                            <span>{t("positions")}</span>: {positionsQty}
                          </div>
                        </div>
                        <Button className={appTheme.buttonPrimary} variant="contained" size="small">
                          {expanded[key] ? t("close_button") : t("open_button")}
                        </Button>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                      {!isRfqsLoading && (
                        <>
                          <DataTable
                            className={`${classes.table} rfq-table`}
                            gridClass={classes.tableAreas}
                            gridAreasBreakpoint="xs"
                          >
                            <DataHeader>
                              <DataRow>
                                <DataField gridArea="id">
                                  <DataValue>{t("column.id")}</DataValue>
                                </DataField>
                                <DataField gridArea="partnumber">
                                  <DataValue>{t("column.part_number")}</DataValue>
                                </DataField>
                                <DataField gridArea="qty">
                                  <DataValue>{t("column.qty")}</DataValue>
                                </DataField>
                                <DataField gridArea="comment">
                                  <DataValue>{t("column.comment")}</DataValue>
                                </DataField>
                                <DataField gridArea="created">
                                  <DataValue>{t("column.created")}</DataValue>
                                </DataField>
                                <DataField gridArea="status">
                                  <DataValue>{t("column.status")}</DataValue>
                                </DataField>
                              </DataRow>
                            </DataHeader>
                            <DataBody>
                              {!isRfqsLoading && !!rfqs.results?.length && (
                                <>
                                  {rfqsGroups[key].slice(0, 5).map((item: any, index: number) => {
                                    return (
                                      <RfqRow
                                        fillRow={!isEven(index)}
                                        key={uuidv4()}
                                        rfq={item}
                                        isPartner={isPartner}
                                        rfqType={rfqType}
                                        // onOpenResponses={onOpenResponses(item.id)}
                                        // onMakeResponse={onOpenMakeResponse(item.id)}
                                        onCommentClick={onOpenCommentModal(item.id)}
                                      />
                                    );
                                  })}
                                </>
                              )}
                            </DataBody>
                          </DataTable>

                          {rfqsGroups[key]?.length > 5 && (
                            <div>
                              <Collapse in={!!expanded[key]?.showMore}>
                                <DataTable
                                  className={`${classes.table} rfq-table`}
                                  gridClass={classes.tableAreas}
                                  gridAreasBreakpoint="xs"
                                >
                                  <DataBody>
                                    {rfqsGroups[key].slice(5).map((item: any, index: number) => {
                                      return (
                                        <RfqRow
                                          fillRow={isEven(index)}
                                          key={uuidv4()}
                                          rfq={item}
                                          isPartner={isPartner}
                                          rfqType={rfqType}
                                          // onOpenResponses={onOpenResponses(item.id)}
                                          // onMakeResponse={onOpenMakeResponse(item.id)}
                                          onCommentClick={onOpenCommentModal(item.id)}
                                        />
                                      );
                                    })}
                                  </DataBody>
                                </DataTable>
                              </Collapse>
                              <div className={classes.showMoreWrapper} onClick={handleShowMoreChange(key)}>
                                <div className={classes.showMoreButtonWrapper}>
                                  <ExpandMoreIcon
                                    className={clsx({
                                      [classes.showMoreArrow]: true,
                                      [classes.showMoreArrowActive]: expanded[key]?.showMore,
                                    })}
                                  />
                                  {expanded[key]?.showMore ? t("show_less") : t("show_more")}
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>
          )}

          {/* {!isRfqsLoading && ( */}
          {/*  <Table className={`${classes.table} rfq-table`}> */}
          {/*    <TableHead> */}
          {/*      <TableRow> */}
          {/*        {rfqTableHeaders.map((val) => ( */}
          {/*          <TableCell key={uuidv4()}> */}
          {/*            {!val.isSort ? ( */}
          {/*              t(val.label) */}
          {/*            ) : ( */}
          {/*              <TableSortLabel */}
          {/*                active={sortHeader && sortHeader.name === val.name} */}
          {/*                direction={orderDirection(val.name)} */}
          {/*                className={`${classes.tableSort} rfq-sort-${val.name}`} */}
          {/*                onClick={() => onOrderChange(val.name, orderDirection(val.name, true))} */}
          {/*              > */}
          {/*                {t(val.label)} */}
          {/*                {val.labelPostfix === "currency" ? `, ${currency.symbol}` : val.labelPostfix} */}
          {/*                {sortHeader && sortHeader.name === val.name ? ( */}
          {/*                  <span className={`${classes.visuallyHidden} rfq-sort-label-${val.name}`}> */}
          {/*                    {sort_direction === "desc" ? "sorted desc" : "sorted asc"} */}
          {/*                  </span> */}
          {/*                ) : null} */}
          {/*              </TableSortLabel> */}
          {/*            )} */}
          {/*          </TableCell> */}
          {/*        ))} */}
          {/*        <TableCell /> */}
          {/*      </TableRow> */}
          {/*    </TableHead> */}
          {/*    <TableBody> */}
          {/*      {!isRfqsLoading && !!rfqsItems.length && ( */}
          {/*        <> */}
          {/*          {rfqsItems.map((item) => { */}
          {/*            return ( */}
          {/*              <RfqRow */}
          {/*                key={item.id} */}
          {/*                rfq={item} */}
          {/*                isPartner={isPartner} */}
          {/*                rfqType={rfqType} */}
          {/*                onOpenResponses={onOpenResponses(item.id)} */}
          {/*                onMakeResponse={onOpenMakeResponse(item.id)} */}
          {/*                onCommentClick={onOpenCommentModal(item.id)} */}
          {/*              /> */}
          {/*            ); */}
          {/*          })} */}
          {/*        </> */}
          {/*      )} */}

          {/*      {!isRfqsLoading && !rfqsItems.length && (  */}
          {/*        <tr className={classes.tableContentWhiteSpace}>  */}
          {/*          <td colSpan={100}>  */}
          {/*            <h2>{t("not_found")}</h2>  */}
          {/*          </td> */}
          {/*        </tr> */}
          {/*      )} */}
          {/*    </TableBody> */}
          {/*  </Table> */}
          {/* )} */}
          {rfqs && rfqs.total_pages > 1 && (
            <Box p={4} display="flex" justifyContent="center">
              <Paginate pageCount={rfqs.total_pages} activePage={page} onPageChange={onPageChangeHandle} />
            </Box>
          )}
        </Card>
      </Box>

      {/* {!!openedResponses && <RfqResponses onClose={onCloseResponses} rfq={getRfqById(openedResponses)} />} */}
      {/* {!!makeResponse && ( */}
      {/*  <RfqMakeResponse */}
      {/*    onClose={onCloseMakeResponse} */}
      {/*    onDeleteRfqFromStore={onDeleteRfqFromStore} */}
      {/*    rfq={getRfqById(makeResponse)} */}
      {/*    profile={profile} */}
      {/*  /> */}
      {/* )} */}
      {!!openCommentModal && <RfqCommentModal onClose={onCloseCommentModal} rfq={getRfqById(openCommentModal)} />}
    </Page>
  );
}

export default Rfq;
