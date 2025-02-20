import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import es from "./es.json";
import de from "./de.json";

i18n.use(initReactI18next).init({
    resources: { en: { translation: en }, es: { translation: es }, de: { translation: de } },
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
});

export default i18n;
