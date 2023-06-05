/* eslint no-param-reassign: "error" */
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import validate from "validate.js";
import clsx from "clsx";
import useAppDispatch from "@src/hooks/useAppDispatch";
import { Button, FormHelperText, TextField } from "@material-ui/core";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import { feedbackThunk } from "@src/store/feedback/FeedbackActions";
import useAppTheme from "@src/theme/useAppTheme";
import { v1 } from "uuid";
import { showBottomLeftMessageAlertAction } from "@src/store/alerts/alertsActions";
import Screenshot from "../Screenshot/Screenshot";
import FeedbackDropzone from "../FeedbackDropzone/FeedbackDropzone";
import { useStyles } from "./FeedBackFormStyles";

interface FormStateValues {
  subject?: string;
  message?: string;
}

interface FormStateTouched {
  subject?: boolean;
  message?: boolean;
}

interface FormStateErrors {
  subject?: string[];
  message?: string[];
}

interface FormState {
  isValid: boolean;
  values: FormStateValues;
  touched: FormStateTouched;
  errors: FormStateErrors;
  feedbackError: string | null;
}

interface FeedbackFormProps {
  onClose: () => void;
  className?: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ className, onClose }) => {
  const appTheme = useAppTheme();
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { t } = useI18n("feedback");
  let error = null;

  const [files, setFiles] = useState<any[]>([]);
  const [screenshots, setScreenshots] = useState<any[]>([]);
  const [maxSizeError, setMaxSizeError] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    feedbackError: null,
  });

  const imagesSize = files.concat(screenshots).reduce((acc, item) => {
    return acc + item.size;
  }, 0);

  const schema = {
    subject: {
      presence: { allowEmpty: false, message: t("form.required") },
    },
    message: {
      presence: { allowEmpty: false, message: t("form.required") },
    },
  };

  useEffect(() => {
    if (imagesSize > 10485760) {
      // Images max size limit = 10mb
      setMaxSizeError(true);
    } else {
      setMaxSizeError(false);
    }
  }, [imagesSize]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((prevState) => ({
      ...prevState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleAddImages = (imagesArr: File[]) => {
    if (maxSizeError) return;
    setFiles(imagesArr);
  };

  const handleAddScreenshot = (blob: any) => {
    if (maxSizeError) return;
    blob.id = v1();
    setScreenshots((prevState) => [...prevState, blob]);
  };

  const handleDeleteImage = (id: string) => {
    setFiles(files.filter((i) => i.id !== id));
    setScreenshots(screenshots.filter((i) => i.id !== id));
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    event.persist();

    setFormState((prevState) => {
      return {
        ...prevState,
        values: {
          ...prevState.values,
          [event.target.name]: event.target.value,
        },
        touched: {
          ...prevState.touched,
          [event.target.name]: true,
        },
      };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(feedbackThunk(formState.values.subject, formState.values.message, "info", files, screenshots))
      .then((response: { result: string }) => {
        if (response && response.result && response.result === "ok") {
          dispatch(showBottomLeftMessageAlertAction({ text: t("feedback.send_success"), severity: "success" }));
          onClose();
        } else if (response && response.result) {
          error = response.result;
          dispatch(showBottomLeftMessageAlertAction({ text: error, severity: "error" }));
        }
      })
      .catch((err: any) => {
        dispatch(showBottomLeftMessageAlertAction({ text: err, severity: "error" }));
      });
  };

  const hasError = (field: keyof FormStateTouched) => !!(formState.touched[field] && formState.errors[field]);

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className={classes.fields}>
        <TextField
          label={t("form.subject")}
          helperText={hasError("subject") ? formState.errors.subject[0] : null}
          error={hasError("subject")}
          name="subject"
          variant="outlined"
          onChange={handleChange}
          value={formState.values.subject || ""}
        />
        <TextField
          fullWidth
          error={hasError("message")}
          helperText={hasError("message") ? formState.errors.message[0] : null}
          label={t("form.message")}
          name="message"
          variant="outlined"
          multiline
          rows={8}
          onChange={handleChange}
          value={formState.values.message || ""}
        />
      </div>
      <FeedbackDropzone
        maxSizeError={maxSizeError}
        images={files}
        screenshots={screenshots}
        setImages={handleAddImages}
        deleteScreenshot={handleDeleteImage}
      />
      {error && <FormHelperText error>{error}</FormHelperText>}
      {maxSizeError && <FormHelperText error>{t("form.sizeLimit")}</FormHelperText>}
      <div style={{ display: "flex" }}>
        <Button
          className={clsx(classes.submitButton, appTheme.buttonPrimary)}
          size="large"
          disabled={!formState.isValid || maxSizeError}
          type="submit"
          variant="contained"
        >
          {t("form.send")}
        </Button>
        <Screenshot openModal={onClose} addScreenshot={handleAddScreenshot} maxSizeError={maxSizeError} />
      </div>
    </form>
  );
};

export default FeedbackForm;
