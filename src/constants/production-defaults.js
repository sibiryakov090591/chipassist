const defaults = {
  title: "ChipAssist",
  id: "chipassist",
  apiPath: "/api",
  apiHost: "api.chipassist.com",
  schema: "https",
  SHOW_LANG_SWITCHER: false,
  locales: ["en", "de"],
  localeDefault: "en",
  showFeedback: true,
  debug: false,
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
  extendedRegistration: true,
  currencyChanger: true,
  selectedCurrencyList: ["USD", "EUR"], // ["RUB", "USD", "EUR"]
  showCategories: false,
  builds: "AWS",
  userActivity: true,
  userActivityPing: 3, // minutes
  userActivitySessionDelay: 0.5, // minutes
  userActivitySessionMinimumDuration: 0.5, // minutes
  userActivitySessionWhitespace: 0.2, // minutes
  showNewStyles: false,
  STOCK_RECORD_PERIOD_OF_RELEVANCE: 72, // hours
  jivoChat: false,
  YM: false,
  GA: true,
  checkSiteVersion: true,
  checkSiteVersionPing: 6, // minutes
  showInn: true,
  cashBomModalProducts: true,
  cashBomModalTime: 60, // minutes
  showNewBillingAddress: true,
  isPossibleCardPay: true,
  CART_ITEM_PERIOD_OF_RELEVANCE: 72, // hours
  activateCorporateEmailValidation: false,
  bannedEmailServices: ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "qq.com"], // for activateCorporateEmailValidation: true
};
module.exports = defaults;
