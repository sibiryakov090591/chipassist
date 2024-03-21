import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { manufacturers } from "@src/constants/manufacturers";
import { Container, useMediaQuery, useTheme } from "@material-ui/core";
import placeholderImg from "@src/images/cpu.png";
import Button from "@material-ui/core/Button";
import useAppTheme from "@src/theme/useAppTheme";
import constants from "@src/constants/constants";
import { ID_ICSEARCH } from "@src/constants/server_constants";
import { useStyles } from "@src/views/chipassist/StaticPages/Manufacturer/style";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

// const companyNames = {
//   "Chilisin Electronics": 16728,
// GigaDevice: 4363,
// "Jiangsu Electronic": 3114,
// Yageo: 1223,
// "Sanken Electric Company": 17854,
// Sunmotion: 3493,
// "Analog Devices": 18,
// Raditek: 3038,
// Amphenol: 2677,
// Microchip: 3231,
// Wingtech: 32053,
// "Giga Device": 4363,
// "NXP Semiconductors": 9,
// UNISOC: 32054,
// "ST Microelectronics": 7,
// "Nation Technologies": 32055,
// "Texas Instruments": 3681,
// Rockchip: 4033,
// "ON Semiconductor": 129,
// Maxscend: 32056,
// Murata: 945,
// Sanechips: 32057,
// Omron: 943,
// "CR Micro": 32058,
// "Renesas Electronics": 2,
// "TE Connectivity": 321,
// GoerTek: 32059,
// "Wurth Electronics": 3065,
// Xilinx: 1957,
// SMC: 1874,
// };

export const Manufacturer = () => {
  const { name } = useParams();

  const classes = useStyles();

  const navigate = useNavigate();

  const appClasses = useAppTheme();

  const theme = useTheme();

  const currentManufacturer = manufacturers.find((manufacturer) => {
    const name_string = manufacturer.name.toLowerCase().trim().split(" ");
    return name_string.includes(name) || name === name_string.join("");
  });
  console.log(currentManufacturer.name);

  // const keyForId = Object.keys(companyNames).find((key) => {
  //   return currentManufacturer?.name === key || currentManufacturer.name.includes(key);
  // });
  //
  // console.log(keyForId);
  // // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // // @ts-ignore
  // const id = companyNames[keyForId];
  //
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth={"lg"} className={classes.root}>
      {currentManufacturer ? (
        <>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div className={classes.infoContainer}>
              {isDownSm && <h1 className={classes.name}>{currentManufacturer.name}</h1>}
              <div className={classes.imgContainer}>
                <img
                  alt={"Company img"}
                  style={{ width: "100%" }}
                  src={currentManufacturer?.image}
                  onError={(e) => {
                    e.currentTarget.src = placeholderImg;
                  }}
                />
              </div>
              <div style={{ textAlign: isDownSm ? "center" : "start", padding: isDownSm ? 0 : "0 40px 0 0" }}>
                <p style={{ fontWeight: 500, fontSize: "1.1em" }}>{currentManufacturer?.address}</p>
                <p style={{ fontWeight: 600, fontSize: "1.2em" }}>{currentManufacturer?.url}</p>
              </div>
            </div>
          </div>

          <div className={classes.descrContainer}>
            {!isDownSm && <h1 className={classes.name}>{currentManufacturer?.name}</h1>}
            <p style={{ fontSize: "1.2em" }}>
              {constants.id === ID_ICSEARCH ? currentManufacturer?.description_ru : currentManufacturer?.description}
            </p>
            <Button
              className={appClasses.buttonCreate}
              style={{ marginTop: "20px" }}
              onClick={() => {
                navigate(
                  `/search?query=${encodeURIComponent(
                    `MANUFACTURER:${
                      currentManufacturer.name?.trim().includes(" ")
                        ? `"${currentManufacturer?.name}"`
                        : currentManufacturer.name?.trim()
                    } `,
                  )}&m_id=${currentManufacturer.id}`,
                );
              }}
            >
              <span className="MuiButton-label" style={{ padding: "8px 10px" }}>
                СМОТРЕТЬ ПРЕДЛОЖЕНИЯ
              </span>
            </Button>
          </div>
        </>
      ) : (
        <div className={classes.descrContainer}>
          <h1>К сожалению, мы не смогли найти информацию по этому производителю</h1>
          <Button
            className={appClasses.buttonCreate}
            onClick={() => {
              navigate(`/`);
            }}
          >
            <span className="MuiButton-label">На главную</span>
          </Button>
        </div>
      )}
    </Container>
  );
};
export default Manufacturer;
