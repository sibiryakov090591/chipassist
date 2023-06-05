/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import { createStore, compose, applyMiddleware } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
import { routerMiddleware } from "react-router-redux";
// import * as Sentry from "@sentry/react";
import { INIT_SENTRY } from "@src/config";
import catchAuthError from "@src/middleware/catchAuthError";
import userActivityMiddleware from "@src/middleware/userActivityMiddleware";
import createMiddleware from "@src/middleware/clientMiddleware";
import newBuildVersionMiddleware from "@src/middleware/newBuildVersionMiddleware";
import checkAuth from "@src/middleware/checkAuth";
import createRootReducer from ".";

export const history = createBrowserHistory();
// const connectRouterHistory = connectRouter(history);
// const sentryReduxEnhancer = Sentry.createReduxEnhancer();

function configureStoreProd(initialState, client) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunk,
    reactRouterMiddleware,
    createMiddleware(client),
    userActivityMiddleware,
    newBuildVersionMiddleware,
    catchAuthError,
    checkAuth,
  ];

  return createStore(
    createRootReducer(),
    initialState,
    INIT_SENTRY
      ? compose(applyMiddleware(...middlewares)) // compose(applyMiddleware(...middlewares), sentryReduxEnhancer)
      : compose(applyMiddleware(...middlewares)),
  );
}

function configureStoreDev(initialState, client) {
  const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunk,
    reactRouterMiddleware,
    createMiddleware(client),
    userActivityMiddleware,
    newBuildVersionMiddleware,
    catchAuthError,
    checkAuth,
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(
    createRootReducer(),
    initialState,
    INIT_SENTRY
      ? compose(applyMiddleware(...middlewares)) // composeEnhancers(applyMiddleware(...middlewares), sentryReduxEnhancer)
      : composeEnhancers(applyMiddleware(...middlewares)),
  );

  return store;
}

const configureStore = process.env.NODE_ENV === "production" ? configureStoreProd : configureStoreDev;

export default configureStore;
