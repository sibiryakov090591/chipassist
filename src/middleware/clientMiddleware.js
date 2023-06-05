export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => {
    return (next) => (action) => {
      if (typeof action === "function") {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action;
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({ ...rest, type: REQUEST });

      const actionPromise = promise(client);
      actionPromise
        .then((response) => next({ ...rest, response, type: SUCCESS }))
        .catch((error) => {
          console.error("MIDDLEWARE ERROR:", error.message);
          next({ ...rest, error, type: FAILURE });
          throw error;
        });

      return actionPromise;
    };
  };
}
