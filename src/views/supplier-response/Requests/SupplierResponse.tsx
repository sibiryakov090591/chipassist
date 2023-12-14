import React, { useEffect, useRef, useState } from "react";
import useAppTheme from "@src/theme/useAppTheme";
import Page from "@src/components/Page";
import { ResponseItem as IResponseItem, SellerRfqItem } from "@src/store/rfq/rfqTypes";
import clsx from "clsx";
import {
  getSupplierRfqs,
  sendRfqsResponse,
  exportSupplierRfqs,
  importSupplierRfqs,
  clearSupplierResponseData,
} from "@src/store/rfq/rfqActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppSelector from "@src/hooks/useAppSelector";
import Preloader from "@src/components/Preloader/Preloader";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  // Checkbox,
  CircularProgress,
  // FormControlLabel,
  // Tab,
  // Tabs,
  useMediaQuery,
  useTheme,
  Container,
  Tooltip,
} from "@material-ui/core";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import setUrl from "@src/utils/setUrl";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
// import { useStyles as useFiltersStyles } from "@src/components/FiltersBar/styles";
import FiltersContainer, {
  FilterPageSizeChoiceBar,
  FilterResultsBar,
  FilterHasResponseBar,
} from "@src/components/FiltersBar";
import Alert from "@material-ui/lab/Alert";
import importIcon from "@src/images/suppliers_response/import-icon-images.svg";
import exportIcon from "@src/images/suppliers_response/export_data.svg";
import HelpIcon from "@material-ui/icons/Help";
import { loadMiscAction, saveMiscAction, updateMiscAction } from "@src/store/misc/miscActions";
import Paginate from "@src/components/Paginate/Paginate";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { showRegisterModalAction } from "@src/store/alerts/alertsActions";
import constants from "@src/constants/constants";
import SupplierSelect from "@src/components/SupplierSelect/SupplierSelect";
// import FilterRegions from "@src/components/FiltersBar/FilterRegions";
// import * as countriesData from "@src/constants/countries";
import { format } from "date-fns";
import FilterCurrency from "@src/components/FiltersBar/FilterCurrency";
import useCurrency from "@src/hooks/useCurrency";
import { useStyles } from "./supplierResponseStyles";
import ResponseItem from "./ResponseItem/ResponseItem";

export interface ImportErrorItem {
  error: string;
  id: number;
  ["part number"]: string;
}

interface Filters {
  page: number;
  page_size: number;
  days: number;
  all: boolean;
  has_response: boolean;
  // countries: string[];
}

const SupplierResponse: React.FC = () => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  // const filtersClasses = useFiltersStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { currency, currencyPrice } = useCurrency();

  const page = useURLSearchParams("page", false, 1, false);
  const pageSize = useURLSearchParams("page_size", false, localStorage.getItem("rfq_response_page_size") || 15, false);
  // const days = useURLSearchParams("days", false, localStorage.getItem("rfq_responses_date_filter"), false);
  const hasResponse = useURLSearchParams(
    "has_response",
    false,
    localStorage.getItem("rfq_has_response_filter") || true,
    false,
  );
  // const all = useURLSearchParams("all", false, "true", false);

  const selectedPartner = useAppSelector((state) => state.profile.selectedPartner);
  const rfqs = useAppSelector((state) => state.rfq.rfqs);
  const rfqResponseData = useAppSelector((state) => state.rfq.rfqResponseData);
  const isLoading = useAppSelector((state) => state.rfq.rfqsLoading);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  const [items, setItems] = useState<{ [key: string]: IResponseItem[] }>(null);
  const [sending, setSending] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [validationError, setValidationError] = useState(false);
  // const [stopCheckingItemsLength, setStopCheckingItemsLength] = useState(false);
  const [fileUploadErrors, setFileUploadErrors] = useState<ImportErrorItem[]>([]);
  const [openPopper, setOpenPopper] = useState(false);
  const [openErrorsModal, setOpenErrorsModal] = useState(false);
  const [filters, setFilters] = useState<Filters>(null);

  useEffect(() => () => dispatch(clearSupplierResponseData()), []);

  useEffect(() => {
    const invalidSomeField = Object.values(rfqResponseData).some((i) => {
      const reqFields = [i.stock, i.price, i.datecode];
      return reqFields.some((field) => (typeof field === "string" ? !field.trim() : !field));
    });
    if (Object.keys(rfqResponseData).length) setDisabledSubmit(invalidSomeField);
    setValidationError(invalidSomeField);
  }, [rfqResponseData]);

  useEffect(() => {
    const setData = (res: any = null) => {
      const data = {
        page: (page ? +page : res?.data?.page) || 1,
        page_size: (pageSize ? +pageSize : res?.data?.page_size) || 15,
        all: false,
        days: 7,
        has_response: hasResponse !== null ? hasResponse === "true" : res?.data?.has_response || true,
        // countries: res?.data?.countries || [
        //   ...countriesData.africaCountries,
        //   ...countriesData.asiaPacificCountries,
        //   ...countriesData.europeCountries,
        //   ...countriesData.middleEastCountries,
        //   ...countriesData.northAmericaCountries,
        //   ...countriesData.southLatinAmericaCountries,
        // ],
      };
      if (!res?.data) {
        dispatch(saveMiscAction("rfq_response_filters", data));
      }
      setFilters(data);
      setUrl(navigate, "/supplier-response", data.page, data.page_size, {
        has_response: data.has_response,
      });
    };

    dispatch(loadMiscAction("rfq_response_filters"))
      .then((res: any) => {
        setData(res?.data);
      })
      .catch(() => {
        setData();
      });
  }, []);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(openPopper);
  useEffect(() => {
    prevOpen.current = openPopper;
  }, [openPopper]);

  useEffect(() => {
    if ((selectedPartner || selectedPartner === false) && filters) {
      dispatch(
        getSupplierRfqs(
          page,
          pageSize,
          false,
          7,
          selectedPartner === false ? false : selectedPartner.id,
          hasResponse,
          // filters.countries,
        ),
      ).then((data: any) => {
        if (data?.page !== Number(page)) {
          // In this case load last page
          setFilters((prev) => ({ ...prev, page: data?.total_pages }));
          setUrl(navigate, "/supplier-response", data?.total_pages, pageSize, {
            has_response: hasResponse,
          });
        }
      });
    }
  }, [selectedPartner, filters, forceUpdate]);

  useEffect(() => {
    if (rfqs.results && currency) {
      const newData: { [key: string]: IResponseItem[] } = {};
      ((rfqs.results as any) as SellerRfqItem[]).forEach((item) => {
        const groupName = format(new Date(item.created), "dd.MM.yyyy");
        const responseRfq = item.response_rfq || null;
        const responseItem = rfqResponseData[item.id];

        let selected_manufacturer = responseItem?.selected_manufacturer;
        if (!selected_manufacturer && responseRfq?.manufacturer?.id) {
          selected_manufacturer = responseRfq?.manufacturers?.find((i) => i.id === responseRfq.manufacturer?.id);
        }
        if (!selected_manufacturer && item.manufacturer?.id) {
          selected_manufacturer = responseRfq?.manufacturers?.find((i) => i.id === item.manufacturer?.id);
        }
        if (!selected_manufacturer && item.manufacturer?.id) {
          selected_manufacturer = responseRfq?.manufacturers?.length ? responseRfq?.manufacturers[0] : null;
        }

        const newItem: IResponseItem = {
          ...item,
          // index: filters?.page_size * (filters?.page - 1) + i + 1,
          stock: responseItem ? responseItem.stock : responseRfq?.your_quantity,
          price: responseItem
            ? responseItem.price
            : currencyPrice(responseRfq?.unit_price, responseRfq?.currency || "USD"),
          currency: currency.code,
          requested_price: {
            price: item.price,
            currency: item.currency,
          },
          alter_upc: responseItem ? responseItem.alter_upc || "" : responseRfq?.alter_upc || item.part_number || "",
          datecode: responseItem ? responseItem.datecode : responseRfq?.datecode || "",
          lead_time: responseItem ? responseItem.lead_time : responseRfq?.lead_time && Number(responseRfq.lead_time),
          comment: responseItem ? responseItem.comment : responseRfq?.datecode || "",
          selected_manufacturer,
          other_manufacturer_name: "",
        };

        // if (newItem.stock && newItem.price && newItem.datecode && newItem.lead_time) dispatch(saveResponse(newItem));
        if (!newData[groupName]) {
          newData[groupName] = [newItem];
        } else {
          newData[groupName] = [...newData[groupName], newItem];
        }
      });
      setItems(newData);
      // if (Object.keys(newData).length) setStopCheckingItemsLength(true);
    }
  }, [rfqs, currency]);

  // useEffect(() => {
  //   if (!stopCheckingItemsLength && items && !Object.keys(items).length) {
  //     onChangeDateFilter(null, 14);
  //     setStopCheckingItemsLength(true);
  //   }
  // }, [items]);

  // const onChangeDateFilter = (event: React.ChangeEvent<{}>, val: number) => {
  //   if (val !== filters?.days) {
  //     setFilters((prev) => ({ ...prev, page: 1, days: val }));
  //     localStorage.setItem("rfq_responses_date_filter", `${val}`);
  //   }
  // };

  const onPageChangeHandler = (data: Record<any, any>) => {
    if (!isLoading) {
      const value = data.selected + 1;
      setFilters((prev) => ({ ...prev, page: value }));
      setUrl(navigate, "/supplier-response", value, pageSize, {
        has_response: filters.has_response,
      });
      dispatch(
        updateMiscAction("rfq_response_filters", {
          data: {
            ...filters,
            page: value,
          },
        }),
      );
    }
  };

  // const onChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!isLoading) {
  //     setUrl(history, "/supplier-response", 1, pageSize, { all: e.currentTarget.checked, days: dateFilter });
  //     dispatch(
  //       getSupplierRfqs(
  //         page,
  //         pageSize,
  //         e.currentTarget.checked,
  //         dateFilter,
  //         selectedPartner === false ? false : selectedPartner.id,
  //       ),
  //     );
  //   }
  // };

  const onChangePageSize = (value: string) => {
    if (!isLoading) {
      setFilters((prev) => ({ ...prev, page: 1, page_size: +value }));
      setUrl(navigate, "/supplier-response", 1, +value, {
        has_response: filters.has_response,
      });
      dispatch(
        updateMiscAction("rfq_response_filters", {
          data: {
            ...filters,
            page: 1,
            page_size: +value,
          },
        }),
      );
    }
  };

  const onChangeHasResponses = (value: boolean) => {
    if (!isLoading) {
      localStorage.setItem("rfq_has_response_filter", `${value}`);
      setFilters((prev) => ({ ...prev, page: 1, has_response: value }));
      setUrl(navigate, "/supplier-response", 1, pageSize, {
        has_response: value,
      });
      dispatch(clearSupplierResponseData());
      dispatch(
        updateMiscAction("rfq_response_filters", {
          data: {
            ...filters,
            page: 1,
            has_response: value,
          },
        }),
      );
    }
  };

  // const onChangeCountries = (countries: string[]) => {
  //   setFilters((prev) => ({ ...prev, page: 1, countries }));
  //   setUrl(navigate, "/supplier-response", 1, pageSize, {
  //     has_response: hasResponse,
  //   });
  //   dispatch(clearSupplierResponseData());
  //   dispatch(
  //     updateMiscAction("rfq_response_filters", {
  //       data: {
  //         ...filters,
  //         page: 1,
  //         countries,
  //       },
  //     }),
  //   );
  // };

  const onSubmit = () => {
    if (selectedPartner) {
      setSending(true);
      setDisabledSubmit(true);
      setFileUploadErrors([]);
      dispatch(sendRfqsResponse(selectedPartner.id))
        .catch((error: any) => {
          setFileUploadErrors(error?.response?.data?.errors || []);
        })
        .finally(() => {
          setForceUpdate((prev) => !prev);
          setSending(false);
        });
    }
  };

  const beforeChangePartner = () => {
    dispatch(clearSupplierResponseData());
    setFileUploadErrors([]);
  };

  const onExportFile = () => {
    if (!selectedPartner) return null;

    if (openPopper) setOpenPopper(false);
    return dispatch(exportSupplierRfqs(filters.all, filters.days, selectedPartner && selectedPartner.id));
  };

  const onImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedPartner) return false;
    const file = e.currentTarget.files[0];
    if (!file) return false;

    if (fileUploadErrors) setFileUploadErrors([]);
    dispatch(importSupplierRfqs(selectedPartner && selectedPartner.id, file))
      .then(() => {
        setForceUpdate((prev) => !prev);
      })
      .catch((error: any) => {
        setForceUpdate((prev) => !prev);
        setFileUploadErrors(error?.response?.data?.errors || []);
        if (error?.response?.data?.errors) setOpenErrorsModal(true);
      });
    if (openPopper) setOpenPopper(false);
    return false;
  };

  const closeErrorsModal = () => setOpenErrorsModal(false);

  return (
    <Page title={"RFQ response"} description={"RFQ response"}>
      <Container maxWidth="xl">
        <div className={classes.main}>
          <Box className={classes.headerContainer} display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <h1 className={classes.title}>Please feedback your price and stock</h1>
              <SupplierSelect beforeChange={beforeChangePartner} />
            </Box>
            {!isSmDown && (
              <div className={classes.fileActions}>
                <Button
                  variant="outlined"
                  size="small"
                  className={classes.fileButton}
                  onClick={onExportFile}
                  disabled={!selectedPartner}
                >
                  <img src={exportIcon} alt="Export" />
                  Export to XLS
                </Button>
                <Button
                  variant="outlined"
                  component="label"
                  size="small"
                  className={classes.fileButton}
                  disabled={!selectedPartner}
                >
                  <img src={importIcon} alt="Import" />
                  Import from XLS
                  <input
                    onClick={(e: any) => {
                      e.target.value = null;
                      return false;
                    }}
                    onChange={onImportFile}
                    type="file"
                    accept=".xls, .xlsx, application/vnd.ms-excel"
                    hidden
                  />
                </Button>
              </div>
            )}
          </Box>
          {isAuthenticated && selectedPartner === false && (
            <Alert className={classes.alert} severity="warning">
              <div className={classes.alertTitle}>You can`t reply to requests as you are not a supplier</div>
            </Alert>
          )}
          {!isAuthenticated && (
            <Alert className={classes.alert} severity="warning">
              <div>
                <div className={classes.alertTitle}>Please sign in to see the details and be able to respond</div>
                <div style={{ fontSize: 13 }}>
                  If you don`t have a supplier`s account please{" "}
                  <span className={classes.regLink} onClick={() => dispatch(showRegisterModalAction())}>
                    register
                  </span>
                </div>
              </div>
              <div>
                <Button
                  component={Link}
                  to={"/auth/login"}
                  variant="contained"
                  color="primary"
                  className={clsx(appTheme.buttonCreate, classes.signIn)}
                >
                  Sign in
                </Button>
              </div>
            </Alert>
          )}
          {isSmDown && (
            <Box display="flex" justifyContent="flex-start" mt="6px">
              {/* <Box className={classes.dateFilter}> */}
              {/*  <Tabs value={filters?.days || 3} onChange={onChangeDateFilter}> */}
              {/*    <Tab disabled={isLoading} label="3 days" value={3} /> */}
              {/*    <Tab disabled={isLoading} label="7 days" value={7} /> */}
              {/*    <Tab disabled={isLoading} label="14 days" value={14} /> */}
              {/*  </Tabs> */}
              {/* </Box> */}
              <div className={classes.fileActions}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={clsx(appTheme.buttonPrimary, classes.fileButton)}
                  onClick={onExportFile}
                  disabled={!selectedPartner}
                >
                  Export to XLS
                </Button>
                <Button
                  component="label"
                  variant="contained"
                  color="primary"
                  size="small"
                  className={clsx(appTheme.buttonPrimary, classes.fileButton)}
                  disabled={!selectedPartner}
                >
                  Import from XLS
                  <input
                    onChange={onImportFile}
                    onClick={(e: any) => {
                      e.target.value = null;
                      return false;
                    }}
                    type="file"
                    accept=".xls, .xlsx, application/vnd.ms-excel"
                    hidden
                  />
                </Button>
              </div>
            </Box>
          )}
          <div
            className={clsx(commonClasses.filtersRow, commonClasses.filtersRowMargin, {
              // [classes.filtersRow]: !isSmDown
              [classes.filtersRow]: false,
            })}
          >
            {/* {!isSmDown && ( */}
            {/*  <Box className={classes.dateFilter}> */}
            {/*    <Tabs value={filters?.days || 3} onChange={onChangeDateFilter}> */}
            {/*      <Tab disabled={isLoading} label="3 days" value={3} /> */}
            {/*      <Tab disabled={isLoading} label="7 days" value={7} /> */}
            {/*      <Tab disabled={isLoading} label="14 days" value={14} /> */}
            {/*    </Tabs> */}
            {/*  </Box> */}
            {/* )} */}
            <FiltersContainer>
              <FilterResultsBar count={rfqs.count} />
              {/* <FormControlLabel */}
              {/*  className={filtersClasses.filterStockBar} */}
              {/*  disabled={isLoading} */}
              {/*  control={ */}
              {/*    <Checkbox */}
              {/*      className={appTheme.checkbox} */}
              {/*      checked={all.toString() === "true"} */}
              {/*      onChange={onChangeType} */}
              {/*      name="base_in_stock" */}
              {/*      disableRipple={true} */}
              {/*      disabled={isLoading} */}
              {/*    /> */}
              {/*  } */}
              {/*  label={"Show all"} */}
              {/* /> */}
              <FilterCurrency />
              <FilterHasResponseBar
                disable={isLoading}
                action={onChangeHasResponses}
                hasResponse={filters?.has_response}
              />
              {/* <FilterRegions action={onChangeCountries} selected={filters?.countries || []} /> */}
              <FilterPageSizeChoiceBar
                storageKey={"rfq_response_page_size"}
                action={onChangePageSize}
                disable={isLoading}
              />
            </FiltersContainer>
          </div>
          {isLoading && <Preloader title="Requests are loading..." />}
          {!isLoading && items && !Object.keys(items).length && (
            <div className={classes.empty}>Nothing has been found</div>
          )}
          {!isLoading && items && !!Object.keys(items).length && (
            <>
              {Object.entries(items).map((item) => {
                return (
                  <div key={item[0]} className={classes.group}>
                    <div className={classes.created}>
                      <span>{item[0]}</span>
                    </div>
                    {!isSmDown && (
                      <table className={classes.table}>
                        <thead>
                          <tr className={appTheme.tableHeader}>
                            {/* <th className={classes.thIndex}>#</th> */}
                            <th className={classes.thPartNumber}>Requested MPN</th>
                            <th className={classes.thQty}>
                              Requested <br /> quantity
                            </th>
                            <th className={classes.thQty}>
                              Required <br /> condition
                            </th>
                            {/* <th className={classes.thQty}>Leading offer</th> */}
                            <th>Your quantity</th>
                            <th>Unit price ({currency.symbol})</th>
                            <th className={classes.thYourMpn}>
                              Your MPN
                              <Tooltip
                                enterTouchDelay={1}
                                classes={{ tooltip: classes.tooltip }}
                                title={<div>You can specify your alternative MPN in this column</div>}
                              >
                                <HelpIcon className={classes.helpIcon} />
                              </Tooltip>
                            </th>
                            {constants.showManufacturerField && (
                              <th className={classes.thManufacturer}>Manufacturer</th>
                            )}
                            <th>Date code</th>
                            <th>Lead time (days)</th>
                            <th>Comment</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {item[1].map((i) => {
                            return (
                              <ResponseItem
                                key={i.id}
                                error={fileUploadErrors.find((err) => err.id === i.id)}
                                responseItem={i}
                                selectedPartner={selectedPartner}
                                wasSent={sending}
                              />
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                    {isSmDown &&
                      item[1].map((i) => {
                        return (
                          <ResponseItem
                            key={i.id}
                            error={fileUploadErrors.find((err) => err.id === i.id)}
                            responseItem={i}
                            isSmDown={isSmDown}
                            selectedPartner={selectedPartner}
                            wasSent={sending}
                          />
                        );
                      })}
                  </div>
                );
              })}
              {rfqs && rfqs.total_pages > 1 && (
                <Box paddingBottom={4} display="flex" justifyContent="center">
                  <Paginate
                    pageCount={rfqs.total_pages}
                    activePage={+page || filters?.page}
                    onPageChange={onPageChangeHandler}
                  />
                </Box>
              )}
              <div className={classes.sendButtonContainer}>
                <Button
                  disabled={
                    sending || isLoading || disabledSubmit || !selectedPartner || !Object.keys(rfqResponseData).length
                  }
                  onClick={onSubmit}
                  variant="contained"
                  className={clsx(appTheme.buttonCreate, classes.sendButton)}
                >
                  {sending && <CircularProgress className={classes.progressCircle} size="1.5em" />}
                  Send data
                </Button>
                {validationError && <div className={classes.notValidMessage}>Some required fields are not set</div>}
              </div>
            </>
          )}
        </div>
      </Container>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={commonClasses.modal}
        open={openErrorsModal}
        onClose={closeErrorsModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openErrorsModal}>
          <div style={{ textAlign: "start" }} className={commonClasses.paper}>
            <h3 className={classes.title}>Some of the responses were filled incorrectly!</h3>
            <h4>Fix them and send data again:</h4>
            {fileUploadErrors.map((err) => {
              return (
                <div key={err.id} className={classes.errorModalItem}>
                  <span>{err["part number"]}:</span> {err.error}
                </div>
              );
            })}
            <br />
            <Box display="flex" justifyContent="flex-end">
              <Button className={appTheme.buttonPrimary} color="primary" variant="contained" onClick={closeErrorsModal}>
                ok
              </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
    </Page>
  );
};

export default SupplierResponse;
