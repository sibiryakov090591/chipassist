import React, { useState, useEffect } from "react";
import Page from "@src/components/Page";
import { Button, Container, Box } from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { loadSupplierStatistics } from "@src/store/supplierStatistics/statisticsActions";
import { Partner } from "@src/store/profile/profileTypes";
import Preloader from "@src/components/Preloader/Preloader";
import { useStyles as useRequestsStyles } from "@src/views/supplier-response/Requests/supplierResponseStyles";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import { loadMiscAction, saveMiscAction, updateMiscAction } from "@src/store/misc/miscActions";
import SupplierSelect from "@src/views/supplier-response/Requests/SupplierSelect/SupplierSelect";
import Alert from "@material-ui/lab/Alert";
import { showRegisterModalAction } from "@src/store/alerts/alertsActions";
import { Link } from "react-router-dom";
import clsx from "clsx";
import useAppTheme from "@src/theme/useAppTheme";
import { clearSupplierResponseData } from "@src/store/rfq/rfqActions";
import { ResponseItem as IResponseItem } from "@src/store/supplierStatistics/statisticsTypes";
import FiltersContainer, { FilterPageSizeChoiceBar, FilterResultsBar } from "@src/components/FiltersBar";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { v4 as uuid } from "uuid";
import { DataHeader, DataTable, DataRow, DataField, DataValue, DataBody } from "@src/components/DataTable/DataTable";
import { useStyles } from "./statisticsStyles";
import Paginate from "../../../components/Paginate";
import StatisticItem from "./components/StatisticItem/StatisticItem";

interface Filters {
  page: number;
  page_size: number;
}

const Statistics: React.FC = () => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const requestsClasses = useRequestsStyles();
  const dispatch = useAppDispatch();

  const page = useURLSearchParams("page", false, 1, false);
  const pageSize = useURLSearchParams("page_size", false, localStorage.getItem("supplier_statistic_page_size"), false);

  const { isLoading, data } = useAppSelector((state) => state.supplierStatistics);
  const partners = useAppSelector((state) => state.profile.profileInfo?.partners);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const currency = useAppSelector((state) => state.currency.selected);

  const [selectedPartner, setSelectedPartner] = useState<Partner | false>(null);
  const [filters, setFilters] = useState<Filters>(null);
  const [items, setItems] = useState<{ [key: string]: IResponseItem[] }>({});

  useEffect(() => {
    dispatch(loadMiscAction("supplier_statistic_filters")).finally((res: any) => {
      const newFilters = {
        page: (page ? +page : res?.data?.page) || 1,
        page_size: (pageSize ? +pageSize : res?.data?.page_size) || 15,
      };
      if (!res?.data) {
        dispatch(saveMiscAction("supplier_statistic_filters", newFilters));
      }
      setFilters(newFilters);
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      let partner: Partner | boolean = false;
      if (partners?.length) {
        partner =
          partners.find((p) => p.name === "Test Demo Supplier") ||
          partners.find((p) => p.name === localStorage.getItem("selected_supplier")) ||
          partners[0];
      }
      setSelectedPartner(partner);
    } else {
      setSelectedPartner(null);
    }
  }, [partners, isAuthenticated]);

  useEffect(() => {
    if (selectedPartner && filters) {
      dispatch(loadSupplierStatistics(filters.page, filters.page_size, selectedPartner.id));
    }
  }, [selectedPartner, filters]);

  useEffect(() => {
    if (data) {
      const newData = data.results.reduce((acc: { [key: string]: IResponseItem[] }, item) => {
        const groupName = new Date(item.date).toLocaleDateString();
        return { ...acc, [groupName]: acc[groupName] ? [...acc[groupName], item] : [item] };
      }, {});
      setItems(newData);
    }
  }, [data]);

  const onChangePartner = (id: number) => {
    const partner = partners?.find((p) => p.id === id);
    if (partner) {
      setSelectedPartner(partner);
      localStorage.setItem("selected_supplier", partner.name);
      dispatch(clearSupplierResponseData());
    }
  };

  const onChangePageSize = (value: string) => {
    if (!isLoading) {
      setFilters((prev) => ({ ...prev, page: 1, page_size: +value }));
      dispatch(
        updateMiscAction("supplier_statistic_filters", {
          data: {
            ...filters,
            page: 1,
            page_size: value,
          },
        }),
      );
    }
  };

  const onPageChangeHandler = (value: Record<any, any>) => {
    if (!isLoading) {
      setFilters((prev) => ({ ...prev, page: value.selected + 1 }));
      dispatch(
        updateMiscAction("supplier_statistic_filters", {
          data: {
            ...filters,
            page: value.selected + 1,
          },
        }),
      );
    }
  };

  return (
    <Page title={"Statistic"} description={"Statistic of supplier responses"}>
      <section className={classes.section}>
        <Container maxWidth="xl">
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <h1 className={requestsClasses.title}>Statistic of your responses</h1>
            {selectedPartner && (
              <div className={clsx(requestsClasses.supplier, { flexible: partners?.length > 1 })}>
                You are logged in as{" "}
                {partners?.length > 1 ? (
                  <SupplierSelect
                    selectedPartner={selectedPartner}
                    partners={partners}
                    onChangePartner={onChangePartner}
                  />
                ) : (
                  <strong>{selectedPartner.name}</strong>
                )}{" "}
                supplier
              </div>
            )}
          </Box>
          {isAuthenticated && selectedPartner === false && (
            <Alert className={requestsClasses.alert} severity="warning">
              <div className={requestsClasses.alertTitle}>You have no statistic info as you are not a supplier</div>
            </Alert>
          )}
          {!isAuthenticated && (
            <Alert className={requestsClasses.alert} severity="warning">
              <div>
                <div className={requestsClasses.alertTitle}>
                  Please sign in to see your statistic and be able to respond
                </div>
                <div style={{ fontSize: 13 }}>
                  If you don`t have a supplier`s account please{" "}
                  <span className={requestsClasses.regLink} onClick={() => dispatch(showRegisterModalAction())}>
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
                  className={clsx(appTheme.buttonCreate, requestsClasses.signIn)}
                >
                  Sign in
                </Button>
              </div>
            </Alert>
          )}

          <div className={clsx(commonClasses.filtersRow, commonClasses.filtersRowMargin)}>
            <FiltersContainer>
              <FilterResultsBar count={data?.total_count} />
              <FilterPageSizeChoiceBar
                storageKey={"supplier_statistic_page_size"}
                action={onChangePageSize}
                disable={isLoading}
              />
            </FiltersContainer>
          </div>

          {isAuthenticated && isLoading && (
            <Box mt={4} mb={4}>
              <Preloader title="Statistic are loading..." />
            </Box>
          )}
          {(!isAuthenticated || (!isLoading && !Object.keys(items).length)) && (
            <div className={classes.empty}>You have not responded to any requests yet</div>
          )}

          {isAuthenticated && !isLoading && !!Object.keys(items).length && (
            <div>
              {!isLoading && items && !!Object.keys(items).length && (
                <>
                  {Object.entries(items).map((item) => {
                    return (
                      <div key={item[0]} className={requestsClasses.group}>
                        <div className={requestsClasses.created}>
                          <span>{item[0]}</span>
                        </div>
                        <DataTable
                          className={classes.table}
                          gridClass={classes.gridClass}
                          gridAreasBreakpoint="sm"
                          gridLabelsBreakpoint="sm"
                        >
                          <DataHeader>
                            <DataRow className={appTheme.tableHeader}>
                              <DataField gridArea="mpn">
                                <DataValue>Requested MPN</DataValue>
                              </DataField>
                              <DataField gridArea="qty">
                                <DataValue>Requested quantity</DataValue>
                              </DataField>
                              <DataField gridArea="yourQty">
                                <DataValue>Your quantity</DataValue>
                              </DataField>
                              <DataField gridArea="manufacturer">
                                <DataValue>Manufacturer</DataValue>
                              </DataField>
                              <DataField gridArea="date">
                                <DataValue>Response date</DataValue>
                              </DataField>
                              <DataField gridArea="yourPrice">
                                <DataValue>Your price ({currency.symbol})</DataValue>
                              </DataField>
                              <DataField gridArea="competitivePrice">
                                <DataValue>Competitive price ({currency.symbol})</DataValue>
                              </DataField>
                              <DataField gridArea="position">
                                <DataValue>Your position</DataValue>
                              </DataField>
                            </DataRow>
                          </DataHeader>
                          <DataBody>
                            {item[1].map((i, index) => {
                              return <StatisticItem key={uuid()} item={i} index={index} />;
                            })}
                          </DataBody>
                        </DataTable>
                      </div>
                    );
                  })}
                  {data?.total_pages > 1 && (
                    <Box paddingBottom={4} display="flex" justifyContent="center">
                      <Paginate
                        pageCount={data.total_pages}
                        activePage={filters?.page}
                        onPageChange={onPageChangeHandler}
                      />
                    </Box>
                  )}
                </>
              )}
            </div>
          )}
        </Container>
      </section>
    </Page>
  );
};

export default Statistics;
