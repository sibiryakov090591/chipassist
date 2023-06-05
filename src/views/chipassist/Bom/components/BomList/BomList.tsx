import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import useAppDispatch from "@src/hooks/useAppDispatch";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Box,
  TableSortLabel,
  CircularProgress,
} from "@material-ui/core";
// import FilterNoneIcon from "@material-ui/icons/FilterNone";
// import CreateIcon from "@material-ui/icons/Create";
import { Link, useNavigate, NavigateFunction } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import useCurrency from "@src/hooks/useCurrency";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import {
  loadBomListThunk,
  deleteBomThunk,
  exportBomThunk,
  // readonlyBom,
  enableBomMerge,
  toggleMergeBom,
  disableBomMerge,
  loadMergeItemsThunk,
  setMergeItemMultiplier,
  loadBomListStart,
  createBomCopy,
} from "@src/store/bom/bomActions";

import Paginate from "@src/components/Paginate";
import { formatMoney } from "@src/utils/formatters";
import { authUserProfile } from "@src/store/authentication/authActions";
import ConfirmButton from "@src/components/ConfirmButton/ConfirmButton";
import useAppTheme from "@src/theme/useAppTheme";
import { v4 as uuidv4 } from "uuid";
import setUrl from "@src/utils/setUrl";
import Preloader from "@src/components/Preloader/Preloader";
import clsx from "clsx";
import DeleteButton from "@src/components/DeleteButton/DeleteButton";
import FiltersContainer, { FilterPageSizeChoiceBar, FilterResultsBar } from "@src/components/FiltersBar";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import useAppSelector from "@src/hooks/useAppSelector";
import { batch } from "react-redux";
import { BomListResult } from "@src/store/bom/bomTypes";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import FilterCurrency from "@src/components/FiltersBar/FilterCurrency";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import MoreButton from "../MoreButton/MoreButton";
import { useStyles } from "./styles";
// import BomEdit from "../BomViewNew/BomEdit";
import ResolveMergeModal from "./ResolveMergeModal/ResolveMergeModal";
import MergeBomModal from "./MergeBomModal/MergeBomModal";
import ResolveMergePartNumbers from "./ResolveMergePartNumbers/ResolveMergePartNumbers";

const bomListTableHeaders = [
  {
    label: "column.id",
    labelPostfix: "",
    name: "id",
    isSort: true,
  },
  {
    label: "column.name",
    labelPostfix: "",
    name: "name",
    isSort: true,
  },
  {
    label: "column.status",
    labelPostfix: "",
    name: "lastorder",
    isSort: false,
  },
  {
    label: "column.created",
    labelPostfix: "",
    name: "created",
    isSort: true,
  },
  {
    label: "column.total_price",
    labelPostfix: "currency",
    name: "cost",
    isSort: true,
  },
];

export const setBomListUrl = (navigate: NavigateFunction, page: number, pageSize: number) => {
  const params = [];
  if (page) {
    params.push(`page=${page}`);
  }
  if (pageSize) {
    params.push(`page_size=${pageSize}`);
  }

  navigate({
    pathname: "/bom/bom-list",
    search: params.length ? `?${params.join("&")}` : "",
  });
};

const BomList: React.FC = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const { t } = useI18n("bom");
  const { currency, currencyInitial, currencyPrice } = useCurrency();
  const navigate = useNavigate();

  const bomList = useAppSelector((state) => state.bom.bomList);
  const bomCopying = useAppSelector((state) => state.bom.copy?.copying);
  const isListLoading = useAppSelector((state) => state.bom.isBomListLoading);
  const mergeEnabled = useAppSelector((state) => state.bom.mergeEnabled);
  const mergeItems = useAppSelector((state) => state.bom.mergeItems);
  const mergeItemsLoading = useAppSelector((state) => state.bom.mergeItemsLoading);
  // eslint-disable-next-line no-underscore-dangle
  const _pageSize = useAppSelector((state) => state.search.pageSize);
  const shouldUpdateBackend = useAppSelector((state) => state.common.shouldUpdateBackend);

  const [bomListsForDelete, setBomListsForDelete] = useState([]);
  const [selectedLines, setSelectedLines] = useState([]);
  const [modalSubmitWasClicked, setModalSubmitWasClicked] = useState(false);

  const storageKey = "bomListShowBy";

  const page = +useURLSearchParams("page", false, 1, false) || 1;
  const pageSize = useURLSearchParams("page_size", false, localStorage.getItem(`${storageKey}`) || _pageSize, false);
  const orderBy = useURLSearchParams("order_by", false, localStorage.getItem("bomListOrderBy") || "id_desc", false);

  const [sort_name, sort_direction] = orderBy.split("_");
  const sortHeader = bomListTableHeaders.find((val) => val.name === sort_name);
  const items: BomListResult[] = bomList.results || [];

  useEffect(() => {
    dispatch(disableBomMerge());
  }, []);

  const onExportBOM = (id: number, eType: "csv" | "xls") => () => {
    dispatch(exportBomThunk(id, eType));
  };

  const reloadList = (page_size: number, in_page: number) => {
    const new_page = in_page || page;
    setBomListUrl(navigate, new_page, page_size);
    dispatch(loadBomListThunk(new_page, true, page_size));
  };

  // const getOrderHref = (order) => {
  //   const id = order ? order.id : 0;
  //   if (order && id > 0) {
  //     return `/orders?page=1&id=${id}&number=${order.number}`;
  //   }
  //   return "#";
  // };

  const onDeleteClick = () => () => {
    batch(() => {
      dispatch(loadBomListStart());
      dispatch(deleteBomThunk(bomListsForDelete, page, pageSize, orderBy));
      setSelectedLines([]);
      setBomListsForDelete([]);
    });
  };

  const onMoreSubmitOpen = (id: number) => () => {
    if (!mergeEnabled && !selectedLines.includes(id)) {
      selectedLines.push(+id);
      setSelectedLines([...selectedLines]);
    }
  };

  const onDeleteSubmitOpen = (id: number = null) => () => {
    if (id && selectedLines.every((bomId) => bomId !== +id)) {
      selectedLines.push(+id);
      setSelectedLines([...selectedLines]);
    }
    setBomListsForDelete(selectedLines);
  };

  const onDeleteSubmitClose = () => {
    batch(() => {
      setBomListsForDelete([]);
      setSelectedLines([]);
    });
  };

  const onPageChangeHandle = (data: any) => {
    if (!mergeEnabled) {
      setSelectedLines([]);
    }
    if (!isListLoading) {
      setUrl(navigate, "/bom/bom-list", data.selected + 1, pageSize, {
        order_by: orderBy,
      });
      dispatch(loadBomListThunk(data.selected + 1, true, pageSize, orderBy));
    }
  };

  const createCopy = (id: number, name: string) => () => {
    dispatch(createBomCopy(id, name));
  };

  const onMergeSelect = (lines: number[]) => () => {
    if (!mergeEnabled) {
      dispatch(enableBomMerge());
    }
    dispatch(toggleMergeBom(lines));
  };

  const onMergeUndo = () => {
    dispatch(disableBomMerge());
    if (modalSubmitWasClicked) {
      setModalSubmitWasClicked(false);
      navigate({
        pathname: `/bom/bom-list`,
        search: `?page=1&page_size=${pageSize}&order_by=id_desc`,
      });
      dispatch(loadBomListThunk(1, true, pageSize, "id_desc"));
    }
    setSelectedLines([]);
  };

  const onChangeMultiplier = (bomId: number) => (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setMergeItemMultiplier(bomId, parseInt(e.target.value) || null));
  };

  const onMerge = () => {
    dispatch(loadMergeItemsThunk());
  };

  useEffect(() => {
    if (!isListLoading) {
      dispatch(authUserProfile());
      dispatch(loadBomListThunk(page, true, pageSize, orderBy));
    }
    // eslint-disable-next-line
  }, [shouldUpdateBackend]);

  const orderDirection = (name: string, reverse: any = null) => {
    const isCurrentHeader = sortHeader && sortHeader.name === name;
    let order = isCurrentHeader ? (sort_direction as "desc" | "asc") : "asc";
    if (reverse && isCurrentHeader) order = order === "asc" ? "desc" : "asc";
    return order;
  };

  const onOrderChange = useCallback(
    (name, sort) => {
      const value = `${name}_${sort}`;
      localStorage.setItem("bomListOrderBy", value);
      setUrl(navigate, "/bom/bom-list", 1, pageSize, { order_by: value });
      dispatch(loadBomListThunk(page, true, pageSize, value));
    },
    [navigate, pageSize],
  );

  const onCheckHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const bomId = +e.target.value;
    if (e.target.checked) {
      selectedLines.push(bomId);
      setSelectedLines([...selectedLines]);
    } else {
      setSelectedLines(selectedLines.filter((i) => i !== bomId));
    }
    if (mergeEnabled) onMergeSelect([bomId])();
  };

  const onCheckAllHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      items.map((i) => {
        if (selectedLines.every((j) => j !== i.id)) {
          selectedLines.push(i.id);
        }
        return i;
      });
      setSelectedLines([...selectedLines]);
    } else {
      setSelectedLines([]);
    }
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <div className={clsx(commonClasses.filtersRow, commonClasses.filtersRowMargin)}>
          <FiltersContainer>
            <FilterResultsBar count={bomList?.count || 0} />
            <FilterCurrency />
            <FilterPageSizeChoiceBar storageKey={`${storageKey}`} action={reloadList} />
          </FiltersContainer>
        </div>
        {constants.id === ID_ICSEARCH && (
          <Box className={classes.hintList}>
            <p>- {t("hint_1")}</p>
            <p>- {t("hint_2")}</p>
          </Box>
        )}
        {mergeEnabled && (
          <Box mt={2}>
            <Alert
              severity="info"
              action={
                <Box display="flex" alignItems="center">
                  {mergeItemsLoading ? (
                    <span className={classes.mergeLoading}>
                      <CircularProgress className={classes.progressCircle} size="1.5em" />
                      {t("loading_items")}
                    </span>
                  ) : (
                    <Button
                      className={`${appTheme.buttonCreate} bom-merge-header-button`}
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={onMerge}
                    >
                      {t("merge_btn")}
                    </Button>
                  )}
                  <Button
                    className={appTheme.buttonCancel}
                    variant="contained"
                    size="small"
                    style={{ margin: "0 10px" }}
                    onClick={onMergeUndo}
                  >
                    {t("undo")}
                  </Button>
                </Box>
              }
            >
              <AlertTitle>
                <strong>{t("merging")}.</strong> {t("merging_alert")}.
              </AlertTitle>
              <div>
                <span>{t("check_bom_list")}: </span>
                {Object.keys(mergeItems).map((itemId) => {
                  if (mergeItems[itemId]) {
                    const bomData = items.filter((item) => item.id === +itemId);
                    if (bomData.length) {
                      return (
                        <span key={itemId} className={classes.selectedBom}>
                          {bomData[0].name}
                        </span>
                      );
                    }
                  }
                  return null;
                })}
              </div>
            </Alert>
          </Box>
        )}
        <Box>
          <Paper square className={`${classes.bomListPaper}`}>
            {(isListLoading || bomCopying) && (
              <Box display="flex" alignItems="center" justifyContent="center" padding={10}>
                <Preloader title={bomCopying ? "Copying..." : ""} />
              </Box>
            )}

            {!isListLoading && !bomCopying && (
              <Table size="small" className={clsx(classes.table, appTheme.table)}>
                <TableHead>
                  <TableRow className={appTheme.tableHeader}>
                    {items && !!items.length && (
                      <TableCell className="col-checkbox">
                        {!mergeEnabled && (
                          <Checkbox
                            className={classes.headerCheckbox}
                            checked={selectedLines.length === items.length}
                            onChange={onCheckAllHandler}
                          />
                        )}
                      </TableCell>
                    )}
                    {mergeEnabled && <TableCell>{t("merge_btn")}</TableCell>}

                    {bomListTableHeaders.map((val) => (
                      <TableCell key={uuidv4()} className={`col-${val.name}`}>
                        {!val.isSort ? (
                          t(val.label)
                        ) : (
                          <TableSortLabel
                            active={sortHeader && sortHeader.name === val.name}
                            direction={orderDirection(val.name)}
                            className={`${classes.tableSort} rfq-sort-${val.name}`}
                            onClick={() => onOrderChange(val.name, orderDirection(val.name, true))}
                          >
                            {t(val.label)}
                            {val.labelPostfix === "currency" ? `, ${currency?.symbol}` : val.labelPostfix}
                          </TableSortLabel>
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      {selectedLines.length > 1 && !mergeEnabled && (
                        <Box display="flex" alignItems="center" justifyContent="flex-end">
                          <Button
                            onClick={onMergeSelect(selectedLines)}
                            variant="contained"
                            color="primary"
                            className={clsx(classes.copyButton, appTheme.buttonCreate)}
                            size="small"
                            style={{ marginRight: 15 }}
                          >
                            {t("merge_btn")}
                          </Button>
                          {/* <div className={classes.mergeIconWrapper} onClick={onMergeSelect(selectedLines)}> */}
                          {/*  <FilterNoneIcon className={classes.mergeIcon} /> */}
                          {/* </div> */}
                          <div className={classes.deleteButton}>
                            <DeleteButton
                              onAction={onDeleteClick()}
                              onOpen={onDeleteSubmitOpen()}
                              onClose={() => setBomListsForDelete([])}
                            />
                          </div>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!isListLoading && !items.length && bomList.total_pages < 2 ? (
                    <tr className={classes.tableContentWhiteSpace}>
                      <td colSpan={100}>
                        <h2>
                          {t("no_saved_bom_lists")}
                          <br />
                          {t("you_can")}
                          <span
                            onClick={() => navigate({ pathname: "/bom/create-file" })}
                            className={classes.createBomLink}
                          >
                            {t("import")}
                          </span>
                          {t("list_from_file")}
                        </h2>
                      </td>
                    </tr>
                  ) : (
                    items.map((item) => (
                      <TableRow
                        key={item.id}
                        className={`${classes.bomListRow} ${appTheme.tableRow} ${
                          // eslint-disable-next-line no-nested-ternary
                          bomListsForDelete.some((i) => i === item.id)
                            ? classes.bomListRowRed
                            : selectedLines.some((i) => i === item.id)
                            ? classes.bomListRowGray
                            : ""
                        }`}
                      >
                        <TableCell className="col-checkbox">
                          <Checkbox
                            className={appTheme.checkbox}
                            checked={selectedLines.some((i) => +i === item.id)}
                            value={item.id}
                            onChange={onCheckHandler}
                          />
                        </TableCell>
                        {mergeEnabled && (
                          <TableCell className={classes.mergeColumn}>
                            <div className={classes.mergeColumnControls}>
                              <span className={classes.mergeMultiplierSign}>x</span>
                              <input
                                type="text"
                                value={mergeItems[item.id] ? mergeItems[item.id].multiplier : 1}
                                className={classes.mergeMultiplier}
                                disabled={!mergeItems[item.id] || !mergeItems[item.id].checked}
                                onChange={onChangeMultiplier(item.id)}
                              />
                            </div>
                          </TableCell>
                        )}
                        <TableCell className="col-id">{item.id}</TableCell>
                        <TableCell className={classes.name}>
                          <Link to={`/bom/${item.id}`} className={appTheme.hyperlink}>
                            <div className={classes.bomName}>{item.name}</div>
                          </Link>
                        </TableCell>
                        <TableCell className={classes.status}>
                          <span className={classes.statusValue}>
                            {item.order?.number ? t("bom.column.status_value") : ""}
                            {item.readonly && t("bom.column.status_value")}
                          </span>
                        </TableCell>
                        <TableCell className={classes.created}>{new Date(item.created).toLocaleString()}</TableCell>
                        <TableCell className={classes.cost}>
                          {item.cost ? formatMoney(currencyPrice(+item.cost, currencyInitial?.code)) : ""}
                        </TableCell>
                        <TableCell align="right">
                          <Box display="flex" alignItems="center" justifyContent="flex-end">
                            <div className={`bom-item-actions col-menu`}>
                              <MoreButton
                                onExportCsv={onExportBOM(item.id, "csv")}
                                onExportXls={onExportBOM(item.id, "xls")}
                                onMerge={!mergeEnabled && onMergeSelect(selectedLines)}
                                onOpen={onMoreSubmitOpen(item.id)}
                                readonly={item.readonly}
                              />
                            </div>
                            <Button
                              onClick={createCopy(item.id, item.name)}
                              variant="contained"
                              color="primary"
                              className={`${clsx(classes.copyButton, appTheme.buttonPrimary)} col-menu`}
                              size="small"
                              style={{ marginRight: 15 }}
                            >
                              {t("bom.column.new_order_btn")}
                            </Button>
                            <div className={classes.deleteButton}>
                              {!mergeEnabled && selectedLines.length < 2 && (
                                <ConfirmButton
                                  onAction={onDeleteClick()}
                                  onOpen={onDeleteSubmitOpen(item.id)}
                                  onClose={onDeleteSubmitClose}
                                  question={t("delete_bom")}
                                />
                              )}
                            </div>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Box>
        {bomList && bomList.total_pages > 1 && (
          <Box p={4} display="flex" justifyContent="center">
            <Paginate pageCount={bomList.total_pages} activePage={page} onPageChange={onPageChangeHandle} />
          </Box>
        )}
      </React.Fragment>

      {mergeEnabled && (
        <React.Fragment>
          <ResolveMergeModal onClose={onMergeUndo} />
          <MergeBomModal onClose={onMergeUndo} onView={(id) => `/bom/${id}`} submitHandle={setModalSubmitWasClicked} />
          <ResolveMergePartNumbers onClose={onMergeUndo} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default BomList;
