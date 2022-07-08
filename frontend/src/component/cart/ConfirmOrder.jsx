import React from "react";
import "./ConfirmOrder.css";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../../more/Metadata";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import BottomTab from "../../more/BottomTab";



const ConfirmOrder = ({ history }) => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const { user } = useSelector((state) => state.user);
    
    let productPrice =  cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    const subtotal = productPrice 
      // eslint-disable-next-line
    const shippingCharges = productPrice > 99 ? 0 : 50;
    
    const totalPrice = subtotal + shippingCharges;
  
    const address = `${shippingInfo.address}, ${shippingInfo.state}, ${shippingInfo.country}`;
  
    const proceedToPayment = () => {
      const data = {
        subtotal,
        shippingCharges,
        totalPrice,
      };
  
      sessionStorage.setItem("orderInfo", JSON.stringify(data));
  
      history.push("/process/payment");
    };
  
    return (
      <>
        <MetaData title="Potvrda porudžbine" />
        <CheckoutSteps activeStep={1} />
        <div className="confirmOrderPage">
          <div>
            <div className="confirmshippingArea">
              <Typography>Informacije o isporuci</Typography>
              <div className="confirmshippingAreaBox">
                <div>
                  <p>Ime:</p>
                  <span>{user.name}</span>
                </div>
                <div>
                  <p>Telefon:</p>
                  <span>{shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Adresa:</p>
                  <span>{address}</span>
                </div>
              </div>
            </div>
            <div className="confirmCartItems">
              <Typography>Tvoje stavke iz korpe:</Typography>


              {cartItems.length === 0 ? 
                <div className="confirmCartItemsContainer">
                   ""
                 </div>
                  :
             <div className="confirmCartItemsContainer">
             {cartItems.map((item) => (
               <div key={item.product}>
                 <img src={item.image} alt="Product" />
                 <Link to={`/product/${item.product}`}>
                   {item.name}
                 </Link>{" "}
                 <span>
                   {item.quantity} X {item.price},00RSD ={" "}
                   <b>{item.price * item.quantity},00RSD</b>
                 </span>
               </div>
             ))
              }
           </div>
          }
     
            </div>
          </div>
          {/*  */}
          <div>
            <div className="orderSummary">
              <Typography>Rezime porudžbine</Typography>
              <div>
                <div>
                  <p>Medjuzbir:</p>
                  <span>{subtotal},00RSD</span>
                </div>
                <div>
                  <p>Troškovi slanja:</p>
                  <span>{shippingCharges},00RSD</span>
                </div>
                <div>
                </div>
              </div>
  
              <div className="orderSummaryTotal">
                <p>
                  <b>Ukupno:</b>
                </p>
                <span>{totalPrice},00RSD</span>
              </div>
                  
              <button onClick={proceedToPayment}>Pređi na plaćanje</button>
            </div>
          </div>
        </div>
        <BottomTab />
      </>
    );
  };
  
  export default ConfirmOrder;
