import { combineReducers } from "redux";
import { CommonState } from "@src/store/common/commonTypes";
import { CurrencyState } from "@src/store/currency/currencyTypes";
import common from "@src/store/common/commonReducer";
import currency from "@src/store/currency/currencyReducer";
import { RfqState } from "@src/store/rfq/rfqTypes";
import { CartState } from "@src/store/cart/cartTypes";
import cart from "@src/store/cart/cartReducer";
import { CheckoutState } from "@src/store/checkout/checkoutTypes";
import { AlertsState } from "@src/store/alerts/alertsTypes";
import { AuthState } from "@src/store/authentication/authTypes";
import { ProgressModalState } from "@src/store/progressModal/progressModalTypes";
import { CatalogState } from "@src/store/catalog/catalogTypes";
import { AdapterState } from "@src/store/adapter/adapterTypes";
import catalog from "./catalog/catalogReducer";
import auth from "./authentication/authReducer";
import treeMenuReducer from "./treeMenu/treeMenuReducer";
import products from "./products/productsReducer";
import { ProductsState } from "./products/productTypes";
import search from "./search/searchReducer";
import { SearchState } from "./search/searchTypes";
import { ChartState } from "./chart/chartTypes";
import suggestions from "./suggestions/suggestionsReducer";
import checkout from "./checkout/checkoutReducer";
import bom from "./bom/bomReducer";
import orders from "./orders/ordersReducer";
import alerts from "./alerts/alertsReducer";
import profile from "./profile/profileReducer";
import { ProfileState } from "./profile/profileTypes";
import sellers from "./sellers/sellersReducer";
import supplierStatistics from "./supplierStatistics/statisticsReducer";
import { StatisticsState } from "./supplierStatistics/statisticsTypes";
import { ManufacturersState } from "./manufacturers/manufacturersTypes";
import manufacturers from "./manufacturers/manufacturersReducer";
import rfq from "./rfq/rfqReducer";
import pcb from "./pcb/pcbReducer";
import adapter from "./adapter/adapterReducer";
import chart from "./chart/chartReducer";
import chat from "./chat/chatReducer";
import blog from "./blog/blogReducer";
import { BlogState } from "./blog/blogTypes";
import { ChatState } from "./chat/chatTypes";
import progressModalReducer from "./progressModal/progressModalReducer";
import rfqList from "./rfqList/rfqListReducer";
import sellerProfile from "./sellerProfile/sellerProfileReducer";
import { SellersState } from "./sellers/sellersTypes";

const rootReducer = () =>
  combineReducers({
    adapter,
    alerts,
    auth,
    bom,
    blog,
    catalog,
    chat,
    common,
    currency,
    cart,
    checkout,
    chart,
    manufacturers,
    orders,
    profile,
    pcb,
    progressModal: progressModalReducer,
    products,
    rfq,
    search,
    suggestions,
    sellers,
    supplierStatistics,
    treeMenu: treeMenuReducer,
    rfqList,
    sellerProfile,
  });

export default rootReducer;

export interface RootState {
  adapter: AdapterState;
  blog: BlogState;
  chat: ChatState;
  common: CommonState;
  currency: CurrencyState;
  auth: AuthState;
  catalog: CatalogState;
  treeMenu: any;
  products: ProductsState;
  search: SearchState;
  suggestions: any;
  cart: CartState;
  checkout: CheckoutState;
  bom: any;
  orders: any;
  alerts: AlertsState;
  profile: ProfileState;
  sellers: SellersState;
  supplierStatistics: StatisticsState;
  manufacturers: ManufacturersState;
  rfq: RfqState;
  pcb: any;
  chart: ChartState;
  progressModal: ProgressModalState;
  rfqList: any;
  sellerProfile: any;
}
