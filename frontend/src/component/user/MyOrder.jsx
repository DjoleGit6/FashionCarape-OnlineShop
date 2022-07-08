import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/OrderAction";
import { Link } from "react-router-dom";
import MetaData from "../../more/Metadata";
import LaunchIcon from "@material-ui/icons/Launch";
import Loading from "../../more/Loader";
import BottomTab from "../../more/BottomTab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Home/Home.css";
import CarouselRec from '../../more/CarouselRec.jsx';
import ProductCard from "../Products/ProductCard";

const MyOrder = () => {
  const dispatch = useDispatch();

  const { loading, error, orders, products } = useSelector((state) => state.myOrder);

  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "ID Porudžbine", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Isporučeno"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Količina",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Iznos",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Akcija",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length === 0 ? 1 : item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Porudžbine`} />

      {loading ? (
        <Loading />
      ) : (
          <div className="container">
            <div className="myOrdersPage">
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                disableSelectionOnClick
                className="myOrdersTable"
                autoHeight
              />
              
            </div>
            <div className="recommendsContainer">
                <div className="nt-home-by-genre">
                  <div className="nt-box">
                    <div className="nt-box-title">
                      <p>Korisnici koji su kupili proizvode koje ste vi naručili su takođe kupili i ove proizvode:</p>
                    </div>

                    <CarouselRec>
                      {products && products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                    </CarouselRec>
                  </div>
                </div>
              </div>
          </div>
      )}
      <BottomTab />
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

export default MyOrder;
