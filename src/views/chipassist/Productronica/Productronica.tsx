import React from "react";
import { Box, Button, Container } from "@material-ui/core";
import clsx from "clsx";
import { Page } from "@src/components";
import logo from "@src/images/productronica/logo.gif";
import combo_mobile from "@src/images/Homepage/combo_mobile.png";
import person from "@src/images/productronica/person.svg";
import monitor from "@src/images/productronica/web_monitor.svg";
import icon_1 from "@src/images/Homepage/board_aloupr.svg";
import icon_2 from "@src/images/Homepage/case_dsdvgh.svg";
import icon_3 from "@src/images/Homepage/robotics_t2k7b0.svg";
import icon_4 from "@src/images/Homepage/keyboard_pkfwnp.svg";
import icon_5 from "@src/images/Homepage/dotted_fn2una.svg";
import icon_6 from "@src/images/Homepage/choice_myx2cw.svg";
import map from "@src/images/Homepage/map_outimp.png";
import useAppTheme from "@src/theme/useAppTheme";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { Link, useLocation } from "react-router-dom";
import useStyles from "./styles";

export const HomePageView = () => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const { t } = useI18n("home");
  const location = useLocation();

  return (
    <Page title="ChipAssist at Productronica" description="ChipAssist at Productronica">
      <section className={clsx(classes.section, classes.hero)}>
        <Container>
          <Box className={classes.heroImgWrapper}>
            <img className={classes.img} src={logo} alt="productronica_logo" />
          </Box>
          <h1 className={clsx(classes.title, classes.heroTitle)}>ChipAssist at Productronica</h1>
          <p className={classes.heroText}>
            Meet us at booth <span style={{ fontWeight: 600 }}>В3-235</span>
          </p>
        </Container>
      </section>

      <section className={clsx(classes.section, classes.about)}>
        <Container>
          <Box className={classes.flexContainer}>
            <Box className={classes.flexItem}>
              <Box className={classes.aboutImgWrapper}>
                <img className={classes.img} src={combo_mobile} alt="combo_mobile_image" />
              </Box>
            </Box>

            <Box className={clsx(classes.flexItem, classes.aboutItem)}>
              <h2 className={classes.title}>About ChipAssist</h2>
              <p className={classes.aboutText}>
                ChipAssist is the place where electronic components providers, third-party services, and end-users
                connect.
              </p>
              <p className={classes.aboutText}>
                Visit us at booth <span style={{ fontWeight: 600 }}>В3-235</span> to see a demo or to know more about
                the services of ChipAssist.
              </p>
            </Box>
          </Box>
        </Container>
      </section>

      <section className={clsx(classes.section, classes.join)}>
        <Container>
          <Box className={classes.flexContainer} justifyContent="space-around">
            <Box className={clsx(classes.flexItem, classes.joinItem)}>
              <h3 className={classes.title}>Join as a customer</h3>
              <Box className={classes.iconWrapper}>
                <img className={classes.img} src={person} alt="person_icon" />
              </Box>
              <p className={classes.joinText}>
                I am an end-user looking for electronic components, printed circuit boards, or other products
              </p>
              <Link
                to={{ pathname: "/auth/registration", state: { background: location.state?.background || location } }}
              >
                <Button className={appTheme.buttonCreate} variant="contained">
                  JOIN AS A CUSTOMER
                </Button>
              </Link>
            </Box>
            <Box className={clsx(classes.flexItem, classes.joinItem)}>
              <h3 className={classes.title}>Join as a partner</h3>
              <Box className={classes.iconWrapper}>
                <img className={classes.img} src={monitor} alt="monitor_icon" />
              </Box>
              <p className={classes.joinText}>
                I am a supplier of electronic components, printed circuit boards or services on the electronics market
              </p>
              <a target="_blank" rel="noreferrer" href="https://forms.gle/jVRzqheSnvF4TSe88">
                <Button className={appTheme.buttonCreate} variant="contained">
                  JOIN AS A PARTNER
                </Button>
              </a>
            </Box>
          </Box>
        </Container>
      </section>

      <section className={classes.section}>
        <Container>
          <h2 className={clsx(classes.title, classes.servicesTitle)}>{t("services_section.title")}</h2>
          <Box className={classes.servicesWrapper}>
            <Box className={classes.servicesItem}>
              <img className={classes.servicesIcon} src={icon_1} alt="icon" />
              <h3 className={classes.servicesItemTitle}>{t("services_section.sub_title_1")}</h3>
              <p>{t("services_section.text_1")}</p>
            </Box>
            <Box className={classes.servicesItem}>
              <img className={classes.servicesIcon} src={icon_2} alt="icon" />
              <h3 className={classes.servicesItemTitle}>{t("services_section.sub_title_2")}</h3>
              <p>{t("services_section.text_2")}</p>
            </Box>
            <Box className={classes.servicesItem}>
              <img className={classes.servicesIcon} src={icon_3} alt="icon" />
              <h3 className={classes.servicesItemTitle}>{t("services_section.sub_title_3")}</h3>
              <p>{t("services_section.text_3")}</p>
            </Box>
          </Box>
          <Box className={classes.servicesWrapper}>
            <Box className={classes.servicesItem}>
              <img className={classes.servicesIcon} src={icon_4} alt="icon" />
              <h3 className={classes.servicesItemTitle}>{t("services_section.sub_title_4")}</h3>
              <p>{t("services_section.text_4")}</p>
            </Box>
            <Box className={classes.servicesItem}>
              <img className={classes.servicesIcon} src={icon_5} alt="icon" />
              <h3 className={classes.servicesItemTitle}>{t("services_section.sub_title_5")}</h3>
              <p>{t("services_section.text_5")}</p>
            </Box>
            <Box className={classes.servicesItem}>
              <img className={classes.servicesIcon} src={icon_6} alt="icon" />
              <h3 className={classes.servicesItemTitle}>{t("services_section.sub_title_6")}</h3>
              <p>{t("services_section.text_6")}</p>
            </Box>
          </Box>
        </Container>
      </section>

      <section className={classes.contacts}>
        <Box className={classes.contactsWrapper}>
          <Box className={clsx(classes.itemWrapper, classes.contactsItemWrapper)}>
            <h2 className={classes.contactsTitle}>{t("contacts.title")}</h2>
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
          </Box>
          <Box className={`${classes.itemWrapper} ${classes.mapWrapper}`}>
            <img className={clsx(classes.img, classes.map)} src={map} alt="map_image" />
          </Box>
        </Box>
      </section>
    </Page>
  );
};

export default HomePageView;
