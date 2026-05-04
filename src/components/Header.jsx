import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "../Style/Header.css";
import { useSelector } from "react-redux";
// import { useCart } from "../context/CartContext.jsx";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

const Header = () => {
  const { lang, toggleLanguage, text } = useContext(LanguageContext);
  // const { cartItems } = useCart();
  // const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0),
  );
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand
          className={lang === "ar" ? "ms-auto" : "me-auto"}
          as={Link}
          to="/"
        >
          {lang === "ar" ? "متجري" : "MyStore"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={lang === "ar" ? "ms-auto" : "me-auto"}>
            <Nav.Link as={Link} to="/">
              {lang === "ar" ? "الرئيسية" : "Home"}
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              {lang === "ar" ? "من نحن" : "About"}
            </Nav.Link>
            <Nav.Link as={Link} to="/signin">
              {lang === "ar" ? "تسجيل الدخول" : "SignIn"}
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            {/* زر تغيير اللغة */}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={toggleLanguage}
              className="me-3"
            >
              {lang === "ar" ? "English" : "العربية"}
            </Button>

            {/* أيقونة السلة */}
            <Nav.Link as={Link} to="/cart" className="cart-icon">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="badge bg-danger ms-1">{totalItems}</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
