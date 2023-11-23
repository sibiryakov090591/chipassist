import React, { useState, useEffect } from "react";
import Page from "@src/components/Page";
import {
  Button,
  Container,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { loadSupplierStatistics } from "@src/store/supplierStatistics/statisticsActions";
import Preloader from "@src/components/Preloader/Preloader";
import { useStyles as useRequestsStyles } from "@src/views/supplier-response/Requests/supplierResponseStyles";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import { loadMiscAction, saveMiscAction, updateMiscAction } from "@src/store/misc/miscActions";
import Alert from "@material-ui/lab/Alert";
import { showRegisterModalAction } from "@src/store/alerts/alertsActions";
import { Link } from "react-router-dom";
import clsx from "clsx";
import useAppTheme from "@src/theme/useAppTheme";
import { ResponseItem as IResponseItem } from "@src/store/supplierStatistics/statisticsTypes";
import FiltersContainer, { FilterPageSizeChoiceBar, FilterResultsBar } from "@src/components/FiltersBar";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { v4 as uuid } from "uuid";
import SupplierSelect from "@src/components/SupplierSelect/SupplierSelect";
import { useStyles } from "./statisticsStyles";
import Paginate from "../../../components/Paginate";
import StatisticItem from "./components/StatisticItem/StatisticItem";

interface Filters {
  page: number;
  page_size: number;
}

interface State {
  [key: string]: {
    [key: string]: IResponseItem[];
  };
}

const Statistics: React.FC = () => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const requestsClasses = useRequestsStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const page = useURLSearchParams("page", false, 1, false);
  const pageSize = useURLSearchParams("page_size", false, localStorage.getItem("supplier_statistic_page_size"), false);

  const { isLoading, data } = useAppSelector((state) => state.supplierStatistics);
  const selectedPartner = useAppSelector((state) => state.profile.selectedPartner);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const currency = useAppSelector((state) => state.currency.selected);

  const [filters, setFilters] = useState<Filters>(null);
  const [groups, setGroups] = useState<State>({});

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
    if (selectedPartner && filters) {
      dispatch(loadSupplierStatistics(filters.page, filters.page_size, selectedPartner.id));
    }
  }, [selectedPartner, filters]);

  useEffect(() => {
    if (data) {
      const newData = data.results.reduce((acc: State, item) => {
        const groupDate = new Date(item.date).toLocaleDateString();
        return {
          ...acc,
          [groupDate]: acc[groupDate]
            ? {
                ...acc[groupDate],
                [item.stockrecord_id]: acc[groupDate][item.stockrecord_id]
                  ? [...acc[groupDate][item.stockrecord_id], item]
                  : [item],
              }
            : { [item.stockrecord_id]: [item] },
        };
      }, {});
      setGroups(newData);
    }
  }, [data]);

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
            <SupplierSelect />
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
          {(!isAuthenticated || (!isLoading && !Object.keys(groups).length)) && (
            <div className={classes.empty}>You have not responded to any requests yet</div>
          )}
          {isSmDown && !isLoading && !!Object.keys(groups).length && (
            <div className={classes.empty}>Statistics available only on desktop version</div>
          )}

          {!isSmDown && isAuthenticated && !isLoading && !!Object.keys(groups).length && (
            <div>
              {Object.entries(groups).map((entry) => {
                const [date, group] = entry;
                return (
                  <div key={date} className={requestsClasses.group}>
                    <div className={requestsClasses.created}>
                      <span>{date}</span>
                    </div>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow className={appTheme.tableHeader}>
                          <TableCell className={classes.thText}>Requested MPN</TableCell>
                          <TableCell className={classes.thQty}>Requested quantity</TableCell>
                          <TableCell className={classes.thQty}>Your quantity</TableCell>
                          <TableCell className={classes.thText}>Manufacturer</TableCell>
                          <TableCell className={classes.thQty}>Response date</TableCell>
                          <TableCell className={classes.thQty}>Your price ({currency.symbol})</TableCell>
                          <TableCell className={classes.thQty}>Competitive price ({currency.symbol})</TableCell>
                          <TableCell className={classes.thText}>Your position</TableCell>
                          <TableCell className={classes.thArrow}></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.values(group).map((stocks, index) => {
                          return <StatisticItem key={uuid()} items={stocks} index={index} />;
                        })}
                      </TableBody>
                    </Table>
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
            </div>
          )}
        </Container>
      </section>
    </Page>
  );
};

export default Statistics;
