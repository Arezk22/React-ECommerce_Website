import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "./context/LanguageContext";

// Lazy load components OUTSIDE the function
const Header = lazy(() => import("./components/Header"));
const ProductsList = lazy(() => import("./components/ProductsList"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const Cart = lazy(() => import("./components/Cart"));
const NotFound = lazy(() => import("./components/NotFound"));
const Login = lazy(() => import("./components/Login"));
const About = lazy(() => import("./components/About"));

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Header />
        <Suspense fallback={<div className="text-center my-5">Loading...</div>}>
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </LanguageProvider>
  );
}

export default App;
