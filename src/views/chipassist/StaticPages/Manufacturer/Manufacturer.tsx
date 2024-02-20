import { Page } from "@src/components";
import React from "react";
import { useParams } from "react-router-dom";
import { manufacturers } from "@src/constants/manufacturers";
import { Box, Container, useMediaQuery, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import placeholderImg from "@src/images/cpu.png";
import Button from "@material-ui/core/Button";
import useAppTheme from "@src/theme/useAppTheme";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: "3rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      textAlign: "center",
    },
  },
  imgContainer: {
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  description: {
    width: "40%",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  box: {
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));

export const Manufacturer = () => {
  const { name } = useParams();

  const classes = useStyles();

  const appClasses = useAppTheme();

  const theme = useTheme();

  const currentManufacturer = manufacturers.find(
    (manufacturer) => name === manufacturer.name.toLowerCase().trim().split(" ").join(""),
  );

  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Page>
      <Container>
        <h1 className={classes.name}>{currentManufacturer.name}</h1>
        <Box
          display={"flex"}
          // flexDirection={isDownSm ? "column" : "row"}
          justifyContent={"space-between"}
          marginBottom={"3em"}
          className={classes.box}
        >
          <div className={classes.imgContainer}>
            <img
              alt={"Company img"}
              src={currentManufacturer.image}
              onError={(e) => {
                e.currentTarget.src = placeholderImg;
              }}
              style={{ width: isDownSm ? "100%" : "300px" }}
            />
            <h3>{currentManufacturer.url}</h3>
            <h3>{currentManufacturer.address}</h3>
          </div>
          <h3 className={classes.description}>{currentManufacturer.description}</h3>
        </Box>
        <Button
          style={{ marginBottom: "2em" }}
          className={appClasses.buttonCreate}
          onClick={() => {
            window.location.href = `/search?query=${encodeURIComponent(
              `MANUFACTURER:${
                currentManufacturer.name?.trim().includes(" ")
                  ? `"${currentManufacturer.name}"`
                  : currentManufacturer.name?.trim()
              }`,
            )}`;
          }}
        >
          СМОТРЕТЬ ПРЕДЛОЖЕНИЯ
        </Button>
      </Container>
    </Page>
  );
};

export default Manufacturer;
