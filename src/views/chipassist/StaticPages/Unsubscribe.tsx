import { Page } from "@src/components";
import React, { useState } from "react";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import useAppTheme from "@src/theme/useAppTheme";
import { NavLink } from "react-router-dom";
import {
  ID_CHIPASSIST,
  ID_ELFARO,
  ID_ICSEARCH,
  ID_MASTER,
  ID_SUPPLIER_RESPONSE,
} from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import { chipAssistMenuList } from "@src/layouts/HomePage/components/TopBar/components/TopMenu/TopMenu";
import { responsesMenuList } from "@src/layouts/SupplierLayout/components/TopMenu/TopMenu";
import clsx from "clsx";
import useURLSearchParams from "@src/components/ProductCard/useURLSearchParams";
import { unsubscribeUser } from "@src/store/profile/profileActions";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { sendFeedbackMessageThunk } from "@src/store/feedback/FeedbackActions";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: "1em",
    },
  },
  menuContainer: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    fontSize: "1.3rem",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  divider: {
    margin: "0 8px",
  },
  title: {
    textAlign: "center",
    fontSize: "3.5rem",
    fontWeight: "bold",
    color: "#345",
    paddingTop: "10px",
    margin: "21px 0",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5rem",
    },
  },
  titleICS: {
    textAlign: "center",
    fontSize: "2.9rem",
    fontWeight: "bold",
    color: "#345",
    paddingTop: "10px",
    margin: "21px 0",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.9rem",
    },
  },
  subTitle: {
    color: "#345",
    fontWeight: "bold",
    margin: "16px 0",
    "& > span": {
      color: "#0081a7",
    },
  },
  button: {
    marginTop: "20px",
  },
}));

export const Unsubscribe = () => {
  const { t } = useI18n("static_pages.unsubscribe");
  const dispatch = useAppDispatch();
  const appClasses = useAppTheme();
  const classes = useStyles();

  const email = useURLSearchParams("email", false, null, false);
  const isICSearch = constants.id === ID_ICSEARCH;
  const isChipAssist = [ID_CHIPASSIST, ID_MASTER].includes(constants.id);
  const isSupplierResponse = constants.id === ID_SUPPLIER_RESPONSE;
  const isChipOnline = constants.id === ID_ELFARO;

  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const [isSending, setIsSending] = useState(false);

  let topMenuList: any[] = [];
  if (isChipAssist) {
    topMenuList = chipAssistMenuList.filter((i) => !!i);
  }
  if (isSupplierResponse) {
    topMenuList = responsesMenuList.filter((i) => !!i);
  }
  const onUnsubscribeHandler = () => {
    setIsSending(true);
    const promises = [];
    if (email) {
      promises.push(dispatch(unsubscribeUser(email)));
      promises.push(dispatch(sendFeedbackMessageThunk("Unsubscribe", { email })));
    }
    Promise.allSettled(promises).finally(() => {
      setIsSending(false);
      setIsUnsubscribed(true);
    });
  };

  return (
    <Page title={t("page_title")} className={classes.root}>
      <Typography className={isICSearch ? classes.titleICS : classes.title} align="center" variant={"h1"}>
        {isUnsubscribed ? t("success_title") : t("title")}
      </Typography>
      {!!email && !isUnsubscribed && (
        <Typography
          align="center"
          variant="subtitle1"
          className={classes.subTitle}
          dangerouslySetInnerHTML={{ __html: t("will_be_removed", { email }) }}
        ></Typography>
      )}
      <Typography align="center" variant="subtitle2">
        {isUnsubscribed ? t("success_subtitle") : t("subtitle")}
      </Typography>
      {!isUnsubscribed && (
        <Button
          disabled={isSending}
          className={clsx(appClasses.buttonCreate, classes.button)}
          variant={"contained"}
          onClick={onUnsubscribeHandler}
        >
          {isSending && <CircularProgress style={{ marginRight: 10, color: "white" }} size="1.5em" />}
          {isSending ? t("feedback.form.sending") : t("button")}
        </Button>
      )}
      <div className={classes.menuContainer}>
        {!isChipOnline &&
          topMenuList.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <NavLink to={item.url}>{item.label}</NavLink>
                {topMenuList.length - 1 > index && <span className={classes.divider}>|</span>}
              </React.Fragment>
            );
          })}
        {isChipOnline && (
          <>
            <a href={"https://chiponline.tech/"}>ChipOnline Website</a>
            <span className={classes.divider}>|</span>
            <NavLink to={"/search"}>Online Shop</NavLink>
          </>
        )}
      </div>
    </Page>
  );
};

export default Unsubscribe;
