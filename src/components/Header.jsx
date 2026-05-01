import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "../Style/Header.css";
import { useSelector } from "react-redux";
// import { useCart } from "../context/CartContext.jsx";

const Header = () => {
  // const { cartItems } = useCart();
  // const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalItems = useSelector((state) =>
    state.counter.items.reduce((acc, item) => acc + item.quantity, 0),
  );
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Products Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/signin">
              SignIn
            </Nav.Link>
          </Nav>
          <Nav>
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
