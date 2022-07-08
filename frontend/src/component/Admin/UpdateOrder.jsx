import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../more/Metadata";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/OrderAction";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constans/OrderConstans";
import "./UpdateOrder.css";
import "../cart/CheckoutSteps.css";
import { ToastContainer, toast } from 'react-toastify';


const UpdateOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector((state) => state.myOrderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.deleteOrder);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(match.params.id, myForm));
  };

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Porudžbina uspešno ažurirana");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, match.params.id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Obrada porudžbine" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loading />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Isporučeno" ? "block" : "grid",
              }}
            >
              <div className="confirmOrderPageOverflow">
                <div className="confirmshippingArea">
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
                      <p style={{
                          color:"green"
                      }}>
                        PLAĆENO
                      </p>
                    </div>

                    <div>
                      <p>Iznos:</p>
                      <span>{order.totalPrice && order.totalPrice},00RSD</span>
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
                <div className="confirmCartItems">
                  <Typography>Tvoje stavke iz korpe:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
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
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Isporučeno" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Odaberi kategoriju</option>
                      {order.orderStatus === "Obrada" && (
                        <option value="Otpremljeno">Otpremljeno</option>
                      )}

                      {order.orderStatus === "Otpremljeno" && (
                        <option value="Isporučeno">Isporučeno</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Obradi
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
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
    </Fragment>
  );
};

export default UpdateOrder;