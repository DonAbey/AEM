import React from "react";
import { useState, useEffect } from "react";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";
import { getData } from "../../data/repository";
import "./cart.css";
import useCart from "../../fragments/customHook/useCart";
import { Link } from "react-router-dom";
import ProductSection from "./ProductSection";

const Cart = ({ currentUser, updateCartChanged }) => {
  const [productSelected, setProductSelected] = useState(null);
  //handle click and pass the status add or remove to the custom hook cart
  const handleRemove = (product) => {
    setProductSelected(product);
  };
  const [items, setItems, activeUserCart] = useCart(productSelected, "delete");

  useEffect(() => {
    updateCartChanged(items);
  });

  return (
    <div>
      <nav aria-label="breadcrumb" className="ms-5 mt-5">
        <ol className="breadcrumb ms-2">
          <li className="breadcrumb-item ">
            <Link to="/">Home</Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            Cart
          </li>
        </ol>
      </nav>

      <div className="container text-center mt-5">
        <h1>Shopping Cart</h1>
      </div>
      <ProductSection
        activeUserCart={activeUserCart}
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default Cart;
