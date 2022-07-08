import React, { useState/*useEffect*/ } from 'react';
import { Link } from 'react-router-dom';
import "./FavouriteItemsCard.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addItemsToCart } from "../../actions/CartAction";
//import {deleteFavouriteItemsToCart} from "../../actions/FavouriteAction"

const FavouriteItemsCard = ({ item, deleteFavouriteItems}) => {
  const dispatch = useDispatch();
  // const { product } = useSelector(
  //   (state) => state.productDetails
  // );

  const addToCartHandler = () => {
    dispatch(addItemsToCart(item.product, item.quantity));
    deleteFavouriteItems(item.product);
    toast.success("Proizvod dodat u korpu");

  };

  const errorHandler = () => {
    toast.error("Zaliha proizvoda je ograničena");
  }

  return (
    <>
      <div className='FavouriteItemsCard'>
        <div>
          <img src={item.image} alt="ssa" />
          <p onClick={() => deleteFavouriteItems(item.product)}>Obriši</p>
          <Link to={`/product/${item.product}`} style={{
            fontSize: "300 0.9vmax",
            fontFamily: "cursive",
          }}>{item.name}</Link>
        </div>

        <div>
          <span>{`${item.price},00 RSD`}</span>
        </div>

        <div>
          <p style={{ paddingBottom: ".5vmax" }}>
            <b className={item.stock < 1 ? "redColor" : "greenColor"}>
              {item.stock < 1 ? "Nije na stanju" : "Na stanju"}
            </b>
          </p>
        </div>

        {item.stock ? (
          <div>
            <Link to={`/cart/`}>
              <button className='favouritesButton' onClick={addToCartHandler}>Dodaj u Korpu</button>
            </Link>
          </div>
        ) : (
          <div>
            <button className='favouritesButton' onClick={errorHandler}>Dodaj u Korpu</button>
          </div>
        )}



      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default FavouriteItemsCard
