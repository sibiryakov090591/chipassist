/* eslint-disable import/default */

import React from "react";
import { render } from "react-dom";
import * as Sentry from "@sentry/react";
import { ExtraErrorData } from "@sentry/integrations";
import SentryRRWeb from "@sentry/rrweb";
import { INIT_SENTRY, IS_PROD } from "@src/config";
import configureStore, { history } from "./store/configureStore";
import Root from "./Root";
import ApiClient from "./services/ApiClient";

if (INIT_SENTRY) {
  Sentry.init({
    dsn: "https://09329920562149b8a8f0be9d8af3e90c@o1064674.ingest.sentry.io/6055664",
    integrations: [new ExtraErrorData(), new SentryRRWeb()],
    tracesSampleRate: 1.0,
    ignoreErrors: ["Non-Error promise rejection", "Request aborted", "Request failed with status code 401"],
    beforeSend(event) {
      // eslint-disable-next-line no-param-reassign
      event.tags = {
        ...event.tags,
        env: IS_PROD ? "PROD" : "DEV",
        commit: process.env.AWS_COMMIT_ID || COMMITHASH,
        branch: process.env.AWS_BRANCH === "master" ? BRANCH : process.env.AWS_BRANCH,
      };

      return event;
    },
  });
}

const client = new ApiClient();
const store = configureStore(undefined, client);

render(<Root store={store} client={client} history={history} />, document.getElementById("app"));
