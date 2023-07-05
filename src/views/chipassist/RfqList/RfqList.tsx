import React, { useEffect, useState } from "react";
import { Page } from "@src/components";
import { Box, Button, Container, TextField } from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import useStyles from "@src/views/chipassist/RfqList/RfqListStyle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { findLastIndex } from "lodash";

interface RfqItem {
  isDisabled: boolean;
  MPN: string;
  manufacturer: string;
  quantity: number;
  price: number;
}

export const RfqList = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const classes = useStyles();
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const [needToChange, setNeedToChange] = useState(false);
  const [prevFilledInputIndex, setPrewFilledInputIndex] = useState(-1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [rfqsRow, setRfqsRow] = useState<RfqItem[]>([
    { isDisabled: false, MPN: "", manufacturer: "", quantity: 0, price: 0 },
  ]);

  const changeMPNHandler = (key: number, value: any) => {
    const changedElem = { ...rfqsRow[key], MPN: value };
    const newState = [...rfqsRow.slice(0, key), changedElem, ...rfqsRow.slice(key + 1, rfqsRow.length)];

    setRfqsRow(newState);
    setNeedToChange((prevState) => !prevState);
  };

  const changeManufacturerHandler = (key: number, value: any) => {
    const changedElem = { ...rfqsRow[key], manufacturer: value };
    const newState = [...rfqsRow.slice(0, key), changedElem, ...rfqsRow.slice(key + 1, rfqsRow.length)];

    setRfqsRow(newState);
    setNeedToChange((prevState) => !prevState);
  };

  const changeQuantityHandler = (key: number, value: any) => {
    const changedElem = { ...rfqsRow[key], quantity: value };
    const newState = [...rfqsRow.slice(0, key), changedElem, ...rfqsRow.slice(key + 1, rfqsRow.length)];

    setRfqsRow(newState);
    setNeedToChange((prevState) => !prevState);
  };

  const changePriceHandler = (key: number, value: any) => {
    const changedElem = { ...rfqsRow[key], price: value };
    const newState = [...rfqsRow.slice(0, key), changedElem, ...rfqsRow.slice(key + 1, rfqsRow.length)];

    setRfqsRow(newState);
    setNeedToChange((prevState) => !prevState);
  };

  const addButtonClickHandler = () => {
    const newRfq: RfqItem = {
      MPN: "",
      manufacturer: "",
      quantity: 0,
      price: 0,
      isDisabled: true,
    };
    const lastRfq = rfqsRow[rfqsRow.length - 1];

    if (lastRfq.MPN !== "" || lastRfq.manufacturer !== "") {
      newRfq.isDisabled = false;
    }
    setRfqsRow((prevState) => [...prevState, newRfq]);
    return 0;
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (rfqsRow) {
      const lastFilledIndex = findLastIndex(rfqsRow, (element) => element.MPN !== "" || element.manufacturer !== "");
      console.log(lastFilledIndex);

      if (
        lastFilledIndex >= 0 &&
        rfqsRow.length > 1 &&
        lastFilledIndex + 1 < rfqsRow.length &&
        prevFilledInputIndex <= lastFilledIndex
      ) {
        setRfqsRow((prevState) => [
          ...prevState.slice(0, lastFilledIndex + 1),
          { ...prevState[lastFilledIndex + 1], isDisabled: false },
          ...prevState.slice(lastFilledIndex + 2, prevState.length),
        ]);
        setPrewFilledInputIndex(lastFilledIndex);
      } else if (lastFilledIndex < prevFilledInputIndex) {
        setRfqsRow((prevState) => [
          ...prevState.slice(0, lastFilledIndex + 2),
          { ...prevState[lastFilledIndex + 2], isDisabled: true },
          ...prevState.slice(lastFilledIndex + 3, prevState.length).map((elem) => ({ ...elem, isDisabled: true })),
        ]);
        setPrewFilledInputIndex(lastFilledIndex);
      }
    }
  }, [needToChange]);

  return (
    <Page title={"rfqListPage"} description={"rfqListPageDescription"}>
      <Container maxWidth={"xl"} className={classes.mainContainer}>
        <section className={classes.section}>
          <Container maxWidth={"lg"} className={classes.mainContainer}>
            <Box className={classes.listBox}>
              <p className={classes.title}>Enter your quote list</p>
              {rfqsRow.map((elem, key) => (
                <Box key={key} className={classes.rfqsBox}>
                  <TextField
                    disabled={elem.isDisabled}
                    variant={"outlined"}
                    label={"Part Number"}
                    defaultValue={elem.MPN}
                    fullWidth
                    className={classes.rfqInput}
                    onChange={(event) => changeMPNHandler(key, event.target.value)}
                  />
                  <TextField
                    disabled={elem.isDisabled}
                    variant={"outlined"}
                    label={"Manufacturer"}
                    defaultValue={elem.manufacturer}
                    fullWidth
                    className={classes.rfqInput}
                    onChange={(event) => changeManufacturerHandler(key, event.target.value)}
                  />

                  <TextField
                    disabled={elem.isDisabled}
                    variant={"outlined"}
                    label={"Quantity"}
                    defaultValue={elem.quantity}
                    style={!isDownMd ? { width: "20em" } : null}
                    fullWidth={isDownMd}
                    className={classes.rfqInput}
                    onChange={(event) => changeQuantityHandler(key, event.target.value)}
                  />
                  <TextField
                    disabled={elem.isDisabled}
                    variant={"outlined"}
                    label={"Target Price"}
                    defaultValue={elem.price}
                    style={!isDownMd ? { width: "20em" } : null}
                    fullWidth={isDownMd}
                    className={classes.rfqInput}
                    onChange={(event) => changePriceHandler(key, event.target.value)}
                  />
                </Box>
              ))}
              <Button variant={"contained"} className={classes.addButton} onClick={addButtonClickHandler}>
                Add new RFQ request
              </Button>
            </Box>
          </Container>
        </section>
        {!isAuthenticated && (
          <section className={classes.section}>
            <Container maxWidth={"lg"} className={classes.mainContainer}>
              <p className={classes.title}>Tell us about yourself</p>

              <Container maxWidth={"lg"}>
                <Box className={classes.rfqsBox}>
                  <TextField
                    variant={"outlined"}
                    label={"First name"}
                    fullWidth
                    className={classes.rfqInput}
                    defaultValue={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                  <TextField
                    variant={"outlined"}
                    label={"Last name"}
                    fullWidth
                    className={classes.rfqInput}
                    defaultValue={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />

                  <TextField
                    variant={"outlined"}
                    label={"Work email"}
                    fullWidth
                    className={classes.rfqInput}
                    defaultValue={workEmail}
                    onChange={(event) => setWorkEmail(event.target.value)}
                  />
                  <TextField
                    variant={"outlined"}
                    label={"Company name"}
                    fullWidth
                    className={classes.rfqInput}
                    defaultValue={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                  />
                </Box>
              </Container>
            </Container>
          </section>
        )}
        <section className={classes.section}>
          <Box className={classes.submitButtonContainer}>
            <Button variant={"outlined"}>Send RFQ</Button>
          </Box>
        </section>
      </Container>
    </Page>
  );
};

export default RfqList;
