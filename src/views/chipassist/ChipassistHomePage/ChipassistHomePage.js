import React from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import { Page } from "@src/components";
import { Box, Button, Container, Grid, Hidden } from "@material-ui/core";
import constants from "@src/constants/constants";
import clsx from "clsx";
import combo_mobile from "@src/images/Homepage/devices_ca.png";
import mobile from "@src/images/Homepage/mobile.png";
import bom from "@src/images/Homepage/BOM2.png";
import icon_1 from "@src/images/Homepage/board_aloupr.svg";
import icon_2 from "@src/images/Homepage/case_dsdvgh.svg";
import icon_3 from "@src/images/Homepage/robotics_t2k7b0.svg";
import icon_4 from "@src/images/Homepage/keyboard_pkfwnp.svg";
import icon_5 from "@src/images/Homepage/dotted_fn2una.svg";
import icon_6 from "@src/images/Homepage/choice_myx2cw.svg";
import circuit_byte from "@src/images/Homepage/partners/CircuitByte.png";
import ems_scout from "@src/images/Homepage/partners/EMS-SCOUT.png";
import luminovo from "@src/images/Homepage/partners/luminovo.svg";
import questcomp from "@src/images/Homepage/partners/questcomp.png";
import pcb_icon from "@src/images/Homepage/pcb_icon.svg";
import map from "@src/images/Homepage/map_outimp.png";
import useAppTheme from "@src/theme/useAppTheme";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAppSelector from "@src/hooks/useAppSelector";
import list_icon from "@src/images/Icons/list.svg";
import SearchSuggestion from "@src/layouts/HomePage/components/TopBar/components/SearchSuggestion/SearchSuggestion";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Footer from "@src/components/Footer/Footer";
import TrySearchPn from "@src/components/TrySearchPn/TrySearchPn";
import { partNumbers } from "@src/layouts/HomePage/components/TopBar/TopBar";
import { logout } from "@src/store/authentication/authActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import ReplyIcon from "@material-ui/icons/Reply";
import { useStyles } from "./styles";

const logo_img = `/${constants.logos.distPath}/${constants.logos.mainLogoDarkBack}`;

export const ChipassistHomePage = () => {
  const { t } = useI18n("home");
  const classes = useStyles();
  const appTheme = useAppTheme();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useAppDispatch();

  const aboutUsRef = React.useRef(null);
  const contactsRef = React.useRef(null);

  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);
  const cart = useAppSelector((state) => state.cart);

  const logoLink = (
    <div className={classes.logoCont}>
      <Link to="/" onClick={() => window.location.pathname === "/" && navigate(0)}>
        <img alt="Logo" className={classes.logoImg} src={logo_img} />
      </Link>
    </div>
  );

  const cartBlock = (
    <Link to="/cart" className={classes.cartBlock}>
      <div className={classes.cartImageCont}>
        <img className={classes.listIcon} src={list_icon} alt="rfq list" />
        {cart.count > 0 && (
          <div className={clsx(classes.cartCount, appTheme.topBarCartCount, "cart-count")}>{cart.count}</div>
        )}
      </div>
    </Link>
  );

  const scrollTo = (ref) => (e) => {
    e.preventDefault();
    if (ref.current) {
      window.scrollTo({ top: ref.current.offsetTop + 30, behavior: "smooth" });
    }
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <Page title={t("page_title", { name: constants.title })} description={t("page_description")}>
      <div className={classes.main}>
        {isMdUp && (
          <section className={classes.header}>
            <Container maxWidth="lg" className={classes.headerContainer}>
              <div>
                <NavLink to="/sell-excess-inventory" className={classes.headerButtonLink}>
                  Sell on <span className={classes.redColor}>ChipAssist</span>
                </NavLink>
              </div>
              <div>
                <a href="mailto:info@chipassist.com" className={classes.headerLink}>
                  info@chipassist.com
                </a>
                <a href="tel:+41797137881" style={{ marginLeft: 18 }} className={classes.headerLink}>
                  +41 79 713 7881
                </a>
                {!isAuthenticated ? (
                  <>
                    <NavLink to={"/auth/registration"} style={{ marginLeft: 40 }} className={classes.headerLink}>
                      Register
                    </NavLink>
                    {" / "}
                    <NavLink to={"/auth/login"} className={classes.headerLink}>
                      Sign In
                    </NavLink>
                  </>
                ) : (
                  <NavLink
                    id="profilebutton"
                    to={"/logout"}
                    onClick={logoutHandler}
                    style={{ marginLeft: 40 }}
                    className={classes.headerLink}
                  >
                    Logout
                  </NavLink>
                )}
              </div>
            </Container>
          </section>
        )}

        <section className={classes.hero}>
          <Container maxWidth="lg">
            {isMdUp && (
              <nav className={classes.heroMenu}>
                <Box display="flex" alignItems="center">
                  {logoLink}
                  <NavLink className={`${classes.heroMenuLink}`} to={`/about_company`}>
                    About us
                  </NavLink>
                  <NavLink className={`${classes.heroMenuLink}`} to={`/parts`}>
                    {t("menu.parts")}
                  </NavLink>
                  <NavLink className={`${classes.heroMenuLink}`} to={`/bom/create-file`}>
                    {t("menu.bom")}
                  </NavLink>
                  {isAuthenticated && (
                    <NavLink className={`${classes.heroMenuLink}`} to={`/profile/general`}>
                      {t("menu.profile")}
                    </NavLink>
                  )}
                  <a className={`${classes.heroMenuLink}`} href="#contacts" onClick={scrollTo(contactsRef)}>
                    Contacts
                  </a>
                </Box>
                <Box display="flex" alignItems="center">
                  <NavLink to="/pcb" className={clsx(classes.headerButtonLink, classes.heroButtonLink)}>
                    Request PCB
                  </NavLink>
                  {cartBlock}
                </Box>
              </nav>
            )}

            <Grid container spacing={3} className={classes.heroMain}>
              <Grid item xs={12} md={6}>
                <Box className={classes.heroSearchBlock}>
                  <h1 className={classes.heroTitle}>
                    Global marketplace for <br />
                    <span className={classes.blueColor}>simple purchases of electronic components.</span>
                  </h1>
                  <h2 className={classes.heroSubTitle}>
                    We believe finding electronic components should be easy. Shop across distributors, manufacturers,
                    and parts, or compare pricing and monitor inventory.
                  </h2>
                  <Hidden smDown>
                    <SearchSuggestion
                      searchInputClass={classes.searchInput}
                      searchButtonClass={clsx(classes.searchIconButton, appTheme.topBarSearchButton)}
                      searchIconClass={classes.searchIcon}
                      searchClearClass={classes.clearSearchIcon}
                      isHomePageSuggestions={true}
                    />
                    <TrySearchPn partNumbers={partNumbers} textClassName={classes.tryP} pnClassName={classes.trySpan} />
                  </Hidden>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <img className={classes.heroImg} src={combo_mobile} alt="combo_mobile" />
              </Grid>
            </Grid>

            <Box className={classes.counts}>
              <h3 className={clsx(classes.title, classes.countsTitle)}>
                ChipAssist <span className={classes.redColor}>today</span>
              </h3>
              <Box className={classes.countsItems}>
                <Box className={classes.countsItem}>
                  <div className={classes.count}>20,000,000+</div>
                  <div className={classes.countLabel}>Parts in the catalog</div>
                </Box>
                <Box className={classes.countsItem}>
                  <div className={classes.count}>1,000+</div>
                  <div className={classes.countLabel}>Active customers</div>
                </Box>
                <Box className={classes.countsItem}>
                  <div className={classes.count}>130+</div>
                  <div className={classes.countLabel}>Worldwide stocks</div>
                </Box>
                <Box className={classes.countsItem}>
                  <div className={classes.count}>50+</div>
                  <div className={classes.countLabel}>PCB manufacturers</div>
                </Box>
                <Box className={classes.countsItem}>
                  <div className={classes.count}>40+</div>
                  <div className={classes.countLabel}>Countries</div>
                </Box>
              </Box>
            </Box>
          </Container>
        </section>

        <section ref={aboutUsRef} className={classes.services}>
          <Container maxWidth="lg">
            <h2 style={{ textAlign: "center" }} className={clsx(classes.title, classes.titleDark)}>
              All services <span className={classes.redColor}>in one place</span>
            </h2>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Box className={classes.servicesItem}>
                  <img className={classes.servicesIcon} src={icon_1} alt="icon" />
                  <h3 className={classes.servicesItemTitle}>{t("services_section.sub_title_1")}</h3>
                  <p>{t("services_section.text_1")}</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className={classes.servicesItem}>
                  <img className={classes.servicesIcon} src={icon_2} alt="icon" />
                  <h3 className={classes.servicesItemTitle}>{t("services_section.sub_title_2")}</h3>
                  <p>{t("services_section.text_2")}</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className={classes.servicesItem}>
                  <img className={classes.servicesIcon} src={icon_3} alt="icon" />
                  <h3 className={classes.servicesItemTitle}>{t("services_section.sub_title_3")}</h3>
                  <p>{t("services_section.text_3")}</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className={classes.servicesItem}>
                  <img className={classes.servicesIcon} src={icon_4} alt="icon" />
                  <h3 className={classes.servicesItemTitle}>{t("services_section.sub_title_4")}</h3>
                  <p>{t("services_section.text_4")}</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className={classes.servicesItem}>
                  <img className={classes.servicesIcon} src={icon_5} alt="icon" />
                  <h3 className={classes.servicesItemTitle}>{t("services_section.sub_title_5")}</h3>
                  <p>{t("services_section.text_5")}</p>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box className={classes.servicesItem}>
                  <img className={classes.servicesIcon} src={icon_6} alt="icon" />
                  <h3 className={classes.servicesItemTitle}>{t("services_section.sub_title_6")}</h3>
                  <p>{t("services_section.text_6")}</p>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </section>

        <section className={classes.workplace}>
          <Container maxWidth="lg">
            <h2 style={{ textAlign: "center" }} className={clsx(classes.title)}>
              {t("workplace_section.title")}
            </h2>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Box className={classes.imgWrapper}>
                  <img className={classes.img} src={mobile} alt="mobile_image" />
                </Box>
              </Grid>
              <Grid item md={6} xs={12} style={{ textAlign: "center" }}>
                <p style={{ marginBottom: 10 }} className={classes.workplaceText}>
                  ChipAssist introduces <strong>Rapid RFQ Exchange</strong> service
                </p>
                <p style={{ fontSize: "1.2rem" }} className={classes.workplaceText}>
                  Your every request is automatically sent to the tens of independent suppliers giving you the best
                  possible price offering available on the market
                </p>
                <Box className={classes.workplaceListWrapper}>
                  <p className={classes.workplaceListTitle}>
                    {t("workplace_section.list_title", { name: constants.title })}
                  </p>
                  <ul className={classes.workplaceList}>
                    <li className={classes.workplaceListItem}>{t("workplace_section.line_1")}</li>
                    <li className={classes.workplaceListItem}>{t("workplace_section.line_2")}</li>
                    <li className={classes.workplaceListItem}>{t("workplace_section.line_3")}</li>
                    <li className={classes.workplaceListItem}>{t("workplace_section.line_4")}</li>
                    <li className={classes.workplaceListItem}>{t("workplace_section.line_5")}</li>
                  </ul>
                </Box>
                {!isAuthenticated && (
                  <div className={classes.actionWrapper}>
                    <Button
                      component={Link}
                      to="/auth/registration"
                      color="primary"
                      variant="contained"
                      className={clsx(appTheme.buttonCreate, classes.button, classes.registerButton)}
                    >
                      Sign up now
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          </Container>
        </section>

        <section className={classes.connect}>
          <Container maxWidth="lg">
            <h2 style={{ marginBottom: 0 }} className={clsx(classes.title)}>
              Connecting the <span className={classes.redColor}>world of electronics</span>
            </h2>
            <p className={classes.connectSubTitle}>
              You can buy from several suppliers at once and send requests for the components you need.
            </p>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <div className={classes.connectItem}>
                  <div className={classes.connectItemIndex}>1</div>
                  <div className={classes.connectItemTitle}>Join the trusted ecosystem</div>
                  <div className={classes.connectItemText}>
                    Engage with the network of 1000+ trusted clients worldwide.
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div className={classes.connectItem}>
                  <div className={classes.connectItemIndex}>2</div>
                  <div className={classes.connectItemTitle}>Save marketing budget</div>
                  <div className={classes.connectItemText}>
                    Get ready-made customer`s requests right into your sales pipeline.
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div className={classes.connectItem}>
                  <div className={classes.connectItemIndex}>3</div>
                  <div className={classes.connectItemTitle}>Manage your excess stocks</div>
                  <div className={classes.connectItemText}>
                    Quickly and efficiently sell your surpluses and overstocks on the market.
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div className={classes.connectItem}>
                  <div className={classes.connectItemIndex}>4</div>
                  <div className={classes.connectItemTitle}>ChipAssist in your software</div>
                  <div className={classes.connectItemText}>
                    Integrate ChipAssist with your software through our advanced API.
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </section>

        <section className={classes.partners} id="partners">
          <Container maxWidth="lg">
            <h1 style={{ textAlign: "center" }} className={clsx(classes.title, classes.titleDark)}>
              Partner with <span className={classes.redColor}>ChipAssist</span>
            </h1>
            <p className={classes.partnersText}>
              Partner with ChipAssist for API integrations, excess data stocks, user requests, and market trends to
              enhance your business capabilities. Gain an edge in the market and stay ahead of the curve.
            </p>
            <Grid style={{ borderBottom: "1px solid #eee" }} container>
              <Grid item xs={6} sm={3} className={classes.partnersItem}>
                <a
                  className={classes.partnerLink}
                  href="https://luminovo.ai/?utm_campaign=Partner%20Referrals&utm_source=chipassist&utm_medium=partner-referral"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className={classes.partnerLogo} src={luminovo} alt="luminovo logo" />
                  <span className={classes.partnerArrow}>
                    <ReplyIcon />
                  </span>
                </a>
              </Grid>
              <Grid item xs={6} sm={3} className={classes.partnersItem}>
                <a
                  className={classes.partnerLink}
                  href="https://circuit-byte.com/?lang=en"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img className={classes.partnerLogo} src={circuit_byte} alt="circuit-byte logo" />
                  <span className={classes.partnerArrow}>
                    <ReplyIcon />
                  </span>
                </a>
              </Grid>
              <Grid item xs={6} sm={3} className={classes.partnersItem}>
                <a className={classes.partnerLink} href="https://ems-scout.net" target="_blank" rel="noreferrer">
                  <img className={classes.partnerLogo} src={ems_scout} alt="ems-scout logo" />
                  <span className={classes.partnerArrow}>
                    <ReplyIcon />
                  </span>
                </a>
              </Grid>
              <Grid item xs={6} sm={3} className={classes.partnersItem}>
                <a className={classes.partnerLink} href="https://www.questcomp.com" target="_blank" rel="noreferrer">
                  <img className={clsx(classes.partnerLogo, classes.questComp)} src={questcomp} alt="questcomp logo" />
                  <span className={classes.partnerArrow}>
                    <ReplyIcon />
                  </span>
                </a>
              </Grid>
            </Grid>
          </Container>
        </section>

        <section className={classes.excess}>
          <Container maxWidth="lg">
            <Grid container spacing={1}>
              <Grid item md={5} xs={12} style={{ display: "flex", alignItems: "center" }}>
                <Box className={classes.excessImgWrapper} />
              </Grid>
              <Grid item md={7} xs={12}>
                <Box className={classes.excessTextWrapper}>
                  <h1 className={clsx(classes.title, classes.titleDark, classes.excessTitle)}>
                    Sell your excess <span className={classes.redColor}>inventory</span>
                  </h1>
                  <p className={classes.bomText}>{t("excess_sections.paragraph_1")}</p>
                  <p className={classes.bomText}>{t("excess_sections.paragraph_2")}</p>
                  <Button
                    component={Link}
                    to="/sell-excess-inventory"
                    color="primary"
                    variant="contained"
                    className={clsx(appTheme.buttonCreate, classes.button)}
                  >
                    {t("excess_sections.button")}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </section>

        <section className={classes.pcb}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item md={7} xs={12}>
                <h2 className={classes.title}>
                  Get your next <span className={classes.redColor}>PCB with us</span>
                </h2>
                <p className={classes.pcbText}>
                  Just upload your Gerber files and engage with 50+ PCB suppliers to get the best offering in 48 hours.
                </p>
                <ul className={classes.pcbList}>
                  <li>Send us freeform PCB specification or specify all necessary details</li>
                  <li>Get professional assistance from our qualified engineering team</li>
                  <li>Choose the best terms from proposed quotations from different vendors</li>
                  <li>Control the quality of PCBs with our on-site QC team</li>
                </ul>
                <div className={classes.actionWrapper}>
                  <Button
                    style={{ marginTop: 25 }}
                    component={Link}
                    to="/pcb"
                    color="primary"
                    variant="contained"
                    className={clsx(appTheme.buttonCreate, classes.button)}
                  >
                    Request PCB
                  </Button>
                </div>
              </Grid>
              <Grid item md={5} xs={12}>
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                  <img src={pcb_icon} alt="PCB image" />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </section>

        <section className={classes.bom}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <h2 className={clsx(classes.title, classes.titleDark, classes.bomTitle)}>
                  Working with <span className={classes.redColor}>BOMs</span>
                </h2>
                <p className={classes.bomText}>{t("bom_sections.paragraph_1")}</p>
                <p className={classes.bomText}>{t("bom_sections.paragraph_2")}</p>
                {isMdUp && (
                  <div className={classes.actionWrapper}>
                    <Button
                      component={Link}
                      to="/bom/create-file"
                      color="primary"
                      variant="contained"
                      className={clsx(appTheme.buttonCreate, classes.button)}
                    >
                      {t("bom.upload.upload")}
                    </Button>
                  </div>
                )}
              </Grid>
              <Grid item md={6} xs={12}>
                <Box className={classes.imgWrapper}>
                  <img className={classes.img} src={bom} alt="bom_image" />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </section>

        <section ref={contactsRef} className={classes.contacts}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item md={6} xs={12} className={classes.contactsItemWrapper}>
                <h2 style={{ textAlign: "start" }} className={clsx(classes.title, classes.titleDark)}>
                  Our <span className={classes.redColor}>contacts</span>
                </h2>
                <p className={classes.contactsName}>{t("contacts.name")}</p>
                <p className={classes.contactsAddress}>
                  {t("contacts.address_1")}
                  <br />
                  {t("contacts.address_2")}
                </p>
                <Box style={{ marginBottom: 5 }}>
                  {t("contacts.tel_title")}
                  <a className={classes.contactsLink} href={`tel:+41797137881`}>
                    {" "}
                    {t("contacts.tel")}
                  </a>
                </Box>
                <Box>
                  {t("contacts.email_title")}
                  <a className={classes.contactsLink} href={`mailto:${t("contacts.email")}`}>
                    {" "}
                    {t("contacts.email")}
                  </a>
                </Box>
              </Grid>
              <Grid item md={6} xs={12} className={classes.mapWrapper}>
                <img className={classes.img} src={map} alt="map_image" />
              </Grid>
            </Grid>
          </Container>
        </section>
        {isMdUp && <Footer />}
      </div>
    </Page>
  );
};

export default ChipassistHomePage;
