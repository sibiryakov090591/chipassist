import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Theme,
  TextField,
  Grid,
  Button,
  InputAdornment,
  MenuItem,
  useMediaQuery,
} from "@material-ui/core";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { saveNewPartnerInfo } from "@src/store/profile/profileActions";
import useAppSelector from "@src/hooks/useAppSelector";
import { makeStyles } from "@material-ui/styles";
import { AppTheme } from "@src/themes/AppTheme";
import useDebounce from "@src/hooks/useDebounce";
import { saveNewDetails, turnEditMode, uploadNewAvatar } from "@src/store/sellerProfile/sellerProfileAction";
import useAppTheme from "@src/theme/useAppTheme";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import PhoneInputWrapper from "@src/components/PhoneInputWrapper/PhoneInputWrapper";
import { useTheme } from "@material-ui/core/styles";
import { clsx } from "clsx";
import { useStyles as useCommonStyles } from "@src/views/chipassist/commonStyles";
import validate from "validate.js";
import _ from "lodash";
import formSchema from "@src/utils/formSchema";

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
  city: string;
  postcode: string;
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
  city?: string[];
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
  city?: string[];
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

const GeneralSettings: React.FC<{ isExample?: boolean }> = ({ isExample }) => {
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const appTheme = useAppTheme();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isXsDown = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const maxLength = 2000;

  const profile = useAppSelector((state) => state.profile);
  const partner = useAppSelector((state) => state.profile.partnerProfile);
  const checkout = useAppSelector((state) => state.checkout);

  const [currentLength, setCurrentLength] = useState(0);

  const initialState = (): FormState => ({
    values: {
      company_name: partner.company_name || "",
      email: partner.email || "",
      phone: partner.phone || "",
      website: partner.website || "",
      country: checkout?.countries?.find((i) => i.iso_3166_1_a3 === partner.country)?.iso_3166_1_a3,
      // checkout?.countries?.find((c) => c.iso_3166_1_a3 === geolocation?.country_code_iso3)?.url,
      city: partner.city || "",
      postcode: partner.postcode || "",
      address: partner.address || "",
      description: partner.description || "",
      logoURL: partner.avatar || "",
    },
    touched: {},
    errors: {},
  });

  const [formState, setFormState] = useState<FormState>(initialState());

  const debouncedFormState = useDebounce(formState, 300);

  const schema = React.useMemo(() => {
    return {
      company_name: { ...formSchema.companyName, presence: { allowEmpty: true } },
      city: { ...formSchema.city, presence: { allowEmpty: true } },
      email: formSchema.email, // an email validation ignores "allowEmpty true"
      postcode: { ...formSchema.postcode, presence: { allowEmpty: true } },
    };
  }, []);

  // useEffect(() => {
  //   dispatch(loadProfileInfoThunk());
  // }, []);

  useEffect(() => {
    setFormState(initialState());
    if (profile.partnerProfile.description !== "") {
      setCurrentLength(profile.partnerProfile.description.length);
    }
  }, [profile.partnerProfile]);

  useEffect(() => {
    const formErrors = validate(formState.values, { ...schema, email: formState.values.email ? schema.email : null });
    setFormState((prevState) => ({
      ...prevState,
      errors: formErrors || {},
    }));
    if (!formErrors) {
      dispatch(saveNewDetails(debouncedFormState.values));
    }
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
    if (name === "logoURL") {
      dispatch(uploadNewAvatar(value));
    }
    if (name === "description") {
      setCurrentLength(value.length > maxLength ? maxLength : value.length);
    }
    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: name === "description" && value.length > maxLength ? value.slice(0, maxLength) : value,
        // [name]: value,
      },
      touched: { ...prevState.touched, [name]: false },
    }));
  };

  const onSubmit = () => {
    if (!isExample) {
      if (_.isEmpty(formState.errors)) {
        if (formState.values.logoURL !== "") dispatch(uploadNewAvatar(formState.values.logoURL));
        if (profile.selectedPartner) {
          dispatch(saveNewPartnerInfo(profile.selectedPartner.id, formState.values));
        }
        dispatch(turnEditMode(false));
        dispatch(
          showBottomLeftMessageAlertAction({
            text: "Company details were updated successfully!",
            severity: "success",
          }),
        );
      }
    }
    return true;
  };

  const onCancel = () => {
    setFormState(initialState());
    dispatch(turnEditMode(false));
    dispatch(uploadNewAvatar(""));
  };

  const onPhoneChangeHandler = (e: any) => {
    setFormState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, phone: e },
    }));
  };

  return (
    <Card style={isXsDown ? { boxShadow: "none" } : null}>
      <CardHeader className={classes.cardHeader} title={"Company details"} />
      <CardContent style={isXsDown ? { paddingLeft: 0, paddingRight: 0 } : null}>
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
              size={isXsDown ? "small" : "medium"}
              onBlur={onBlurHandler("company_name")}
              {...errorProps("company_name")}
            />
          </Grid>
          <Grid item md={6} xs={12} style={isXsDown ? { paddingBottom: 0 } : null}>
            <TextField
              label={"Email"}
              name={"email"}
              value={formState.values.email}
              variant={"outlined"}
              fullWidth
              size={isXsDown ? "small" : "medium"}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeHandler}
              onBlur={onBlurHandler("email")}
              {...errorProps("email")}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            {/* <TextField */}
            {/*  label={"Phone"} */}
            {/*  name={"phone"} */}
            {/*  value={formState.values.phone} */}
            {/*  variant={"outlined"} */}
            {/*  fullWidth */}
            {/*  InputLabelProps={{ */}
            {/*    shrink: true, */}
            {/*  }} */}
            {/*  onChange={onChangeHandler} */}
            {/* /> */}
            <PhoneInputWrapper
              value={formState.values.phone}
              onChange={onPhoneChangeHandler}
              style={isSmDown && !isXsDown ? { height: "53.63px" } : null}
              small={isXsDown}
            />
          </Grid>
          <Grid item md={6} xs={12} style={isXsDown ? { paddingTop: 0 } : null}>
            <TextField
              label={"Website"}
              name={"website"}
              value={formState.values.website}
              variant={"outlined"}
              fullWidth
              size={isXsDown ? "small" : "medium"}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeHandler}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="country"
              label="Country"
              fullWidth
              size={isXsDown ? "small" : "medium"}
              select
              onChange={onChangeHandler}
              value={formState.values.country}
            >
              {checkout?.countries?.map((item: Record<string, any>) => (
                <MenuItem className={appTheme.selectMenuItem} key={item.url} value={item.iso_3166_1_a3}>
                  {item.printable_name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={6} xs={12} style={isXsDown ? { paddingTop: 0 } : null}>
            <TextField
              label={"City"}
              name={"city"}
              value={formState.values.city}
              variant={"outlined"}
              fullWidth
              size={isXsDown ? "small" : "medium"}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeHandler}
              onBlur={onBlurHandler("city")}
              {...errorProps("city")}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              label={"Address"}
              name={"address"}
              value={formState.values.address}
              variant={"outlined"}
              fullWidth
              size={isXsDown ? "small" : "medium"}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeHandler}
              onBlur={onBlurHandler("address")}
              /* {...errorProps("address")} */
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              label={"Post/Zip-code"}
              name={"postcode"}
              value={formState.values.postcode}
              variant={"outlined"}
              fullWidth
              size={isXsDown ? "small" : "medium"}
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
              label={"Logo URL"}
              name={"logoURL"}
              value={formState.values.logoURL}
              variant={"outlined"}
              fullWidth
              size={isXsDown ? "small" : "medium"}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChangeHandler}
            />
          </Grid>

          <Grid item md={12} xs={12}>
            <TextField
              label={"Description"}
              name={"description"}
              value={formState.values.description}
              variant={"outlined"}
              fullWidth
              size={isXsDown ? "small" : "medium"}
              InputLabelProps={{
                shrink: true,
              }}
              multiline
              rows={4}
              InputProps={
                !isXsDown
                  ? {
                      endAdornment: <InputAdornment position="end">{`${currentLength}/${maxLength}`}</InputAdornment>,
                    }
                  : null
              }
              onChange={onChangeHandler}
            />
            {isXsDown && (
              <div
                style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
              >{`${currentLength}/${maxLength}`}</div>
            )}
          </Grid>

          <Grid item md={12} xs={12}>
            <div className={commonClasses.actionsRow}>
              <Button
                className={clsx(appTheme.buttonPrimary, appTheme.buttonMinWidth)}
                variant="outlined"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                className={clsx(appTheme.buttonCreate, appTheme.buttonMinWidth)}
                variant="contained"
                onClick={onSubmit}
              >
                Save
              </Button>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
