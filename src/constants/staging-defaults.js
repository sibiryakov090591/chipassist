const defaults = {
  title: "Master",
  id: "master",
  apiPath: "/api",
  apiHost: "api.master.chipassist.com",
  schema: "https",
  locales: ["en", "ru"],
  localeDefault: "en",
  showFeedback: true,
  debug: true,
  searchTransport: "rest", // websocket|rest
  colorScheme: "en", // en|ru
  logos: {
    fromPath: "src/images/logos/en",
    distPath: "logo", // folder in build folder
    mainLogoDarkBack: "logo_darkback.png",
    mainLogoLightBack: "logo_lightback.png",
    topBannerLogo: "",
  },
  bomNew: true,
  closedRegistration: false,
  extendedRegistration: true,
  currencyChanger: true,
  selectedCurrencyList: ["USD", "EUR"], // ["RUB", "USD", "EUR"]
  showCategories: false,
  builds: "AWS",
  userActivity: true, // set false for local development
  userActivityPing: 3, // minutes
  userActivitySessionDelay: 0.7, // minutes
  userActivitySessionMinimumDuration: 0.5, // minutes
  userActivitySessionWhitespace: 0.2, // minutes
  showNewStyles: false,
  STOCK_RECORD_PERIOD_OF_RELEVANCE: 72, // hours
  jivoChat: false,
  YM: false,
  GA: false,
  checkSiteVersion: true,
  checkSiteVersionPing: 6, // minutes
  showInn: false,
  cashBomModalProducts: true,
  cashBomModalTime: 60, // minutes
  showNewBillingAddress: true,
  isPossibleCardPay: true,
  CART_ITEM_PERIOD_OF_RELEVANCE: 72, // hours
  isNewSearchPage: true,
  showManufacturerField: true,
  activateCorporateEmailValidation: false,
  bannedEmailServices: ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "qq.com"], // for activateCorporateEmailValidation: true
};
module.exports = defaults;
