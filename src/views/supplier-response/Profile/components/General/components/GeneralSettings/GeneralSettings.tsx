import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Theme, TextField, Grid, Box, Button } from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { loadProfileInfoThunk } from "@src/store/profile/profileActions";
import useAppSelector from "@src/hooks/useAppSelector";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import useDebounce from "@src/hooks/useDebounce";
import { uploadNewAvatar } from "@src/store/sellerProfile/sellerProfileAction";
import formSchema from "@src/utils/formSchema";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import validate from "validate.js";
import _ from "lodash";
import useAppTheme from "@src/theme/useAppTheme";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";

const useStyles = makeStyles((theme: Theme & AppTheme) => ({
  root: {},
  table: {
    "& > tbody > tr:nth-child(odd)": {
      backgroundColor: "#fafafa",
    },
    "& > tbody > tr > td:first-child": {
      borderRight: `1px solid ${theme.palette.app.grey200}`,
    },
    wordWrap: "break-word",
  },
  tableHeader: {
    width: "20%",
    height: 40,
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  cardHeader: {
    backgroundColor: theme.palette.app.blue800,
    "& .MuiCardHeader-title": {
      color: "white",
      fontWeight: "bold",
    },
  },
}));

interface ProfileForm {
  company_name: string;
  email: string;
  phone: string;
  website: string;
  country: string;
  postcode: number;
  address: string;
  description: string;
  logoURL: string;
}

interface ProfileFormTouched {
  company_name?: string[];
  email?: string[];
  phone?: string[];
  website?: string[];
  country?: string[];
  postcode?: string[];
  address?: string[];
  description?: string[];
  logoURL?: string[];
}

interface ProfileFormErrors {
  company_name?: string[];
  email?: string[];
  phone?: string[];
  website?: string[];
  country?: string[];
  postcode?: string[];
  address?: string[];
  description?: string[];
  logoURL?: string[];
}

interface FormState {
  values: ProfileForm;
  touched: ProfileFormTouched;
  errors: ProfileFormErrors;
}

const GeneralSettings = () => {
  const { t } = useI18n("profile");
  const classes = useStyles();
  const appTheme = useAppTheme();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);
  const checkout = useAppSelector((state) => state.checkout);
  const { profileInfo } = profile;
  const billingAddress = [...profileInfo?.addresses].sort((a, b) => a.id - b.id)[0];

  const [formState, setFormState] = useState<FormState>({
    values: {
      company_name: billingAddress?.company_name || "",
      email: profileInfo?.email || "",
      phone: billingAddress?.phone_number || "",
      website: billingAddress?.line2 || "",
      country:
        (checkout?.countries && checkout.countries.find((i) => i.url === billingAddress?.country)?.printable_name) ||
        "",
      postcode: billingAddress?.postcode || "",
      address: billingAddress?.line1 || "",
      description: billingAddress?.notes || "",
      logoURL: "",
    },
    touched: {},
    errors: {},
  });

  const debouncedFormState = useDebounce(formState, 300);

  const schema = React.useMemo(() => {
    return {
      company_name: {
        presence: { allowEmpty: false, message: `^${t("form_labels.company_name")} ${t("errors.required")}` },
        ...formSchema.companyName,
      },
      postcode: formSchema.postcode,
      address: formSchema.address,
    };
  }, []);

  useEffect(() => {
    dispatch(loadProfileInfoThunk());
  }, []);

  useEffect(() => {
    const formErrors = validate(formState.values, schema);
    setFormState((prevState) => ({
      ...prevState,
      errors: formErrors || {},
    }));
  }, [debouncedFormState.values]);

  const errorProps = (name: keyof ProfileForm) => {
    if (formState.touched[name] && formState.errors[name]) {
      return { error: true, helperText: formState.errors[name][0] };
    }
    return false;
  };

  const onBlurHandler = (name: string) => () => {
    return setFormState((prevState) => ({
      ...prevState,
      touched: {
        ...prevState.touched,
        [name]: true,
      },
    }));
  };

  const onChangeHandler = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    const errors: any = { ...formState.errors };
    if (errors[name]) delete errors[name];
    setFormState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, [name]: value },
      touched: { ...prevState.touched, [name]: false },
    }));
  };

  const onSubmit = () => {
    if (!_.isEmpty(formState.errors)) {
      setFormState((prevState) => ({
        ...prevState,
        touched: Object.keys(prevState.errors).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
      }));
      console.log(formState.errors);
      return false;
    }
    if (formState.values.logoURL !== "") dispatch(uploadNewAvatar(formState.values.logoURL));
    dispatch(
      showBottomLeftMessageAlertAction({
        text: "Company details were updated successfully!",
        severity: "success",
      }),
    );
    return true;
  };

  return (
    <Card>
      <CardHeader className={classes.cardHeader} title={"Company details"} />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField
              label={"Company name"}
              name={"company_name"}
              value={formState.values.company_name}
              variant={"outlined"}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeHandler}
              onBlur={onBlurHandler("company_name")}
              {...errorProps("company_name")}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label={"Email"}
              name={"email"}
              value={formState.values.email}
              variant={"outlined"}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeHandler}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label={"Phone"}
              name={"phone"}
              value={formState.values.phone}
              variant={"outlined"}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeHandler}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label={"Website"}
              name={"website"}
              value={formState.values.website}
              variant={"outlined"}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeHandler}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label={"Country"}
              name={"country"}
              value={formState.values.country}
              variant={"outlined"}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeHandler}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label={"Post/Zip-code"}
              name={"postcode"}
              value={formState.values.postcode}
              variant={"outlined"}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeHandler}
              onBlur={onBlurHandler("postcode")}
              {...errorProps("postcode")}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label={"Address"}
              name={"address"}
              value={formState.values.address}
              variant={"outlined"}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeHandler}
              onBlur={onBlurHandler("address")}
              {...errorProps("address")}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label={"Description"}
              name={"description"}
              value={formState.values.description}
              variant={"outlined"}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeHandler}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              label={"Logo URL"}
              name={"logoURL"}
              value={formState.values.logoURL}
              variant={"outlined"}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeHandler}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Button
                style={{ minWidth: 150 }}
                className={appTheme.buttonCreate}
                variant="contained"
                onClick={onSubmit}
              >
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
        {/* <Table className={classes.table} size="medium"> */}
        {/*  <TableBody> */}
        {/*    /!* <TableRow> *!/ */}
        {/*    /!*  <TableCell className={classes.tableHeader}>Name</TableCell> *!/ */}
        {/*    /!*  <TableCell>{billingAddress?.company_name || "-"}</TableCell> *!/ */}
        {/*    /!* </TableRow> *!/ */}
        {/*    /!* <TableRow> *!/ */}
        {/*    /!*  <TableCell className={classes.tableHeader}>Email</TableCell> *!/ */}
        {/*    /!*  <TableCell>{profileInfo?.email || "-"}</TableCell> *!/ */}
        {/*    /!* </TableRow> *!/ */}
        {/*    <TableRow> */}
        {/*      /!* <TableCell className={classes.tableHeader}>Website</TableCell> *!/ */}
        {/*      /!* <TableCell>{billingAddress?.line2 || "-"}</TableCell> *!/ */}
        {/*      <TableCell width={12}> */}
        {/*        <TextField */}
        {/*          label={"Website"} */}
        {/*          value={billingAddress?.line2 || "-"} */}
        {/*          variant={"outlined"} */}
        {/*          fullWidth */}
        {/*        ></TextField> */}
        {/*      </TableCell> */}
        {/*    </TableRow> */}
        {/*    /!* <TableRow> *!/ */}
        {/*    /!*  <TableCell className={classes.tableHeader}>Phone</TableCell> *!/ */}
        {/*    /!*  <TableCell>{billingAddress?.phone_number || billingAddress?.phone_number_str || "-"}</TableCell> *!/ */}
        {/*    /!* </TableRow> *!/ */}
        {/*    <TableRow> */}
        {/*      <TableCell className={classes.tableHeader}>Country</TableCell> */}
        {/*      <TableCell> */}
        {/*        {(checkout?.countries && */}
        {/*          checkout.countries.find((i) => i.url === billingAddress?.country)?.printable_name) || */}
        {/*          "-"} */}
        {/*      </TableCell> */}
        {/*    </TableRow> */}
        {/*    <TableRow> */}
        {/*      <TableCell className={classes.tableHeader}>Post/Zip-code</TableCell> */}
        {/*      <TableCell>{billingAddress?.postcode || "-"}</TableCell> */}
        {/*    </TableRow> */}
        {/*    <TableRow> */}
        {/*      <TableCell className={classes.tableHeader}>Address</TableCell> */}
        {/*      <TableCell>{billingAddress?.line1 || "-"}</TableCell> */}
        {/*    </TableRow> */}
        {/*    <TableRow> */}
        {/*      <TableCell className={classes.tableHeader}>Description</TableCell> */}
        {/*      <TableCell>{billingAddress?.notes || "-"}</TableCell> */}
        {/*    </TableRow> */}
        {/*  </TableBody> */}
        {/* </Table> */}
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
