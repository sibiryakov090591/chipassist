import React, { useEffect } from "react";
import clsx from "clsx";
import { Box, Card } from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useCurrency from "@src/hooks/useCurrency";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { loadOrdersThunk } from "@src/store/orders/ordersActions";
import { Page } from "@src/components";
import Paginate from "@src/components/Paginate";
import setUrl from "@src/utils/setUrl";
import Preloader from "@src/components/Preloader/Preloader";
import FiltersContainer, { FilterPageSizeChoiceBar, FilterResultsBar } from "@src/components/FiltersBar";
import { DataTable, DataField, DataValue, DataHeader, DataRow, DataBody } from "@src/components/DataTable/DataTable";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import useAppSelector from "@src/hooks/useAppSelector";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./style";
// import OrderStatus from "./components/OrderStatus/OrderStatus";
import Order from "./components/Order/Order";

const Orders = (props) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const navigate = useNavigate();
  const { t } = useI18n("order");
  const { currency } = useCurrency();

  const storageKey = "ordersListShowBy";
  // eslint-disable-next-line no-underscore-dangle
  const _pageSize = useAppSelector((state) => state.search.pageSize);
  const shouldUpdateBackend = useAppSelector((state) => state.common.shouldUpdateBackend);
  const isOrdersLoading = useAppSelector((state) => state.orders.ordersLoading);
  const orders = useAppSelector((state) => state.orders.orders);

  const pageSize = useURLSearchParams("page_size", false, localStorage.getItem(`${storageKey}`) || _pageSize, false);
  const orderHighlight = useURLSearchParams("highlight", false, "", false);
  const page = +useURLSearchParams("page", false, 1, false) || 1;

  const ordersItems = orders.results || [];

  const statuses = [
    { label: t("statuses.all"), value: "all" },
    { label: t("statuses.pending"), value: "pending" },
    { label: t("statuses.being_processed"), value: "being processed" },
    { label: t("statuses.complete"), value: "complete" },
    { label: t("statuses.cancelled"), value: "cancelled" },
    { label: t("statuses.being_processed"), value: "co sent" },
    { label: t("statuses.being_processed"), value: "co created" },
  ];

  // const selectedStatus = useAppSelector(
  //   (state) =>
  //     statuses.find((val) => val.value === state.orders.filterStatus) || statuses.find((val) => val.value === "all"),
  // );
  const selectedStatus = statuses.find((val) => val.value === "all");

  useEffect(() => {
    dispatch(loadOrdersThunk(page, pageSize, selectedStatus.value));
  }, [shouldUpdateBackend]);

  // TODO:: можно убрать в useEffect
  const onPageChangeHandle = (data) => {
    if (!isOrdersLoading) {
      setUrl(navigate, "/profile/orders", data.selected + 1, pageSize);
      dispatch(loadOrdersThunk(data.selected + 1, pageSize, selectedStatus.value));
    }
  };

  const onInvoiceUpdate = () => {
    if (!isOrdersLoading) {
      // TODO сейчас инвойс=заказ. в будущем, когда инвойсы будут отдельно от заказов,
      // TODO не нужно забирать новые заказы/инвосы с сервера т.к. при update/delete мы знаем что изменилось и можем изменить данные через редьюсер
      dispatch(loadOrdersThunk(page, pageSize, selectedStatus.value));
    }
  };

  const reloadList = (page_size, in_page) => {
    if (page_size === pageSize) {
      return;
    }
    const new_page = in_page || 1;
    setUrl(navigate, "/profile/orders", new_page, page_size);
    dispatch(loadOrdersThunk(new_page, page_size, selectedStatus.value));
  };

  return (
    <Page title={t("orders")} description={t("page_description")}>
      <Box mb={5}>
        {/* <h1 className={commonClasses.pageTitle}>{t("orders")}</h1> */}
        <div className={clsx(commonClasses.filtersRow, commonClasses.filtersRowMargin)}>
          <FiltersContainer>
            <FilterResultsBar count={orders?.count || 0} />
            <FilterPageSizeChoiceBar storageKey={`${storageKey}`} action={reloadList} />
          </FiltersContainer>
        </div>
        <Card className={clsx(classes.root, className)}>
          {/* <Box */}
          {/*  p={2} */}
          {/*  display="flex" */}
          {/*  alignItems="flex-start" */}
          {/*  justifyContent="space-between" */}
          {/*  className={classes.filters} */}
          {/* > */}
          {/*  /!* <div className={classes.statusSelect}> *!/ */}
          {/*  /!*  <OrderStatus pageSize={pageSize} {...{ statuses, selectedStatus }} /> *!/ */}
          {/*  /!* </div> *!/ */}
          {/* </Box> */}
          {isOrdersLoading && (
            <div colSpan="0" className={classes.ordersTableContentTdSkeleton}>
              <Preloader title={t("loading_orders")} />
            </div>
          )}
          {!isOrdersLoading && (
            <DataTable className={classes.ordersTable} gridClass={classes.ordersGrid} gridAreasBreakpoint="xs">
              <DataHeader>
                <DataRow>
                  <DataField gridArea="number">
                    <DataValue>{t("common.number")}</DataValue>
                  </DataField>
                  <DataField gridArea="date">
                    <DataValue>{t("common.date")}</DataValue>
                  </DataField>
                  <DataField gridArea="total">
                    <DataValue>{`${t("common.total")}, ${currency?.symbol}`}</DataValue>
                  </DataField>
                  <DataField gridArea="status">
                    <DataValue>{t("common.status")}</DataValue>
                  </DataField>
                  <DataField gridArea="actions"></DataField>
                </DataRow>
              </DataHeader>
              <DataBody>
                {!!ordersItems.length &&
                  ordersItems.map((order, index) => {
                    const date = new Date(order.date_placed);
                    return (
                      <Order
                        index={index}
                        idx={order.id}
                        key={order.number}
                        number={order.number}
                        date={date.toLocaleString()}
                        total={order.total_excl_tax}
                        orderCurrency={order.currency}
                        // statusLabel={statuses.find((val) => val.value === order.status)?.label}
                        statusLabel={order.status}
                        status={order.status}
                        onCancel={onInvoiceUpdate}
                        highlight={orderHighlight === order.number}
                      />
                    );
                  })}
              </DataBody>
            </DataTable>
          )}
          {!isOrdersLoading && !ordersItems.length && (
            <div className={commonClasses.emptyContentMessage}>
              <h2>{t("no_orders")}</h2>
            </div>
          )}
          {orders && orders.total_pages > 1 && (
            <Box p={4} display="flex" justifyContent="center">
              <Paginate pageCount={orders.total_pages} activePage={page} onPageChange={onPageChangeHandle} />
            </Box>
          )}
        </Card>
      </Box>
    </Page>
  );
};

export default Orders;
