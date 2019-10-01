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

export async function getTranslations() {
    try {
        const response = await fetch('https://api.myjson.com/bins/16058d', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const myJson = await response.json()
          localStorage.setItem('ua', myJson.ua);
          localStorage.setItem('ru', myJson.ru);
        console.log(myJson)
    } 
        catch(e){
        console.log(e)
    }
}

export async function checkTranslation() {
  if( localStorage.getItem('language')){
    i18n.changeLanguage(localStorage.getItem('language'));
  }
}