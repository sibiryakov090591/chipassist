/* eslint-disable import/default */
import React from "react";
import { render } from "react-dom";
import configureStore, { history } from "./store/configureStore";
import Root from "./Root";
import ApiClient from "./services/ApiClient";

const client = new ApiClient();
const store = configureStore(undefined, client);

render(<Root store={store} client={client} history={history} />, document.getElementById("app"));
