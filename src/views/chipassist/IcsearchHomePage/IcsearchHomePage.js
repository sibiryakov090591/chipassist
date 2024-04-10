import React, { useEffect, useState } from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { Page } from "@src/components";
import { Box, Button, Container, Grid, Paper } from "@material-ui/core";
import constants from "@src/constants/constants";
import map_replace from "@src/images/Homepage/icsearch/map-replace.png";
import devices from "@src/images/Homepage/icsearch/devices.png";
import board from "@src/images/Homepage/board_aloupr.svg";
import clsx from "clsx";
import useAppTheme from "@src/theme/useAppTheme";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAppSelector from "@src/hooks/useAppSelector";
import Preloader from "@src/components/Preloader/Preloader";
import { logout } from "@src/store/authentication/authActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import SearchSuggestion from "@src/layouts/HomePage/components/TopBar/components/SearchSuggestion/SearchSuggestion";
import TrySearchPn from "@src/components/TrySearchPn/TrySearchPn";
import { partNumbers } from "@src/layouts/HomePage/components/TopBar/TopBar";
import useStyles from "./styles";

const logo_img = `/${constants.logos.distPath}/${constants.logos.mainLogoDarkBack}`;

const companyNames = [
  "Geehy Semiconductor",
  "GigaDevice",
  "Jiangsu Electronic",
  "Yageo",
  "Amtek Technology",
  "SMIC",
  "Analog Devices",
  "Amphenol",
  "Microchip",
  "Wingtech",
  "Giga Device",
  "NXP Semiconductors",
  "UNISOC",
  "ST Microelectronics",
  "Nation Technologies",
  "Texas Instruments",
  "Rockchip",
  "ON Semiconductor",
  "Maxscend",
  "Murata",
  "Sanechips",
  "Omron",
  "CR Micro",
  "Renesas Electronics",
  "TE Connectivity",
  "GoerTek",
  "Wurth Electronics",
  "Xilinx",
  "SMC",
  "Sanken Electric Company",
  "Sanmotion",
];

export const IcsearchHomePage = () => {
  const { t } = useI18n("home");
  const classes = useStyles();
  const appTheme = useAppTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  const isLgUp = useMediaQuery(theme.breakpoints.up(1700));

  const { partNumberExamples } = useAppSelector((state) => state.search);
  const manufacturerId = useAppSelector((state) => state.search.manufacturer?.id);

  const [randomPartNumbers, setRandomPartNumbers] = useState(null);

  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  useEffect(() => {
    if (partNumberExamples?.length) {
      // eslint-disable-next-line no-underscore-dangle
      const _partNumbers = [...partNumberExamples].filter((i) => i.length <= 14 && i.length >= 6);
      const result = [];
      while (result.length < Math.min(_partNumbers.length, 60)) {
        const index = Math.floor(Math.random() * _partNumbers.length);
        result.push(_partNumbers[index]);
        _partNumbers.splice(index, 1);
      }
      setRandomPartNumbers(result);
    }
  }, [partNumberExamples]);

  const createPcbHandler = () => {
    navigate("/pcb");
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const logoLink = (
    <div className={classes.logoCont}>
      <Link to="/" onClick={() => window.location.pathname === "/" && navigate(0)}>
        <img alt="Logo" className={classes.logoImg} src={logo_img} />
      </Link>
    </div>
  );

  return (
    <Page
      title={t("page_title", { name: constants.title })}
      description={t("page_description", { name: constants.title })}
    >
      <section className={classes.hero}>
        {isMdUp && (
          <div className={classes.heroMenuContainer}>
            <Container maxWidth={"xl"}>
              <nav className={classes.heroMenu}>
                {logoLink}
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  className={classes.heroMenuElementsContainer}
                  justifyContent={"space-evenly"}
                >
                  <NavLink className={`${classes.heroMenuLink}`} to={`/`}>
                    {t("menu.home")}
                  </NavLink>
                  <NavLink className={`${classes.heroMenuLink}`} to={`/parts`}>
                    {t("menu.parts")}
                  </NavLink>
                  <NavLink className={`${classes.heroMenuLink}`} to={`/bom/create-file`}>
                    {t("menu.bom")}
                  </NavLink>
                  <NavLink className={`${classes.heroMenuLink}`} to={`/rfq-list-quotes`}>
                    {t("menu.rfq_list")}
                  </NavLink>
                  <NavLink className={`${classes.heroMenuLink}`} to={`/pcb`}>
                    {t("menu.pcb")}
                  </NavLink>
                  {isAuthenticated && (
                    <NavLink className={`${classes.heroMenuLink}`} to={`/profile/general`}>
                      {t("menu.profile")}
                    </NavLink>
                  )}
                </Box>
                <Box display="flex" alignItems="center" className={classes.profileOptions}>
                  {!isAuthenticated ? (
                    <>
                      <NavLink to={"/auth/login"} className={classes.headerLink}>
                        {t("menu.sign_in")}
                      </NavLink>
                      <Box m="0 8px" style={{ color: "white" }}>
                        /
                      </Box>
                      <NavLink to={"/auth/registration"} className={classes.headerLink}>
                        Регистрация
                      </NavLink>
                    </>
                  ) : (
                    <NavLink
                      id="profilebutton"
                      to={"/logout"}
                      onClick={logoutHandler}
                      style={{ marginRight: 16, marginLeft: 16 }}
                      className={classes.headerLink}
                    >
                      {t("menu.logout")}
                    </NavLink>
                  )}
                </Box>
              </nav>
            </Container>
          </div>
        )}

        <Container maxWidth={isLgUp ? "xl" : "lg"} className={classes.heroMainContentContainer}>
          <div>
            <h1 className={classes.heroTitle}>
              {isSmDown ? t("page_title_1.reinvented_mobile") : t("page_title_1.reinvented")}
            </h1>
            <span className={classes.heroSubTitle}>
              {isMdUp ? t("page_title_1.slogan") : t("page_title_1.slogan_mobile")}
            </span>

            <SearchSuggestion
              searchInputClass={classes.searchInput}
              searchButtonClass={clsx(classes.searchIconButton, classes.searchButtonColor)}
              searchIconClass={classes.searchIcon}
              searchClearClass={classes.clearSearchIcon}
              isHomePageSuggestions={true}
              isHero={isMdUp}
            />
            <TrySearchPn
              partNumbers={partNumberExamples || partNumbers}
              textClassName={classes.tryP}
              pnClassName={classes.trySpan}
            />
            {isMdUp && (
              <div className={classes.heroItems}>
                <div className={classes.heroItem}>
                  <h3 className={classes.heroItemTitle}>{t("hero_item1.desktop.h")}</h3>
                  <p className={classes.heroItemText}>{t("hero_item1.desktop.p")}</p>
                </div>
                <div className={classes.heroItem}>
                  <h3 className={classes.heroItemTitle}>{t("hero_item2.h")}</h3>
                  <p className={classes.heroItemText}>{t("hero_item2.p")}</p>
                </div>
                <div className={classes.heroItem}>
                  <h3 className={classes.heroItemTitle}>{t("hero_item3.h")}</h3>
                  <p className={classes.heroItemText}>{t("hero_item3.p")}</p>
                </div>
              </div>
            )}
            <div className={classes.heroItems}>
              <p className={classes.underSearchText} style={{ textAlign: !isMdUp ? "center" : "left" }}>
                {t("hero_item4")}{" "}
                <Link className={classes.pcb_link} to={"/pcb"}>
                  ссылке
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className={classes.section}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <h1 className={classes.title}>{t("hero.title")}</h1>
              <p className={classes.paragraph}>{t("hero.paragraph_1")}</p>
              <p className={classes.paragraph}>{t("hero.paragraph_2")}</p>
              <p className={classes.paragraph}>{t("hero.paragraph_3")}</p>
              <p className={classes.paragraph}>{t("hero.paragraph_4")}</p>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box className={classes.imgWrapper} display="flex" alignItems="center" justifyContent="center">
                <img className={classes.mapImg} src={map_replace} alt="Map" />
              </Box>
            </Grid>
          </Grid>
          <Grid className={classes.heroCardsWrapper} container spacing={4}>
            <Grid item md={4} xs={12}>
              <Paper className={classes.heroCard} elevation={3}>
                <Box className={classes.heroCardTitle}>10 000 000+</Box>
                <p className={classes.heroCardText}>{t("hero.card_1")}</p>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.heroCard} elevation={3}>
                <Box className={classes.heroCardTitle}>50+</Box>
                <p className={classes.heroCardText}>{t("hero.card_2")}</p>
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className={classes.heroCard} elevation={3}>
                <Box className={classes.heroCardTitle}>100+</Box>
                <p className={classes.heroCardText}>{t("hero.card_3")}</p>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={clsx(classes.section, classes.work)}>
        <Container maxWidth="lg">
          <h1 className={clsx(classes.title, classes.workTitle)}>{t("work.title")}</h1>
          <p className={clsx(classes.paragraph, classes.workText)}>{t("work.paragraph")}</p>
          <Grid container spacing={4}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Paper className={classes.workCard} elevation={3}>
                <Box>
                  <h2 className={classes.workCardTitle}>{t("work.card_1.title")}</h2>
                </Box>
                <p className={classes.workCardText}>{t("work.card_1.text")}</p>
              </Paper>
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Paper className={classes.workCard} elevation={3}>
                <Box>
                  <h2 className={classes.workCardTitle}>{t("work.card_2.title")}</h2>
                </Box>
                <p className={classes.workCardText}>{t("work.card_2.text")}</p>
              </Paper>
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Paper className={classes.workCard} elevation={3}>
                <Box>
                  <h2 className={classes.workCardTitle}>{t("work.card_6.title")}</h2>
                </Box>
                <p className={classes.workCardText}>{t("work.card_6.text")}</p>
              </Paper>
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Paper className={classes.workCard} elevation={3}>
                <Box>
                  <h2 className={classes.workCardTitle}>{t("work.card_4.title")}</h2>
                </Box>
                <p className={classes.workCardText}>{t("work.card_4.text")}</p>
              </Paper>
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Paper className={classes.workCard} elevation={3}>
                <Box>
                  <h2 className={classes.workCardTitle}>{t("work.card_5.title")}</h2>
                </Box>
                <p className={classes.workCardText}>{t("work.card_5.text")}</p>
              </Paper>
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Paper className={classes.workCard} elevation={3}>
                <Box>
                  <h2 className={classes.workCardTitle}>{t("work.card_3.title")}</h2>
                </Box>
                <p className={classes.workCardText}>{t("work.card_3.text")}</p>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={classes.section}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item md={6} sm={12}>
              <Box className={classes.imgWrapper} display="flex" alignItems="center" justifyContent="center">
                <img className={classes.devicesImg} src={devices} alt="devices" />
              </Box>
            </Grid>
            <Grid item md={6} sm={12} style={{ textAlign: isSmDown ? "center" : "left" }}>
              <h1 className={classes.title}>{t("search.title")}</h1>
              <p className={classes.paragraph}>{t("search.paragraph_1")}</p>
              <p className={classes.paragraph}>{t("search.paragraph_2")}</p>
            </Grid>
          </Grid>
        </Container>
      </section>

      <section className={clsx(classes.section, classes.manufacturers)}>
        <Container maxWidth="lg">
          <h1 className={classes.title}>{t("manufacturers.title")}</h1>
          <p style={{ fontSize: "1.2rem" }} className={classes.paragraph}>
            {t("manufacturers.paragraph_1")}
          </p>
          <div className={classes.manufacturersWrapper}>
            {companyNames.map((manufacturer) => {
              const name = manufacturer?.trim() || "";
              return (
                <Link
                  key={manufacturer}
                  to={`/manufacturers/${name.toLowerCase().split(" ").join("")}`}
                  className={classes.manufacturerName}
                >
                  {manufacturer}
                </Link>
              );
            })}
          </div>
          <p style={{ fontSize: "1.2rem" }} className={classes.paragraph}>
            {t("manufacturers.paragraph_4")}
            <Link to={`/brands`} className={appTheme.hyperlink}>
              {t("manufacturers.paragraph_4_link")}
            </Link>
          </p>
          <p className={classes.subText}>
            {t("manufacturers.paragraph_2")}
            <br />
            {t("manufacturers.paragraph_3")}
          </p>
        </Container>
      </section>

      <section className={clsx(classes.section, classes.partNumbers)}>
        <Container maxWidth="lg">
          <h1 className={clsx(classes.title, classes.partNumbersTitle)}>{t("part_numbers.title")}</h1>
          {!randomPartNumbers && (
            <Box display="flex" alignItems="center" justifyContent="center" padding="60px 0">
              <Preloader title={t("part_numbers.loading")} />
            </Box>
          )}
          <div className={classes.partNumbersWrapper}>
            {randomPartNumbers?.map((partNumber) => {
              return (
                <div key={partNumber} className={classes.partNumberName}>
                  <Link
                    to={`/search?query=${encodeURIComponent(partNumber)}${
                      manufacturerId ? `&m_id=${manufacturerId}` : ""
                    }`}
                  >
                    {partNumber}
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className={clsx(classes.section, classes.pcb)}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item md={8} xs={12}>
              <h1 className={clsx(classes.title, classes.pcbTitle)}>{t("pcb.title")}</h1>
              <p className={clsx(classes.paragraph, classes.pcbText)}>{t("pcb.paragraph_1")}</p>
              <p className={clsx(classes.paragraph, classes.pcbText)}>{t("pcb.paragraph_2")}</p>
              <Button onClick={createPcbHandler} className={appTheme.buttonPrimary} variant="contained">
                {t("pcb.button")}
              </Button>
            </Grid>
            <Grid item md={4} xs={12}>
              <Box className={classes.imgWrapper} display="flex" alignItems="center" justifyContent="center">
                <img className={classes.boardImg} src={board} alt="board" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>
    </Page>
  );
};

export default IcsearchHomePage;
