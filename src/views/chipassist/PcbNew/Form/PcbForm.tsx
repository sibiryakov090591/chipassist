import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TextField, FormHelperText, Button, CircularProgress } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import clsx from "clsx";
import useAppDispatch from "@src/hooks/useAppDispatch";
import validate from "validate.js";
import useAppTheme from "@src/theme/useAppTheme";
import { sendPcbFormData } from "@src/store/pcb/pcbActions";
import Dropzone from "@src/views/chipassist/PcbNew/Dropzone/Dropzone";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import InputPhone from "@src/components/InputPhone/InputPhone";
import useAppSelector from "@src/hooks/useAppSelector";
import { useLocation, useNavigate } from "react-router-dom";
import { useStyles } from "./styles";

interface FormStateValues {
  email?: string;
  name?: string;
  company?: string;
  message?: string;
}

interface FormStateTouched {
  email?: boolean;
  name?: boolean;
  company?: boolean;
  message?: boolean;
}

interface FormStateErrors {
  email?: string[];
  name?: string[];
  company?: string[];
  message?: string[];
}

interface FormState {
  isValid: boolean;
  values: FormStateValues;
  touched: FormStateTouched;
  errors: FormStateErrors;
  pcbError: string | null;
}

const FormDataState: FormState = {
  isValid: false,
  values: {},
  touched: {},
  errors: {},
  pcbError: null,
};

const PcbForm: React.FC = () => {
  const classes = useStyles();
  const appTheme = useAppTheme();
  const { t } = useI18n("feedback");
  const dispatch = useAppDispatch();
  let error = null;
  const navigate = useNavigate();
  const location = useLocation();

  const prevEmail = useAppSelector((state) => state.profile.prevEmail);
  const profileInfo = useAppSelector((state) => state.profile?.profileInfo);
  const phoneNumber = useAppSelector((state) => state.checkout?.address?.phone_number_str);
  const isAuthenticated = useAppSelector((state) => state.auth.token !== null);

  const [files, setFiles] = useState<any[]>([]);
  const [maxSizeError, setMaxSizeError] = useState(false);
  const [formState, setFormState] = useState<FormState>(FormDataState);
  const [formErrors, setFormErrors] = useState<any>({});
  const [phoneValue, setPhoneValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filesSize = files.reduce((acc, item) => {
    return acc + item.size;
  }, 0);

  useEffect(() => {
    if (filesSize > 10485760) {
      // Files max size limit = 10mb
      setMaxSizeError(true);
    } else {
      setMaxSizeError(false);
    }
  }, [filesSize]);

  useEffect(() => {
    setPhoneValue(phoneNumber);
    setFormState((prevState) => {
      return {
        ...prevState,
        values: {
          ...prevState.values,
          email: profileInfo?.email || "",
          name: profileInfo ? `${profileInfo?.firstName || ""} ${profileInfo?.lastName || ""}` : "",
          company: profileInfo?.addresses[0]?.company_name || "",
          phone: profileInfo?.addresses[0]?.phone_number || "",
        },
      };
    });
  }, [profileInfo]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((prevState) => ({
      ...prevState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values]);

  const schema = {
    email: {
      presence: { allowEmpty: false, message: `^${t("form.email")} ${t("form.required")}` },
    },
    message: {
      presence: { allowEmpty: false, message: `^${t("form.message")} ${t("form.required")}` },
    },
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    event.persist();
    const { name, value } = event.target;

    if (formErrors[name]) {
      const newState = { ...formErrors };
      delete newState[name];
      setFormErrors(newState);
    }

    setFormState((prevState) => {
      return {
        ...prevState,
        values: {
          ...prevState.values,
          [name]: value,
        },
        touched: {
          ...prevState.touched,
          [name]: true,
        },
      };
    });
  };

  const handleAddImages = (imagesArr: File[]) => {
    if (maxSizeError) return;
    setFiles(imagesArr);
  };

  const handleDeleteImage = (id: string) => {
    setFiles(files.filter((i) => i.id !== id));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isAuthenticated) {
      return navigate(prevEmail ? "/auth/login" : "/auth/registration", {
        state: { background: location.state?.background || location },
      }); // background for elfaro
    }

    if (Object.keys(formState.errors).length) {
      return setFormErrors(formState.errors);
    }

    setIsLoading(true);
    const { email, name, company, message } = formState.values;
    return dispatch(sendPcbFormData(email, name, company, phoneValue, message, files))
      .then((response: { result: string }) => {
        setIsLoading(false);
        if (response?.result === "ok") {
          dispatch(showBottomLeftMessageAlertAction({ text: t("feedback.send_success"), severity: "success" }));
          setFormState((prevState) => {
            return {
              ...prevState,
              values: {
                ...prevState.values,
                message: "",
              },
              touched: {},
              errors: {},
            };
          });
          setFiles([]);
        } else if (response && response.result) {
          error = response.result;
          dispatch(showBottomLeftMessageAlertAction({ text: error, severity: "error" }));
        }
      })
      .catch((err: any) => {
        setIsLoading(false);
        dispatch(showBottomLeftMessageAlertAction({ text: err, severity: "error" }));
      });
  };

  const onChangePhoneHandler = (e: any) => {
    return setPhoneValue(e);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.fields}>
        <TextField
          label={`${t("form_labels.email")} *`}
          helperText={formErrors.email && formErrors.email[0]}
          error={!!formErrors.email}
          name="email"
          variant="outlined"
          onChange={handleChange}
          value={formState.values.email || ""}
        />
        <TextField
          label={t("form_labels.name")}
          helperText={formErrors.name && formErrors.name[0]}
          error={!!formErrors.name}
          name="name"
          variant="outlined"
          onChange={handleChange}
          value={formState.values.name || ""}
        />
        <TextField
          label={t("form_labels.company")}
          helperText={formErrors.company && formErrors.company[0]}
          error={!!formErrors.company}
          name="company"
          variant="outlined"
          onChange={handleChange}
          value={formState.values.company || ""}
        />
        <InputPhone value={phoneValue} onChange={onChangePhoneHandler} />
        <TextField
          error={!!formErrors.message}
          helperText={formErrors.message && formErrors.message[0]}
          label={`${t("form.message")} *`}
          name="message"
          variant="outlined"
          multiline
          rows={8}
          onChange={handleChange}
          value={formState.values.message || ""}
        />
      </div>
      <Dropzone
        formState={isAuthenticated ? null : formState}
        maxSizeError={maxSizeError}
        files={files}
        setFiles={handleAddImages}
        onDeleteFile={handleDeleteImage}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
      {maxSizeError && <FormHelperText error>{t("form.sizeLimit")}</FormHelperText>}
      <div style={{ display: "flex" }}>
        <Button
          className={clsx(classes.submitButton, appTheme.buttonPrimary)}
          size="large"
          disabled={maxSizeError || isLoading}
          type="submit"
          color="primary"
          variant="contained"
        >
          {isLoading && <CircularProgress style={{ marginRight: 10, color: "white" }} size="1.5em" />}
          {isLoading ? t("form.sending") : t("form.send")}
        </Button>
      </div>
    </form>
  );
};

export default PcbForm;
