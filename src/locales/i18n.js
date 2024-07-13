import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationUZ from '../../public/locales/uz/translation.json';
import translationEN from '../../public/locales/en/translation.json';
import translationRU from '../../public/locales/ru/translation.json';

const resources = {
    uz: {
        translation: translationUZ
    },
    en: {
        translation: translationEN
    },
    ru: {
        translation: translationRU
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false 
        }
    });

export default i18n;
