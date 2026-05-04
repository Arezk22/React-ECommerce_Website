import React from "react";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
const About = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <div className="container my-5">
      <h1>{lang === "ar" ? "من نحن" : "About Us"}</h1>
      <p>
        {lang === "ar"
          ? "نحن متجر إلكتروني متخصص في بيع المنتجات عالية الجودة بأسعار تنافسية. هدفنا هو توفير تجربة تسوق سهلة وممتعة لعملائنا."
          : "We are an e-commerce store specializing in selling high-quality products at competitive prices. Our goal is to provide an easy and enjoyable shopping experience for our customers."}
      </p>
      <p>
        {lang === "ar"
          ? "استخدم شريط التنقل لتصفح المنتجات، وعرض سلة التسوق، وتغيير لغة التطبيق."
          : "Use the navigation bar to browse products, view the shopping cart, and switch application language."}
      </p>
    </div>
  );
};

export default About;
