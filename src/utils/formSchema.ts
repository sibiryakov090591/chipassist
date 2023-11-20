import { staticI18n } from "@src/services/I18nProvider/I18nProvider.tsx";
import constants from "@src/constants/constants";
import { ID_ICSEARCH } from "@src/constants/server_constants";

const { t } = staticI18n("bom");

// For validate.js

const firstName = {
  presence: { allowEmpty: false, message: `^${t("form_labels.first_name")} ${t("errors.required")}` },
  length: {
    maximum: 30,
    tooLong: `^${t("form_labels.first_name")} ${t("errors.too_long", { count: 30 })}`,
  },
  format: {
    pattern: `[a-zA-Z${constants.id === ID_ICSEARCH ? "А-Яа-яЁё" : ""} -]+`,
    flags: "i",
    message: `^${t("form_labels.first_name")} ${t("errors.only_letters")}`,
  },
};

const lastName = {
  presence: { allowEmpty: false, message: `^${t("form_labels.last_name")} ${t("errors.required")}` },
  length: {
    maximum: 150,
    tooLong: `^${t("form_labels.last_name")} ${t("errors.too_long", { count: 150 })}`,
  },
  format: {
    pattern: `[a-zA-Z${constants.id === ID_ICSEARCH ? "А-Яа-яЁё" : ""} -]+`,
    flags: "i",
    message: `^${t("form_labels.last_name")} ${t("errors.only_letters")}`,
  },
};

const companyName = {
  presence: { allowEmpty: false, message: `^${t("form_labels.company_name")} ${t("errors.required")}` },
  format: {
    pattern: `[\x00-\x7F ${constants.id === ID_ICSEARCH ? "а-яА-ЯёЁ" : ""}]*`,
    flags: "i",
    message: `^${t("form_labels.company_name")} ${t("errors.only_letters_and_digits_and_symbols")}`,
  },
};

const city = {
  presence: { allowEmpty: false, message: `^${t("form_labels.city")} ${t("errors.required")}` },
  format: {
    pattern: `[a-zA-Z${constants.id === ID_ICSEARCH ? "а-яА-ЯёЁ" : ""} -]*`,
    flags: "i",
    message: `^${t("form_labels.city")} ${t("errors.only_letters")}`,
  },
};

const postcode = {
  presence: { allowEmpty: false, message: `^${t("form_labels.postcode")} ${t("errors.required")}` },
  format: {
    pattern: `[\x00-\x7F ${constants.id === ID_ICSEARCH ? "а-яА-ЯёЁ" : ""}]*`,
    flags: "i",
    message: `^${t("form_labels.postcode")} ${t("errors.only_letters_and_digits_and_symbols")}`,
  },
};

const address = {
  presence: { allowEmpty: false, message: `^${t("form_labels.address")} ${t("errors.required")}` },
};

const emailPattern = constants.bannedEmailServices?.map((i: string) => i.replace(".", "\\.")).join("|");
const email = {
  presence: { allowEmpty: false, message: `^${t("feedback.form.email")} ${t("feedback.form.required")}` },
  email: { message: `^${t("errors.email")}` },
  length: {
    maximum: 64,
    tooLong: `^${t("feedback.form.email")} ${t("errors.too_long", { count: 64 })}`,
  },
  ...(constants.activateCorporateEmailValidation && {
    format: {
      pattern: `.+@(?!(${emailPattern})).*`,
      flags: "i",
      message: `^${t("errors.corporate_email")}`,
    },
  }),
};

const policyConfirm = {
  ...(constants.id !== ID_ICSEARCH && {
    checked: { message: `^${t("errors.privacy_policy")}` },
  }),
};

const inn = {
  ...(constants.id === ID_ICSEARCH && {
    presence: { allowEmpty: false, message: `^${t("form.inn")} ${t("form.required")}` },
    length: {
      maximum: 12,
      tooLong: `^${t("form.inn")} ${t("errors.too_long", { count: 12 })}`,
    },
  }),
};

export default {
  firstName,
  lastName,
  companyName,
  city,
  postcode,
  address,
  email,
  policyConfirm,
  inn,
};
