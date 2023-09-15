import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppDispatch from "@src/hooks/useAppDispatch";
import useAppSelector from "@src/hooks/useAppSelector";
import { onChangePartner } from "@src/store/profile/profileActions";
import SupplierSelect from "@src/components/SupplierSelect/SupplierSelect";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Header = () => {
  const classes = useStyles();
  const { t } = useI18n("profile");
  const dispatch = useAppDispatch();
  const partners = useAppSelector((state) => state.profile.profileInfo?.partners);
  const selectedPartner = useAppSelector((state) => state.profile.selectedPartner);
  const onChangePartnerHandler = (id: number) => {
    const partner = partners?.find((p) => p.id === id);
    if (partner) {
      dispatch(onChangePartner(partner));
    }
  };
  return (
    <div className={clsx(classes.root)}>
      <Typography component="h2" gutterBottom variant="overline">
        {t("settings")}
      </Typography>
      <Typography component="h1" variant="h3">
        {t("change_info")}
      </Typography>
      {selectedPartner && (
        <SupplierSelect
          selectedPartner={selectedPartner}
          partners={partners}
          onChangePartner={onChangePartnerHandler}
        />
      )}
    </div>
  );
};

export default Header;
