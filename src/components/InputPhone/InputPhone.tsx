import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useI18n } from "@src/services/I18nProvider/I18nProvider";
import useAppSelector from "@src/hooks/useAppSelector";
import clsx from "clsx";
import { defaultCountry } from "@src/constants/countries";
import { useStyles } from "./styles";

interface Props {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  small?: boolean;
  error?: boolean;
  helperText?: string;
}

const InputPhone: React.FC<Props> = ({ label, value, onChange, small, error, helperText }) => {
  const classes = useStyles();
  const { t } = useI18n("form_labels");

  const geolocation = useAppSelector((state) => state.profile.geolocation);

  return (
    <>
      <fieldset className={clsx(classes.fieldsetObject, { error })}>
        <legend style={{ fontSize: "10px", fontWeight: 400, paddingRight: "7px", paddingLeft: "2px" }}>
          {label || t("phone")}
        </legend>
        <PhoneInput
          specialLabel={""}
          country={geolocation?.country_code?.toLowerCase() || defaultCountry.code.toLowerCase()}
          value={value || ""}
          onChange={onChange}
          dropdownClass={classes.phoneSelectMenu}
          inputClass={clsx(classes.phoneInput, {
            [classes.small]: !!small,
          })}
          containerClass={classes.phoneContainer}
        />
        {error && !!helperText && (
          <p
            className={`${classes.helperText} MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-marginDense`}
          >
            {helperText}
          </p>
        )}
      </fieldset>
    </>
  );
};

export default InputPhone;
