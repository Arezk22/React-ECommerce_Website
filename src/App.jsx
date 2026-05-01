import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import ProductsList from "./components/ProductsList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/about"
          element={<h1 className="text-center mt-5">About</h1>}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
