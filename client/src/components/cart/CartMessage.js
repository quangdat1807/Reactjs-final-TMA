import "../cart/css/Cart.css";
import "../../App.css";
import { Link } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import Menu from "../home/Menu";
import { Context } from "../../contexts/Context";
import CurrencyFormat from 'react-currency-format';


const CartMessage = () => {
  return (
    <>
      <Menu />
      <div className="error-message">
        ERROR: Cart empty
      </div>
    </>
  );
}

export default CartMessage;
