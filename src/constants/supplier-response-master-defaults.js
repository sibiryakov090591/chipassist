const defaults = {
  title: "Master",
  id: "supplier_response",
  apiPath: "/api",
  apiHost: "api.camaster.site",
  schema: "https",
  SHOW_LANG_SWITCHER: true,
  locales: ["en", "ru"],
  localeDefault: "en",
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
  closedRegistration: false,
  extendedRegistration: true,
  currencyChanger: true,
  selectedCurrencyList: ["USD", "EUR"], // ["RUB", "USD", "EUR"]
  builds: "AWS",
  userActivity: false,
  userActivityPing: 3, // minutes
  userActivitySessionDelay: 0.5, // minutes
  userActivitySessionMinimumDuration: 0.5, // minutes
  userActivitySessionWhitespace: 0.2, // minutes
  jivoChat: false,
  YM: false,
  GA: false,
  checkSiteVersion: true,
  checkSiteVersionPing: 6, // minutes
  validDaysForResponse: 3,
  showManufacturerField: true,
};
module.exports = defaults;
