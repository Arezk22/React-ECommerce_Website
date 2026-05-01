import React from "react";
import { Card, Button, Col, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/ProductCart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/slices/CartSlice";
// import { useCart } from "../context/CartContext.jsx";

const ProductCart = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { addToCart } = useCart();

  return (
    <Col className="mb-4">
      <Card className="product-card h-100 border-0">
        {/* Badge for Stock Status */}
        <div className="card-badge">
          {product.stock > 0 ? (
            <Badge pill bg="success" className="px-3 py-2">
              In stock
            </Badge>
          ) : (
            <Badge pill bg="danger" className="px-3 py-2">
              Out of stock
            </Badge>
          )}
        </div>

        <div
          className="img-container"
          onClick={() => navigate(`/product-details/${product.id}`)}
          style={{ cursor: "pointer" }}
        >
          <Card.Img
            variant="top"
            src={product.thumbnail || product.images[0]}
            alt={product.title}
            className="product-img"
          />
        </div>

        <Card.Body className="d-flex flex-column pt-3 px-0">
          <div className="d-flex justify-content-between align-items-start mb-1">
            <Card.Title className="product-title mb-0">
              {product.title}
            </Card.Title>
            <span className="product-price">${product.price}</span>
          </div>
          {/* Stars Rating */}
          <div className="stars-rating mb-3">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={
                  i < Math.round(product.rating || 5)
                    ? "text-success"
                    : "text-light"
                }
              />
            ))}
          </div>

          <Button
            variant={product.stock > 0 ? "outline-dark" : "secondary"}
            disabled={product.stock === 0}
            className="add-to-cart-btn rounded-pill py-2 fw-bold"
            // onClick={() => addToCart(product)}
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCart;
