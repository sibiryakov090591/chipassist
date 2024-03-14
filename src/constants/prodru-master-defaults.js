const defaults = {
  title: "ICSearch",
  id: "icsearch",
  apiPath: "/api",
  apiHost: "api.dev.icsearch.ru",
  schema: "https",
  SHOW_LANG_SWITCHER: false,
  locales: ["ru", "en"],
  localeDefault: "ru",
  showFeedback: true,
  debug: false,
  searchTransport: "rest", // websocket|rest
  colorScheme: "ru",
  logos: {
    fromPath: "src/images/logos/ru",
    distPath: "logo", // folder in build folder
    mainLogoDarkBack: "logo_darkback.png",
    mainLogoLightBack: "logo_lightback.png",
    topBannerLogo: "",
  },
  bomNew: true,
  extendedRegistration: false,
  currencyChanger: true,
  selectedCurrencyList: ["RUB", "USD", "EUR", "HKD", "CNY"], // ["RUB", "USD", "EUR"]
  showCategories: false,
  builds: "AWS",
  userActivity: true,
  userActivityPing: 4, // minutes
  userActivitySessionDelay: 0.5, // minutes
  userActivitySessionMinimumDuration: 0.5, // minutes
  userActivitySessionWhitespace: 0.2, // minutes
  showNewStyles: false,
  STOCK_RECORD_PERIOD_OF_RELEVANCE: 72, // hours
  jivoChat: false,
  YM: true,
  GA: true,
  checkSiteVersion: true,
  checkSiteVersionPing: 6, // minutes
  showInn: true,
  cashBomModalProducts: true,
  cashBomModalTime: 60, // minutes
  showNewBillingAddress: true,
  isPossibleCardPay: false,
  CART_ITEM_PERIOD_OF_RELEVANCE: 72, // hours
  activateCorporateEmailValidation: false,
  bannedEmailServices: ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "qq.com"], // for activateCorporateEmailValidation: true
};
module.exports = defaults;
