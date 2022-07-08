import React, { useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/OrderAction";
//import { useAlert } from "react-alert";
import Loading from "../../more/Loader";
import BottomTab from "../../more/BottomTab";

const MyOrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.myOrderDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, match.params.id]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Detalji porudžbine" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Porudžbina #{order && order._id}
              </Typography>
              <Typography>Informacije o isporuci</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Ime:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Telefon:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Adresa:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.state}`}
                  </span>
                </div>
              </div>
              <Typography>Plaćanje</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus === "Isporučeno"
                        ? "greenColor"
                        : "redColor"
                    }
                  >                  
                  </p>
                  <p style={{
                      color:"green"
                  }}>
                  PLAĆENO
                  </p>
                </div>

                <div>
                  <p>Iznos:</p>
                  <span>{order.totalPrice && order.totalPrice},00 RSD</span>
                </div>
              </div>

              <Typography>Status porudžbine</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Isporučeno"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Stavke porudžbine:</Typography>
              <div className="orderDetailsCartItemsContainer">

                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item._id}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X {item.price},00RSD ={" "}
                        <b>{item.price * item.quantity},00RSD</b>
                      </span>
                    </div>
                  ))}


              </div>
            </div>
          </div>
        </>
      )}
      <BottomTab />
    </>
  );
};

export default MyOrderDetails;