/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import { Container, Button } from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import ApiClient from "@src/services/ApiClient";
import { Page } from "@src/components";

const apiClient = new ApiClient();

const errorAction = (code) => ({
  types: [null, null, null],
  promise: (client) => client.get(`/error${code}/`),
});

const errorCors = (code) => {
  apiClient.get(`/error${code}/`, {
    config: { url: `https://httpstat.us/${code}` },
  });
};

const Test = () => {
  const dispatch = useAppDispatch();
  const [foo, setFoo] = useState(() => {
    return () => {
      return false;
    };
  });
  const crash = () => {
    setFoo(() => {
      return () => {
        c;
      };
    });
  };

  return (
    <Page title="Test" description="Test">
      <Container maxWidth="xl">
        {foo()}
        <br />
        <div>
          <Button color="primary" variant="outlined" onClick={() => crash()}>
            App crash
          </Button>
        </div>
        <br />
        <div>
          <Button color="primary" variant="outlined" onClick={() => dispatch(errorAction(401))}>
            Error 401
          </Button>
        </div>
        <br />
        <div>
          <Button color="primary" variant="outlined" onClick={() => dispatch(errorAction(403))}>
            Error 403
          </Button>
        </div>
        <br />
        <div>
          <Button color="primary" variant="outlined" onClick={() => dispatch(errorAction(500))}>
            Error 500
          </Button>
        </div>
        <br />
        <div>
          <Button color="primary" variant="outlined" onClick={() => errorCors(500)}>
            Error Cors
          </Button>
        </div>
      </Container>
    </Page>
  );
};

export default Test;
