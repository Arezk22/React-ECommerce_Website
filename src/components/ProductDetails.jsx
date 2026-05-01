import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import axiosInstance from "../apis/Config"; // تأكد من المسار الصحيح
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import "../Style/ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/slices/CartSlice";
// import { useCart } from "../context/CartContext.jsx";

const ProductDetails = () => {
  // const { addToCart } = useCart();
  const { id } = useParams(); // لجلب الـ id من الرابط
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get(`/products/${id}`) // DummyJSON API بياخد الـ id مباشرة بعد baseURL
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading)
    return <div className="text-center mt-5"> loading details...</div>;
  if (!product)
    return <div className="text-center mt-5">Product not found!</div>;

  return (
    <Container className="my-5 product-details-container">
      <Row className="align-items-center">
        {/* صور المنتج */}
        <Col md={6}>
          <div className="main-img-holder p-4 shadow-sm bg-light rounded">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="img-fluid"
            />
          </div>
        </Col>

        {/* معلومات المنتج */}
        <Col md={6} className="ps-md-5">
          <Badge bg="info" className="mb-2 text-dark">
            {product.category}
          </Badge>
          <h1 className="display-5 fw-bold">{product.title}</h1>

          <div className="d-flex align-items-center mb-3">
            <div className="stars me-2">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={
                    i < Math.round(product.rating)
                      ? "text-warning"
                      : "text-light"
                  }
                />
              ))}
            </div>
            <span className="text-muted">({product.rating} Rating)</span>
          </div>

          <h3 className="text-success fw-bold mb-3">${product.price}</h3>
          <p className="lead text-muted">{product.description}</p>

          <div className="mt-4">
            <h5 className="fw-bold">
              Brand: <span className="fw-normal">{product.brand}</span>
            </h5>
            <h5 className="fw-bold">
              Stock:
              <span
                className={
                  product.stock > 0 ? "text-success ms-2" : "text-danger ms-2"
                }
              >
                {product.stock > 0
                  ? `Available (${product.stock})`
                  : "Out of Stock"}
              </span>
            </h5>
          </div>

          <div className="d-grid gap-2 mt-5">
            <Button
              variant="dark"
              size="lg"
              className="rounded-pill p-3"
              onClick={() => dispatch(addToCart(product))}
            >
              <FontAwesomeIcon icon={faCartPlus} className="me-2" />
              Add to Shopping Cart
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
