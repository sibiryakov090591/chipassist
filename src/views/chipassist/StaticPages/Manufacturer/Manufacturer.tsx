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
import { changeManufacturer, setQueryValue } from "@src/store/search/searchActions";
import useAppDispatch from "@src/hooks/useAppDispatch";

export const Manufacturer = () => {
  const { name } = useParams();
  const dispatch = useAppDispatch();
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
                dispatch(changeManufacturer({ id: currentManufacturer.id, name: currentManufacturer.name?.trim() }));
                dispatch(setQueryValue(""));
                navigate(`/search?query=&m_id=${currentManufacturer.id}`);
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
