import React from "react";
import { Container, Table, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  deleteFromCart,
} from "../store/slices/CartSlice";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
// import { useCart } from "../context/CartContext.jsx";
// import { useCart } from "../context/CartContext";

const Cart = () => {
  const { lang } = useContext(LanguageContext);
  // سنحتاج لإضافة هذه الوظائف في الـ Context
  // const { cartItems, addToCart, removeFromCart, deleteFromCart } = useCart();

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <h2> {lang === "ar" ? "السلة فارغة!" : "Cart is empty!"} </h2>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4"> {lang === "ar" ? "السلة" : "Cart"} </h2>
      <Table responsive="md" hover>
        <thead className="table-dark">
          <tr>
            <th>{lang === "ar" ? "المنتج" : "Product"}</th>
            <th>{lang === "ar" ? "السعر" : "Price"}</th>
            <th>{lang === "ar" ? "الكمية" : "Quantity"}</th>
            <th>{lang === "ar" ? "المجموع" : "Total"}</th>
            <th>{lang === "ar" ? "حذف" : "Delete"}</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="align-middle">
              <td>
                <Image
                  src={item.thumbnail}
                  width="50"
                  className="me-2"
                  rounded
                />
                {item.title}
              </td>
              <td>${item.price}</td>
              <td>
                {/* استخدام dispatch لإرسال الأكشن */}
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => dispatch(removeFromCart(item))}
                  className="mx-2"
                  disabled={item.quantity <= 1}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <span className="fw-bold">{item.quantity}</span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => dispatch(addToCart(item))}
                  className="mx-2"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => dispatch(deleteFromCart(item))}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center mt-4 p-3 bg-light rounded">
        <h4>
          {lang === "ar" ? "السعر الإجمالي" : "Total Price"}:{" "}
          <span className="text-success">${totalPrice.toFixed(2)}</span>
        </h4>
        <Button variant="success" size="lg">
          {lang === "ar" ? "إكمال الشراء" : "Complete Purchase"}
        </Button>
      </div>
    </Container>
  );
};

export default Cart;
