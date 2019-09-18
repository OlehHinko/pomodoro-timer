import React from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources: {
        uk: {
          translation: {
            "Pomodoro": "Помідори",
            "short break": "коротка перерва",
            "long break": "довга перерва",
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