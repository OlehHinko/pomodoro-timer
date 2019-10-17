import common_en from "./en";
import common_ru from "./ru";
import common_ua from "./ua";
import i18next from 'i18next';

i18next.init({
  lng: 'en',
  debug: true,
  resources: {
    en: common_en,
    ua: common_ua,
    ru: common_ru,
  }
});

export default i18next;
