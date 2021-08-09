import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { languageAPI } from "../api/api";
import translationEN from "../locales/en/translationEN.json";
import translationRU from "../locales/ru/translationRU.json";
import translationUA from "../locales/ua/translationUA.json";

const SET_LANGUAGE = "SET_LANGUAGE";

let initialState = {
  language: undefined,
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return { language: action.language };
    default:
      return state;
  }
};

export const setLanguage = (language) => ({ type: SET_LANGUAGE, language });

export const getLanguage = () => async (dispatch) => {
  const response = await languageAPI.getLanguage();
  i18n.changeLanguage(response.data.lng);
  dispatch(setLanguage(response.data.lng));
  console.log(response.data.lng);
};

export const changeLanguage = (language) => async (dispatch) => {
  const response = await languageAPI.changeLanguage(language);
  i18n.changeLanguage(response.data.lng);
  dispatch(setLanguage(response.data.lng));
  console.log(response.data.lng);
};

export { languageReducer };

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
  ua: {
    translation: translationUA,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: initialState.language,
  interpolation: { escapeValue: false },
});

export default i18n;
