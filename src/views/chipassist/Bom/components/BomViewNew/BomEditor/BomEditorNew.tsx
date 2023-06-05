import React, { useState, useEffect, useRef, useMemo, ChangeEvent } from "react";
import {
  Box,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  CircularProgress,
  TableBody,
  Typography,
  Checkbox,
} from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";

import {
  deleteBomThunk,
  updateBomLineThunk,
  createBomCopy,
  exportBomThunk,
  saveBomNameThunk,
} from "@src/store/bom/bomActions";
import useCurrency from "@src/hooks/useCurrency";
import { formatMoney } from "@src/utils/formatters";
import useHiddenColumns from "@src/components/Table/HiddenColumns/useHiddenColumns";
import useAppTheme from "@src/theme/useAppTheme";
import ConfirmButton from "@src/components/ConfirmButton/ConfirmButton";

import clsx from "clsx";
import { getCostAndQuantity, isProductAvailable } from "@src/utils/product";
import { Paginate } from "@src/components";
import Preloader from "@src/components/Preloader/Preloader";
import useAppSelector from "@src/hooks/useAppSelector";
import { BomFields, EditorBomData, Row, Groups, BomGroup } from "@src/store/bom/bomTypes";
import SetsModal from "@src/views/chipassist/Bom/components/BomViewNew/BomEditor/SetsModal/SetsModal";
import Sticky from "react-sticky-el";
import BomTableRowNew from "@src/views/chipassist/Bom/components/BomViewNew/BomEditor/BomTableRow/BomTableRowNew";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import TableHeadLabel, { parseOrderValues } from "../../TableHeadLabel/TableHeadLabel";
import { useStyles } from "./style";
import CheckoutModal from "./CheckoutModal/CheckoutModal";
import MoreButton from "../../MoreButton/MoreButton";

interface TableHeadLabels {
  label: string;
  labelPostfix: string;
  name: string;
  hasSort: boolean;
  isHideable: boolean;
  isRequired: boolean;
  isShowDefault?: boolean;
}

interface Props {
  title: string;
  bom: EditorBomData;
  actionText: string;
  page: number;
  pageSize: number;
  rowsType: string;
  renderPageSizeSelect: (className: string, bom: BomFields) => JSX.Element;
  onChangeOrderBy: (value: string) => void;
  orderByValue: string;
  renderRowsType: () => JSX.Element;
}

export const tableHeadLabels: TableHeadLabels[] = [
  {
    label: "column.number",
    labelPostfix: "",
    name: "id",
    hasSort: false,
    isHideable: false,
    isShowDefault: true,
    isRequired: false,
  },
  {
    label: "column.part_number_bom_view",
    labelPostfix: "",
    name: "partnumber",
    hasSort: false,
    isHideable: false,
    isShowDefault: true,
    isRequired: false,
  },
  {
    label: "column.qty",
    labelPostfix: "",
    name: "quantity",
    hasSort: false,
    isHideable: false,
    isShowDefault: true,
    isRequired: false,
  },
  {
    label: "",
    labelPostfix: "",
    name: "stock",
    hasSort: false,
    isHideable: false,
    isShowDefault: true,
    isRequired: false,
  },
  {
    label: "column.status",
    labelPostfix: "",
    name: "status",
    hasSort: false,
    isHideable: false,
    isShowDefault: true,
    isRequired: false,
  },
];

const BomEditor: React.FC<Props> = (props) => {
  const { renderPageSizeSelect, onChangeOrderBy, orderByValue } = props;

  const dispatch = useAppDispatch();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();

  const page = props.page || 1;
  const pageSize = props.pageSize || 25;
  const tableRef = useRef(null);
  const { currencyPrice } = useCurrency();
  const { t } = useI18n("bom");

  const [bom, setBom] = useState<EditorBomData>({ ...props.bom });
  const [loaded, setLoaded] = useState(false);
  const itemsQtyRef = useMemo(() => ({ ...props.bom }), []); // For sets
  // const [productsNeedUpdate, setProductsNeedUpdate] = useState(false);
  const [order, setOrder] = useState<string>(orderByValue ? parseOrderValues(orderByValue)[1] : "asc");
  const [orderBy, setOrderBy] = useState(
    orderByValue &&
      tableHeadLabels
        .filter((v) => v.hasSort)
        .map((v) => v.name)
        .includes(parseOrderValues(orderByValue)[0])
      ? parseOrderValues(orderByValue)[0]
      : "part_number_ref",
  );
  const [sets, setSets] = useState(1);
  const [stickyColumnsWidth, setStickyColumnsWidth] = useState([]);
  const [isActiveSticky, setIsActiveSticky] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [paginationGroups, setPaginationGroups] = useState<Array<[string, BomGroup]>>([]);
  const [groups, setGroups] = useState<Groups>(null);
  const [qtyDebounce, setQtyDebounce] = useState(null);
  const [partNumberDebounce, setPartNumberDebounce] = useState(null);
  const [currentPage, setCurrentPage] = useState(page || 1);
  const [openSetsModal, setOpenSetsModal] = useState(false);
  const [disabledNameBtn, setDisabledNameBtn] = useState(true);
  const [disabledSetsBtn, setDisabledSetsBtn] = useState(true);
  const [disabledCheckbox, setDisabledCheckbox] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [bomName, setBomName] = useState<string>(props.bom.name);
  const isCoping = useAppSelector((state) => state.bom.copy?.copying);

  const hiddenDefault = tableHeadLabels.reduce((acc, val) => {
    if (!val.isShowDefault) return { ...acc, [val.label]: true };
    return acc;
  }, {});

  const { RenderHideLabel } = useHiddenColumns("bomHiddenColumns", hiddenDefault, "bom");

  const rows: Row[] = useMemo(() => {
    return Object.keys(bom.items).map((key) => {
      return {
        ...bom.items[key],
        key,
      };
    });
  }, [bom.items]);

  useEffect(() => {
    if (tableRef && tableRef.current) {
      const thWidths = Array.from(tableRef.current.querySelectorAll("th")).map((th: any) => th.offsetWidth);
      setStickyColumnsWidth(thWidths);
    }
  }, [tableRef.current]);

  useEffect(() => {
    const newData: Groups = {};
    let index = 1;
    rows
      .sort((a, b) => a.order_ref - b.order_ref)
      .forEach((row) => {
        newData[row.key] = { index, items: [row] };
        index += 1;
      });
    setGroups(newData);
    setLoaded(true);
  }, [rows]);

  useEffect(() => {
    setBom((prev) => {
      const newItems = Object.fromEntries(
        // Update only errors and stockrecord of lines
        Object.entries(props.bom?.items).map((item) => {
          const [key, value] = item;
          return [key, { ...prev.items[key], errors: value.errors, stockrecord: value.stockrecord }];
        }),
      );

      return prev.id !== props.bom.id
        ? { ...props.bom }
        : {
            ...prev,
            items: newItems,
          };
    });
  }, [props.bom]);

  useEffect(() => {
    if (groups) {
      const newData = Object.entries(groups).sort((a, b) => a[1].index - b[1].index);
      setPaginationGroups(newData.slice((currentPage - 1) * pageSize, pageSize * currentPage));
    }
  }, [currentPage, pageSize, groups]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  const onChangeBomField = (key: string, field: string) => (e: ChangeEvent<HTMLInputElement>, frontendOnly = false) => {
    const { value } = e.target;
    let resultValue: number | string = value;
    if (field === "quantity") {
      resultValue = !parseInt(value) ? 0 : parseInt(value);
    }
    setBomFieldValue(key, field, resultValue, frontendOnly);
  };

  const setBomFieldValue = (key: string, field: string, value: any, frontendOnly = false) => {
    const newData: any = {
      [field]: value,
    };
    if (field === "part_number") newData.stockrecord = null;

    setBom((prevState) => {
      return {
        ...prevState,
        items: {
          ...prevState.items,
          [key]: {
            ...prevState.items[key],
            ...newData,
          },
        },
      };
    });

    if (!frontendOnly && bom.items[key]) {
      const lineData: { [key: string]: any } = { id: bom.items[key].id, rowKey: key, ...newData };
      return dispatch(updateBomLineThunk(bom.id, lineData));
    }
    return Promise.resolve();
  };

  const onPageChange = (data: any) => {
    window.scrollTo({ top: 140 });
    setCurrentPage(data.selected + 1);
  };

  // eslint-disable-next-line no-shadow
  const onSortClick = (column: string) => {
    // eslint-disable-next-line no-nested-ternary
    const new_order = orderBy !== column ? "asc" : order === "asc" ? "desc" : "asc";
    setOrder(new_order);
    setOrderBy(column);
    if (onChangeOrderBy) {
      onChangeOrderBy(`${column}_${new_order}`);
    }
  };

  const onChangeSets = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabledSetsBtn) setDisabledSetsBtn(false);

    const value = e.target.value.replace(/\D/gi, "");
    setSets(+value);
  };

  const onApplyBomSets = () => {
    if (!localStorage.getItem("hide_bom_sets_modal") && !openSetsModal) {
      return setOpenSetsModal(true);
    }

    if (sets <= 0) return false;
    rows.map((item) => {
      const quantity_ref = itemsQtyRef.items[item.key]?.quantity_ref || 1;
      setBomFieldValue(item.key, "quantity", quantity_ref === 1 ? sets : quantity_ref * sets);
      return item;
    });
    setDisabledSetsBtn(true);
    setOpenSetsModal(false);
    return true;
  };

  const handleAddToCart = () => {
    setConfirmModalOpen(true);
  };

  const onExportBOM = (id: number, eType: "csv" | "xls") => () => {
    dispatch(exportBomThunk(id, eType));
  };

  const onApproveAllItems = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (!bom.items) return false;
    setDisabledCheckbox(true);
    const promises: any = [];
    rows.forEach((item) => {
      if (item.quantity > 0 && item.part_number && !item.errors && item.approved !== checked)
        promises.push(setBomFieldValue(item.key, "approved", checked));
    });
    return Promise.all(promises).finally(() => setDisabledCheckbox(false));
  };

  const TableHeader = (columnsWidth: number[] = []) => {
    return (
      <TableHead>
        <TableRow className={`${appTheme.trTh} ${classes.trTh}`}>
          {tableHeadLabels
            // .filter((th) => !hiddenColumns[th.label])
            .map((label, index) => {
              return (
                <TableCell
                  key={label.name}
                  className={clsx({
                    [classes.quantityTh]: label.name === "quantity",
                    [classes.statusTh]: label.name === "status",
                    [classes.numInStockTh]: label.name === "stock",
                  })}
                  style={{ width: columnsWidth[index] && `${columnsWidth[index]}px` }}
                >
                  <TableHeadLabel
                    labelOptions={label}
                    order={order}
                    orderBy={orderBy}
                    onSort={onSortClick}
                    HideComponent={RenderHideLabel}
                    mode={null}
                  />
                </TableCell>
              );
            })}

          {!bom.readonly && (
            <TableCell style={{ textAlign: "center", width: 60, padding: 0 }}>
              <Checkbox
                className={classes.headerCheckbox}
                onChange={onApproveAllItems}
                checked={!rows.some((item) => !item.errors && !item.approved)}
                name="approved"
                disabled={disabledCheckbox}
              />
            </TableCell>
          )}
        </TableRow>
      </TableHead>
    );
  };

  const onCloseModal = () => {
    setConfirmModalOpen(!confirmModalOpen);
  };

  const onDeleteBomEdit = () => {
    dispatch(deleteBomThunk([bom.id]));
  };

  const createCopy = (id: number, name: string) => () => {
    dispatch(createBomCopy(id, name));
  };

  const qtyChangeHandler = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    e.persist();

    onChangeBomField(key, "quantity")(e, true);
    if (qtyDebounce) clearTimeout(qtyDebounce);
    const timeoutID = setTimeout(() => onChangeBomField(key, "quantity")(e, false), 800);
    setQtyDebounce(timeoutID);

    // set approved false before
    const item = bom.items[key];
    if (item.approved) {
      setBomFieldValue(key, "approved", false, false);
    }
  };

  const partNumberChangeHandler = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    e.persist();

    onChangeBomField(key, "part_number")(e, true);
    if (partNumberDebounce) clearTimeout(partNumberDebounce);
    const timeoutID = setTimeout(() => {
      if (e.target.value) onChangeBomField(key, "part_number")(e, false);
    }, 800);
    setPartNumberDebounce(timeoutID);

    // set approved false before
    const item = bom.items[key];
    if (item.approved) {
      setBomFieldValue(key, "approved", false, false);
    }
  };

  const toggleRfqApproved = (items: Row[]) => () => {
    items.forEach((item) => setBomFieldValue(item.key, "approved", !item.approved));
  };

  const totalPages = useMemo(() => {
    return Math.ceil((groups ? Object.keys(groups).length : 1) / pageSize);
  }, [groups, pageSize]);

  const onChangeBomName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (disabledNameBtn && value.trim()) setDisabledNameBtn(false);
    if (!disabledNameBtn && !value.trim()) setDisabledNameBtn(true);

    setBomName(value);
  };

  const onSaveNameHandler = () => {
    const name = bomName.trim().replace(/\s{2,}/gi, " ");
    setDisabledNameBtn(true);
    dispatch(saveBomNameThunk(bom.id, name)).then(() => {
      dispatch(
        showBottomLeftMessageAlertAction({
          text: `${t("edit.bom_name_saved")}`,
          severity: "success",
        }),
      );
    });
  };

  const onStickyFixedToggle = (opened: boolean) => {
    if (!opened) return setIsActiveSticky(false);

    if (tableRef && tableRef.current) {
      const thWidths = Array.from(tableRef.current.querySelectorAll("th")).map((th: any) => th.offsetWidth);
      setStickyColumnsWidth(thWidths);
      setIsActiveSticky(true);
    }
    return true;
  };

  return (
    <div>
      {!loaded && <Preloader title={t("bom.opening_page")} />}
      {loaded && (
        <>
          <div className={classes.headerButtonsWrap}>
            <MoreButton
              buttonVariant="button"
              type="bomEdit"
              buttonClassName={clsx(classes.headerButton, classes.exportBom)}
              onExportCsv={onExportBOM(bom.id, "csv")}
              onExportXls={onExportBOM(bom.id, "xls")}
              readonly={bom.readonly}
            >
              {t("common.export")}
            </MoreButton>
            <ConfirmButton
              onAction={onDeleteBomEdit}
              theme="button"
              type="bomEdit"
              className={clsx(classes.headerButton, classes.deleteBom)}
              question={t("bom.delete_bom")}
              caption={t("bom.delete_bom")}
            />
          </div>

          <Sticky className={classes.stickyContainer} topOffset={50} onFixedToggle={onStickyFixedToggle}>
            <div className={classes.actionsContainer}>
              <Box display="flex" justifyContent="space-between">
                <div></div>
                <div className={classes.rightControls}>
                  {!!renderPageSizeSelect && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {t("common.show_by")}:
                      <div style={{ marginLeft: 10 }}>{renderPageSizeSelect(classes.pageSizeSelect, bom)}</div>
                    </div>
                  )}
                </div>
              </Box>

              <Box mt={1} mb={1} className={classes.headerSection}>
                <Box className={classes.headerNameSection}>
                  {bom.readonly ? (
                    <Typography className={classes.headerName} variant="h4" component="h4">
                      {bom.name}
                    </Typography>
                  ) : (
                    <Box display="flex">
                      <TextField
                        id="bom name"
                        name="bom_name"
                        label={`${t("bom.edit.bom_name")}*`}
                        type="text"
                        onChange={onChangeBomName}
                        fullWidth
                        variant="outlined"
                        className={classes.bomName}
                        value={bomName}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={clsx(classes.bomSetsApply, appTheme.buttonCreate)}
                        onClick={onSaveNameHandler}
                        disabled={disabledNameBtn || !bom.name}
                      >
                        {t("bom.edit.save")}
                      </Button>
                    </Box>
                  )}
                  {!bom.readonly && (
                    <React.Fragment>
                      <Box display="flex">
                        <TextField
                          id="bom sets"
                          name="bom_sets"
                          label={t("bom.edit.sets")}
                          type="text"
                          onChange={onChangeSets}
                          variant="outlined"
                          className={classes.bomSets}
                          value={sets}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          className={clsx(classes.bomSetsApply, appTheme.buttonCreate)}
                          disabled={sets <= 0 || disabledSetsBtn}
                          onClick={onApplyBomSets}
                        >
                          {t("bom.edit.apply")}
                        </Button>
                      </Box>
                    </React.Fragment>
                  )}
                </Box>
                <Box className={classes.headerActions}>
                  {bom.readonly ? (
                    <Button
                      onClick={createCopy(bom.id, bom.name)}
                      variant="contained"
                      color="primary"
                      className={`${classes.yellowBtn} ${classes.topBtn}`}
                      style={{ marginRight: 0 }}
                      size="small"
                      disabled={isCoping}
                    >
                      {isCoping && <CircularProgress className={commonClasses.progressCircle} size="1.5em" />}
                      {t("bom.column.new_order_btn")}
                    </Button>
                  ) : (
                    <Button
                      style={{ marginRight: 0 }}
                      variant="contained"
                      size="small"
                      onClick={handleAddToCart}
                      className={`${appTheme.buttonCreate} ${classes.topBtn}`}
                      disabled={isSending || !rows.some((i) => i.approved === true)}
                    >
                      {isSending && <CircularProgress className={commonClasses.progressCircle} size="1.5em" />}
                      {isSending ? t("common.sending") : t("bom.edit.add_to_cart_btn")}
                    </Button>
                  )}
                </Box>
              </Box>
            </div>
            <Table size="medium" className={classes.table} style={{ display: isActiveSticky ? "table" : "none" }}>
              {TableHeader(stickyColumnsWidth)}
            </Table>
          </Sticky>

          {bom && !!Object.entries(bom.items).length && (
            <div style={{ overflowX: "auto" }}>
              <Table id="bom-list-table" size="medium" className={classes.table} ref={tableRef}>
                {TableHeader()}
                <TableBody>
                  {paginationGroups.map((groupItem) => {
                    const [groupKey, group] = groupItem;
                    if (!group) return false;
                    const { index, items } = group;

                    const itemsData = items.map((item: Row) => {
                      let stockrecord;
                      if (bom.stockrecords[item.key]?.items?.length) {
                        const filteredStockrecords = bom.stockrecords[item.key].items.filter(
                          (v) => v?.id === item.stockrecord,
                        );
                        if (filteredStockrecords.length) {
                          const val = filteredStockrecords[0];
                          stockrecord = val;
                        }
                      }
                      const PNQ = getCostAndQuantity(item.quantity, stockrecord);
                      const minQty = PNQ ? PNQ.moq || 1 : 1;
                      const unitPrice = PNQ && PNQ.price ? PNQ.price.price || 0 : 0;
                      const isAvaible = isProductAvailable(stockrecord, item.quantity || 0);
                      const costNum = parseFloat(unitPrice) * +item.quantity;
                      const cost = costNum ? formatMoney(currencyPrice(costNum, stockrecord?.price_currency)) : "";

                      return {
                        id: item.id,
                        stockrecord,
                        minQty,
                        unitPrice,
                        isAvaible,
                        costNum,
                        cost,
                      };
                    });

                    return (
                      <BomTableRowNew
                        key={groupKey}
                        index={index}
                        items={items}
                        itemsData={itemsData}
                        readonly={bom.readonly}
                        qtyChangeHandler={qtyChangeHandler}
                        partNumberChangeHandler={partNumberChangeHandler}
                        toggleRfqApproved={toggleRfqApproved(items)}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
          {totalPages > 1 && (
            <Box className={classes.pagination}>
              <Paginate pageCount={totalPages} activePage={currentPage} onPageChange={onPageChange} />
            </Box>
          )}
          {confirmModalOpen && <CheckoutModal onCloseModal={onCloseModal} bom={bom} setIsSending={setIsSending} />}
          {openSetsModal && (
            <SetsModal onConfirmHandler={onApplyBomSets} onCloseHandler={() => setOpenSetsModal(false)} />
          )}
        </>
      )}
    </div>
  );
};

export default BomEditor;
