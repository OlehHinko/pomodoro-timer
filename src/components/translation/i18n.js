import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common_en from "./en";
import common_ru from "./ru";
import common_ua from "./ua";


 i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: common_en,
      ua: common_ua,
      ru: common_ru,
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });
