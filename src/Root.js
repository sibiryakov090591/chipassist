import React, { Component } from "react";
import * as Sentry from "@sentry/react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@material-ui/styles";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { INIT_SENTRY } from "@src/config";
import { I18nProvider } from "@src/services/I18nProvider/I18nProvider.tsx";
import constants from "@src/constants/constants";
import ChipAssistApp from "./ChipAssistApp";
import theme from "./themes";
import {
  ID_ELFARO,
  ID_ICSEARCH,
  ID_SUPPLIER_RESPONSE,
  ID_CHIPASSIST,
  ID_MASTER,
  ID_CLOUD,
  ID_DEV,
} from "./constants/server_constants";
import ElfaroApp from "./ElfaroApp";
import SupplierResponseApp from "./SupplierResponseApp";

class Root extends Component {
  render() {
    const { store, history } = this.props;

    return (
      <I18nProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <HelmetProvider>
                <HistoryRouter history={history}>
                  {[ID_CHIPASSIST, ID_ICSEARCH, ID_MASTER, ID_DEV, ID_CLOUD].includes(constants.id) && (
                    <ChipAssistApp />
                  )}
                  {constants.id === ID_ELFARO && <ElfaroApp />}
                  {constants.id === ID_SUPPLIER_RESPONSE && <SupplierResponseApp />}
                </HistoryRouter>
              </HelmetProvider>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </Provider>
      </I18nProvider>
    );
  }
}

export default INIT_SENTRY ? Sentry.withProfiler(Root) : Root;

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
