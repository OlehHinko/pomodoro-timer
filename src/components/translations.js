import React from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      uk: {
        translation: {
          "Pomodoro": "Годинник",
          "Short break": "Kоротка перерва",
          "Long break": "Довга перерва",
          "Setting": "Налаштування",
          "pause": "пауза",
          "reset": "скинути",
          "start": "старт",
          "skip": "пропустити",
          "Language": "Мова",
          "Darck theme": "Темна тема",
          "Timer setting": "Налаштування годинника",
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