import { React, useState } from "react";
import { useEffect } from "react";
import { BrowserRouter as Link, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from "../homepage/Home";
import Alert from "react-bootstrap/Alert";
import Header from "../../fragments/header/Header";
import Footer from "../../fragments/footer/Footer";
import Myprofile from "../myprofile/Myprofile";
import { getUser, removeUser } from "../../data/repository";
import SpecialDeals from "../special-deals/Special-deals";
import Cart from "../cart/Cart";
import { initProductData } from "../../data/productData";
import useLocalStorage from "../../fragments/customHook/useLocalStorage";
import ShopOnline from "../product-page/ShopOnline";
import Signin from "../signup-signin/Signin";
import { SignUp } from "../signup-signin/Signup";
import ProductPage from "../product-page/ProductPage";
import useCart from "../../fragments/customHook/useCart";
import useCheckLogin from "../../fragments/customHook/useCheckLogin";
import LoginLogout from "./LoginLogout";
import Checkout from "../checkoutpage/Checkout";
import Thankyou from "../thankyoupage/Thankyou";
import useHandleClick from "../../fragments/customHook/useHandleClick";
import useCheckOut from "../../fragments/customHook/useCheckOut";
import { useScrollToTop } from "../../fragments/customHook/useScrollToTop";
import { getData } from "../../data/repository";
import DietPlanPage from "../dietplan/DietPlanPage";
import DailyMealPlan from "../diet-daily/DailyMealPlan";
import ViewLastDailyMealPlan from "../diet-daily/ViewLastDailyMealPlan";
import WeeklyMealPlan from "../diet-weekly/WeeklyMealPlan"
import ViewLastWeeklyMealPlan from "../diet-weekly/ViewLastWeeklyPlan";
import AemAdmin from "../aem/AemAdmin";

const Main = () => {
  const { username, loginUser, logout, getActiveUser } = LoginLogout();
  //if initdata changes -> call use effect to store the products in the local storage again
  const [initProducts, setInitProducts] = useState(getData("Products") || null);
  sessionStorage.setItem('greetingUser','false')
  useEffect(() => {
    if (localStorage.getItem("Products") === null) {
      const init = initProductData();
      setInitProducts(init);
      localStorage.setItem("Products", JSON.stringify(init));
    }
  }, []);
  useLocalStorage("Products", initProducts);
  const navigate = useNavigate();
  //when a user clicks a product
  const [productSelected, handleClick] = useHandleClick(username);
  //check whether the user go directly to the thank you page or they finish a purchase
  const [handleCheckOutClick, clickCheckOut] = useCheckOut();
  //perform cart operations
  const [
    items,
    setItems,
    activeUserCart,
    currentUserCartItems,
    setCurrentUserCartItems,
  ] = useCart(productSelected, "add");
  return (
    <>
      <Header username={username} cart={activeUserCart} logout={logout} />
      {useScrollToTop()}
      <Routes>
        <Route
          path="/"
          element={<Home items={initProducts} handleClick={handleClick} />}
        />
        <Route path="/login" element={<Signin loginUser={loginUser} />} />
        <Route path="/Register" element={<SignUp loginUser={loginUser} />} />
        <Route path="/profile" element={<Myprofile />} />
        <Route path="/dietplanpage" element={<DietPlanPage />} />
        <Route path="/dailymealplan" element={<DailyMealPlan />} />
        <Route path="/viewLastDailyMealPlan" element={<ViewLastDailyMealPlan />} />
        <Route path="/viewLastWeeklyMealPlan" element={<ViewLastWeeklyMealPlan />} />
        <Route path="/weeklymealplan" element={<WeeklyMealPlan />} />
        <Route path="/aemAdmin" element={<AemAdmin />} />
        <Route
          path="/special"
          element={
            <SpecialDeals handleClick={handleClick} items={initProducts} />
          }
        />
        <Route
          path="/shop-online"
          element={
            <ShopOnline handleClick={handleClick} items={initProducts} />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              currentUserCartItems={currentUserCartItems}
              currentUser={getActiveUser()}
              handleCheckOutClick={handleCheckOutClick}
              setInitProducts={setInitProducts}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart currentUser={getActiveUser()} updateCartChanged={setItems} />
          }
        />
        <Route
          path="/product-page/:urlId"
          element={
            <ProductPage handleClick={handleClick} items={initProducts} />
          }
        />
        <Route
          path="/thankyou"
          element={
            <Thankyou
              currentUser={getActiveUser()}
              currentUserCartItems={currentUserCartItems}
              clickCheckOut={clickCheckOut}
              setItems={setItems}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default Main;
