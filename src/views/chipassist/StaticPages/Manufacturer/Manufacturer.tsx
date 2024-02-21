import React from "react";
import { useParams } from "react-router-dom";
import { manufacturers } from "@src/constants/manufacturers";
import { Container, useMediaQuery, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import placeholderImg from "@src/images/cpu.png";
import Button from "@material-ui/core/Button";
import useAppTheme from "@src/theme/useAppTheme";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    padding: "3em",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  name: {
    fontSize: "3rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      textAlign: "center",
    },
  },
  imgContainer: {
    width: "250px",
    height: "250px",
    border: "1px solid #015ED0",
    display: "flex",
    overflow: "hidden",
    alignItems: "center",
    borderRadius: "4px",
    justifyContent: "center",
  },
  description: {
    width: "40%",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  infoContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
  },
  descrContainer: {
    display: "flex",
    width: "100%",
    alignItems: "start",
    flexDirection: "column",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
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
    <Container maxWidth={"lg"} className={classes.root}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div className={classes.infoContainer}>
          {isDownSm && <h1 className={classes.name}>{currentManufacturer.name}</h1>}
          <div className={classes.imgContainer}>
            <img
              alt={"Company img"}
              src={currentManufacturer.image}
              onError={(e) => {
                e.currentTarget.src = placeholderImg;
              }}
            />
          </div>
          <div style={{ textAlign: isDownSm ? "center" : "start" }}>
            <p style={{ fontWeight: 600, fontSize: "1.5em" }}>{currentManufacturer.url}</p>
            <p style={{ fontWeight: 500, fontSize: "1.2em" }}>{currentManufacturer.address}</p>
          </div>
        </div>
      </div>

      <div className={classes.descrContainer}>
        {!isDownSm && <h1 className={classes.name}>{currentManufacturer.name}</h1>}
        <p style={{ fontSize: "1.5em" }}>{currentManufacturer.description}</p>
        <Button
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
      </div>
    </Container>
  );
};

export default Manufacturer;
