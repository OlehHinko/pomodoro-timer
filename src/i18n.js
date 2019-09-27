import i18n from "i18next";
import { initReactI18next } from "react-i18next";

 i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          "Pomodoro": "Pomodoro",
          "Short break": "Short break",
          "Long break": "Long break",
          "Setting": "Setting",
          "pause": "pause",
          "reset": "reset",
          "start": "start",
          "skip": "skip",
          "Language": "Language",
          "Dark theme": "Dark theme",
          "Timer setting": "Timer setting",
        }
      }
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
  if(!localStorage.getItem('timerTranslation')){
    localStorage.setItem('en', {
      resources: {
        en: {
          translation: {
            "Pomodoro": "Pomodoro",
            "Short break": "Short break",
            "Long break": "Long break",
            "Setting": "Setting",
            "pause": "pause",
            "reset": "reset",
            "start": "start",
            "skip": "skip",
            "Language": "Language",
            "Dark theme": "Dark theme",
            "Timer setting": "Timer setting",
          }
        }
      },
      lng: "en",
      fallbackLng: "en",
  
      interpolation: {
        escapeValue: false
      }
    })
  }
}