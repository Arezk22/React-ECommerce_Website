import { createContext, useState } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("ar");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const content = {
    ar: { title: "مرحباً بك", btn: "تغيير اللغة" },
    en: { title: "Welcome", btn: "Change Language" },
  };

  return (
    <LanguageContext.Provider
      value={{ lang, toggleLanguage, text: content[lang] }}
    >
      <div dir={lang === "ar" ? "rtl" : "ltr"}>{children}</div>
    </LanguageContext.Provider>
  );
};
