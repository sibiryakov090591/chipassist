import React from "react";
import clsx from "clsx";
import { Box, Hidden } from "@material-ui/core";
import logo from "@src/images/logo/on_red.png";
import LoginForm from "@src/views/chipassist/Login/components/LoginForm/LoginForm";
import { useStyles } from "@src/views/chipassist/Rfq/components/SellerMessageModal/SellerMessageModalStyles";
import { useStyles as useRegisterStyles } from "@src/views/chipassist/HomeRestricted/styles";
import { useStyles as useRfqModalStyles } from "@src/views/chipassist/Rfq/components/RFQModal/RFQModalStyles";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import useAppTheme from "@src/theme/useAppTheme";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { ID_CHIPASSIST, ID_MASTER } from "@src/constants/server_constants";
import constants from "@src/constants/constants";
import useAppSelector from "@src/hooks/useAppSelector";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { qualityCheckModalClose } from "@src/store/rfq/rfqActions";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import QualityCheckForm from "@src/views/chipassist/Rfq/components/QualityCheckModal/QualityCheckForm/QualityCheckForm";

export const QualityCheckContainer: React.FC<{ isAuth?: boolean; isExample?: boolean }> = ({ isAuth, isExample }) => {
  const classes = useStyles();
  const registerClasses = useRegisterStyles();
  const rfqModalClasses = useRfqModalStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const isChipAssist = [ID_MASTER, ID_CHIPASSIST].includes(constants.id);

  const { open, partNumber, sellerName } = useAppSelector((state) => state.rfq.qualityCheckModal);
  let isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  isAuthenticated = isExample ? isAuth : isAuthenticated;

  const { t } = useI18n("rfq.seller_message");

  const [showLoginForm, setShowLoginForm] = React.useState(false);

  React.useEffect(() => {
    if (((isAuthenticated && showLoginForm) || open) && !isExample) setShowLoginForm(false);
  }, [isAuthenticated, open]);

  const handleClose = () => {
    if (!isExample) {
      dispatch(qualityCheckModalClose());
    }
  };

  const showSignIn = (show: boolean) => () => {
    setShowLoginForm(show);
  };
  return (
    <div
      className={
        isExample ? clsx(commonClasses.paper, "fullScreen", rfqModalClasses.container) : commonClasses.displayContents
      }
    >
      {isChipAssist && (
        <Hidden smDown>
          <div className={rfqModalClasses.logoContainer}>
            <div className={rfqModalClasses.signIn}>
              {!isAuthenticated && !showLoginForm && (
                <>
                  {t("restricted.description_1")}
                  <div onClick={showSignIn(true)} className={rfqModalClasses.link}>
                    {t("restricted.sign_in")}
                  </div>
                </>
              )}
              {!isAuthenticated && showLoginForm && (
                <div onClick={showSignIn(false)} className={rfqModalClasses.link}>
                  <DoubleArrowIcon /> Back to RFQ
                </div>
              )}
            </div>
            <img className={rfqModalClasses.logo} src={logo} alt="chipassist logo" />
          </div>
        </Hidden>
      )}
      <div className={rfqModalClasses.content}>
        <h2 className={classes.header}>Request quality check</h2>
        <p className={classes.text}>
          You are about to request the quality check for <strong>{partNumber}</strong> from{" "}
          <strong>{sellerName}</strong>
        </p>
        {!isAuthenticated && (
          <Hidden mdUp>
            <div className={rfqModalClasses.signInMobile}>
              {t("restricted.description_1")}
              <span onClick={showSignIn(true)} className={`${appTheme.hyperlink} ${registerClasses.link}`}>
                {t("restricted.sign_in")}
              </span>
              {". "}
            </div>
          </Hidden>
        )}
        {showLoginForm ? (
          <Box m="13px">
            <LoginForm className={null} />
          </Box>
        ) : (
          <QualityCheckForm onCloseModalHandler={handleClose} isExample={isExample} isAuth={isAuth} />
        )}
      </div>
    </div>
  );
};

export default QualityCheckContainer;
