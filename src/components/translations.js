import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      uk: {
        translation: {
          "pomodoro": "Помідори",
          "short break": "коротка перерва",
          "long break": "довга перерва",
          "Setting": "налаштування",
          "pause": "пауза",
          "reset": "скинути",
          "start": "старт"
        }
      }
    },
    lng: "uk",
    fallbackLng: "uk",

    interpolation: {
      escapeValue: false
    }
  });

export default function Translation() {

  return <></>;
}