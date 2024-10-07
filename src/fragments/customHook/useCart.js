import React from "react";
import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { getData } from "../../data/repository";
import { setData } from "../../data/repository";
const useCart = (productSelected, status) => {
  const currentUser = getData("activeUser");
  //fetching data from localstorage
  const [items, setItems] = useState(getData("all_users_cart_data") || []);
  const [currentUserCartItems, setCurrentUserCartItems] = useState(
    getData("transaction") || []
  );
  //find current user items in cart
  useEffect(() => {
    if (currentUserCartItems !== null && currentUser !== null) {
      const findCurrentUserItem = items.filter((item) => {
        return item.email === currentUser.email;
      });
      setCurrentUserCartItems(findCurrentUserItem);
      setData("transaction", findCurrentUserItem);
    }
  }, [items]);

  const activeUserCart =
    currentUser !== null
      ? items.filter((user) => user.email === currentUser.email)
      : null;
  //add product function
  const addProductCart = (product) => {
    //check if a user has added the same product
    let newData = verifyAndAddProduct(product);
    if (newData) {
      setItems([...items, newData]);
      return true;
    } else {
      alert("You have already added this product to the cart!");
      return false;
    }
  };

  //remove product function
  const deleteProductCart = (data) => {
    //set the items again but excluded the data passed to this function
    setItems(
      items.filter(
        (item) =>
          !(
            item.email === currentUser.email && item.cart_product.id === data.id
          )
      )
    );
  };
  //check status add or remove
  useEffect(() => {
    if (status === "add") {
      if (productSelected !== null) {
        addProductCart(productSelected);
      }
    } else if (status === "delete") {
      if (productSelected !== null) {
        deleteProductCart(productSelected);
      }
    }
  }, [productSelected]);

  useEffect(() => {
    localStorage.setItem("all_users_cart_data", JSON.stringify(items));
  }, [items]);
  //check if the user already added this product?
  const verifyAndAddProduct = (product) => {
    if (product !== null) {
      const alreadyAdded = items.some(
        (userData) =>
          userData.cart_product.id === product.id &&
          userData.email === currentUser.email
      );
      if (!alreadyAdded) {
        const userData = {
          email: currentUser.email,
          cart_product: product,
        };
        return userData;
      } else if (alreadyAdded) {
        return null;
      }
    }
  };

  //check if user click the checkout button or directly go to the thank you page
  const [clickCheckOut, setClickCheckOut] = useState(false);
  const handleCheckOutClick = (isClickCheckout) => {
    isClickCheckout ? setClickCheckOut(true) : setClickCheckOut(false);
    return clickCheckOut;
  };
  return [
    items,
    setItems,
    activeUserCart,
    currentUserCartItems,
    setCurrentUserCartItems,
  ];
};

export default useCart;
