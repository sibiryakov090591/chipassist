import React, { useEffect, useState } from "react";
import { Card, Button, Divider, CardActions, Box, Typography } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppTheme from "@src/theme/useAppTheme";
import clsx from "clsx";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { deleteAddress, hideUpdateSuccess, loadProfileInfoThunk } from "@src/store/profile/profileActions";
import { Paginate } from "@src/components";
import Preloader from "@src/components/Preloader/Preloader";
import ConfirmButton from "@src/components/ConfirmButton/ConfirmButton";
import useAppSelector from "@src/hooks/useAppSelector";
import SuccessSnackbar from "@src/views/chipassist/Profile/components/General/components/SuccessSnackbar";
import AddressForm from "./components/AddressForm/AddressForm";
import AddressData from "./components/AddressData/AddressData";
import { useStyles } from "./CompanyAddressStyles";

const CompanyAddress = () => {
  const appTheme = useAppTheme();
  const classes = useStyles();
  const { t } = useI18n("profile");
  const dispatch = useAppDispatch();

  const addresses = useAppSelector((state) => state.profile.profileInfo?.addresses);
  const isLoadingProfile = useAppSelector((state) => state.profile.isLoadingProfile);
  const showUpdateSuccess = useAppSelector((state) => state.profile.showUpdateSuccess);

  const [currentPage, setCurrentPage] = useState(1);
  const [newAddressMode, setNewAddressMode] = useState(false);
  const [updateAddressMode, setUpdateAddressMode] = useState(false);

  useEffect(
    () => () => {
      dispatch(hideUpdateSuccess());
    },
    [],
  );

  const onPageChangeHandle = (data: any) => {
    setCurrentPage(data.selected + 1);
  };

  const onUpdateHandle = () => {
    setUpdateAddressMode(true);
  };

  const onDeleteClick = (id: number) => async () => {
    const response: any = await dispatch(deleteAddress(id));
    if (response.status < 300) {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    }
    dispatch(loadProfileInfoThunk());
  };

  const handleSnackbarClose = () => {
    dispatch(hideUpdateSuccess());
  };

  return (
    <Card>
      {!newAddressMode && !updateAddressMode && (
        <>
          <CardActions>
            <Button variant="contained" className={appTheme.buttonCreate} onClick={() => setNewAddressMode(true)}>
              {t("company.add_address")}
            </Button>
          </CardActions>
          <Divider />
        </>
      )}

      <Box overflow="auto" display="flex" flexDirection="column" justifyContent="center">
        {!newAddressMode && isLoadingProfile && (
          <Box display="flex" alignItems="center" justifyContent="center" padding={10}>
            <Preloader title={""} />
          </Box>
        )}

        {!isLoadingProfile && !newAddressMode && !updateAddressMode && addresses && !addresses.length && (
          <Box display="flex" alignItems="center" justifyContent="center" padding={10}>
            <Typography variant="h5" component="h5">
              {t("company.not_found")}
            </Typography>
          </Box>
        )}

        {!isLoadingProfile && !newAddressMode && !updateAddressMode && addresses && addresses[currentPage - 1] && (
          <>
            <Box
              padding={4}
              paddingTop={5}
              paddingBottom={2}
              display="flex"
              flexWrap="wrap"
              justifyContent="space-between"
            >
              <Typography variant="h4" component="h4" className={classes.addressTitle}>
                {t("profile.company.current_address")} #{currentPage}
              </Typography>
              <Box display="flex">
                {addresses && currentPage < addresses.length && addresses[currentPage - 1] && (
                  <ConfirmButton
                    onAction={onDeleteClick(addresses[currentPage - 1].id)}
                    theme="button"
                    type="delete"
                    size="medium"
                    className={clsx(classes.buttonAction, appTheme.buttonCancel)}
                    question={t("profile.company.delete_address")}
                    caption={t("common.delete")}
                  />
                )}
                <Button
                  className={clsx(classes.buttonAction, appTheme.buttonCreate)}
                  variant="contained"
                  onClick={onUpdateHandle}
                >
                  {t("common.edit")}
                </Button>
              </Box>
            </Box>
            <Box padding={4} pt={1} display="flex" flexDirection="column" justifyContent="center">
              <AddressData item={addresses[currentPage - 1]} />
            </Box>
            {addresses && addresses.length > 1 && (
              <Box p={1} display="flex" justifyContent="center">
                <Paginate pageCount={addresses.length} activePage={currentPage} onPageChange={onPageChangeHandle} />
              </Box>
            )}
          </>
        )}

        {newAddressMode && <AddressForm onClose={() => setNewAddressMode(false)} changeCurrentPage={setCurrentPage} />}
        {updateAddressMode && addresses && addresses[currentPage - 1] && (
          <AddressForm updateData={addresses[currentPage - 1]} onClose={() => setUpdateAddressMode(false)} />
        )}
      </Box>
      <SuccessSnackbar onClose={handleSnackbarClose} open={showUpdateSuccess} />
    </Card>
  );
};

export default CompanyAddress;
