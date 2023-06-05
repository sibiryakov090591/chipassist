import i18n, { TFunction, i18n as Ii18n } from "i18next";
// import Backend from "i18next-http-backend";
import React, { PropsWithChildren } from "react";

import { initReactI18next, useTranslation } from "react-i18next";
import { localeDefault, locales } from "@src/constants/defaults";
import enTranslate from "@src/static/i18n/en/translation.json";
import ruTranslate from "@src/static/i18n/ru/translation.json";

i18n
  // можно использовать определение языка в браузере https://github.com/i18next/i18next-browser-languageDetector
  // .use(LanguageDetector)
  // .use(Backend)
  .use(initReactI18next)
  .init({
    debug: true,
    load: "languageOnly",
    lng: locales.find((val) => val === localStorage.getItem("locale")) ? localStorage.getItem("locale") : localeDefault,
    fallbackLng: "en",
    // backend: {
    //   loadPath: `/static/i18n/{{lng}}/{{ns}}.json`, // можно добавить хэш
    // },
    react: {
      useSuspense: false,
    },
    resources: {
      en: { translation: enTranslate },
      ru: { translation: ruTranslate },
    },
  })
  .then();

export const I18nContext = React.createContext<{}>({});

export const I18nProvider: React.FunctionComponent = (props: PropsWithChildren<{}>) => {
  // useEffect(() => {
  //   function callback(lang: string) {
  //     console.log(lang);
  //   }
  //   i18n.on("languageChanged", callback);
  //   return () => {
  //     i18n.off("languageChanged", callback);
  //   };
  // }, []);

  return <I18nContext.Provider value={{}}>{props.children}</I18nContext.Provider>;
};

export const useI18n = (defaultPrefix?: string): { t: TFunction; i18n: Ii18n } => {
  // eslint-disable-next-line no-shadow
  const { t, i18n } = useTranslation();

  function wrappedT(key: string | string[], ...args: any[]) {
    const keys: string[] = Array.isArray(key) ? [...key] : [key];
    const prefixedKeys = typeof defaultPrefix !== "undefined" ? keys.map((k) => `${defaultPrefix}.${k}`) : [];
    return t.apply(t, [prefixedKeys.concat(keys), ...args] as any);
  }

  return { t: wrappedT, i18n };
};

export const staticI18n = (defaultPrefix?: string): { t: TFunction; i18n: Ii18n } => {
  const t = i18n.t.bind(i18n);

  function wrappedT(key: string | string[], ...args: any[]) {
    const keys: string[] = Array.isArray(key) ? [...key] : [key];
    const prefixedKeys = typeof defaultPrefix !== "undefined" ? keys.map((k) => `${defaultPrefix}.${k}`) : [];
    return t.apply(t, [prefixedKeys.concat(keys), ...args] as any);
  }

  return { t: wrappedT, i18n };
};
