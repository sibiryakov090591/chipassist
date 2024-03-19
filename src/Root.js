import React, { Component, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@material-ui/styles";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
// import MomentUtils from "@date-io/moment";
// import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { I18nProvider } from "@src/services/I18nProvider/I18nProvider.tsx";
import constants from "@src/constants/constants";
import BlockPage from "@src/views/chipassist/BlockPage/BlockPage";
import ChipAssistApp from "./ChipAssistApp";
import theme from "./themes";
import {
  ID_ELFARO,
  ID_ICSEARCH,
  ID_SUPPLIER_RESPONSE,
  ID_PCBONLINE,
  ID_CHIPASSIST,
  ID_MASTER,
} from "./constants/server_constants";

const ElfaroApp = lazy(() => import("@src/ElfaroApp"));
const SupplierResponseApp = lazy(() => import("@src/SupplierResponseApp"));

class Root extends Component {
  render() {
    const { store, history } = this.props;

    return (
      <I18nProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            {/* <MuiPickersUtilsProvider utils={MomentUtils}> */}
            <HelmetProvider>
              {constants.id === ID_MASTER && (
                <Helmet>
                  <meta name="robots" content="noindex" />
                </Helmet>
              )}
              <HistoryRouter history={history}>
                {[ID_CHIPASSIST, ID_MASTER, ID_SUPPLIER_RESPONSE].includes(constants.id) && <BlockPage />}
                {[ID_ICSEARCH].includes(constants.id) && <ChipAssistApp />}
                {constants.id === ID_ELFARO && (
                  <Suspense fallback={}>
                    <ElfaroApp />
                  </Suspense>
                )}
                {[ID_PCBONLINE].includes(constants.id) && (
                  <Suspense fallback={}>
                    <SupplierResponseApp />
                  </Suspense>
                )}
              </HistoryRouter>
            </HelmetProvider>
            {/* </MuiPickersUtilsProvider> */}
          </ThemeProvider>
        </Provider>
      </I18nProvider>
    );
  }
}

export default Root;

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
