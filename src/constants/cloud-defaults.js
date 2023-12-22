const defaults = {
  title: "ChipAssist",
  id: "cloud",
  apiPath: "/api",
  apiHost: "static.242.84.251.148.clients.your-server.de",
  schema: "https",
  locales: ["en", "ru"],
  localeDefault: "en",
  showFeedback: true,
  debug: false,
  searchTransport: "rest", // websocket|rest
  bomNew: false,
  closedRegistration: false,
  currencyChanger: true,
  showCategories: false,
  userActivity: true,
  userActivityPing: 3, // minutes
  userActivitySessionDelay: 0.5, // minutes
  userActivitySessionMinimumDuration: 0.5, // minutes
  userActivitySessionWhitespace: 0.2, // minutes
  showNewStyles: false,
  rfqsGroup: "time", // time|date
  STOCK_RECORD_PERIOD_OF_RELEVANCE: 72, // hours
  checkSiteVersion: true,
  checkSiteVersionPing: 6, // minutes
  CART_ITEM_PERIOD_OF_RELEVANCE: 72, // hours
};
module.exports = defaults;
