import React, { useEffect } from "react";
import "./Home.css";
import Carousel from "react-material-ui-carousel";
import bg from "../../Assets/postolje.jpg";
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Header from "./Header";
import MetaData from "../../more/Metadata";
import Footer from "../../Footer";
import BottomTab from "../../more/BottomTab";
import Loading from "../../more/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CarouselRec from '../../more/CarouselRec.jsx';
import ProductCard from "../Products/ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const { products, bestSellingProducts, error, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error])

  return (
    <>
      {loading ? (
        <Loading />
      )
        : (
          <>
            <MetaData title="Home" />
            <Header />
            {/* Carousel */}
            <div className="banner">
              <Carousel>
                <img src={bg} className="bgImg" alt="Img" />
              </Carousel>
              <div className="home__content">
                <div style={{
                  display: "flex",
                  alignItems: "center",
                }}>
                  <h2 style={{
                    fontFamily: "Segoe Script",
                    fontSize: "3em",
                    fontWeight: "500"
                  }}>Kupi 5, uzmi</h2>
                  <span style={{
                    padding: "10px",
                    backgroundColor: "#fff",
                    margin: "0px 10px",
                    textAlign: "center",
                    width: "220px",
                    height: "40px",
                    color: "#26c",
                    fontFamily: "Segoe Script",
                    fontSize: "2.4em",
                    display: "flex",
                    justifyContent: "center",
                    lineHeight: ".7",
                    alignItems: "center"
                  }}>1 GRATIS!</span>
                </div>
                <div>
                  <h2 style={{
                    fontSize: "4.5em",
                    fontFamily: "Poppins,sans-serif",
                    color: "#fff",
                  }}>Fashion</h2>
                </div>
                <div>
                  <h2 style={{
                    fontSize: "4.5em",
                    fontWeight: "400",
                    fontFamily: "Poppins,sans-serif",
                    color: "#fff",
                    lineHeight: "1.3"
                  }}>Kolekcija</h2>
                </div>
                <div>
                  <h2
                    style={{
                      fontWeight: "600",
                      fontFamily: "Poppins,sans-serif",
                      color: "#fff",
                      fontSize: "1em",
                      paddingTop: "10px"
                    }}
                  >
                    Ostvari besplatnu poštarinu za sve porudžbine preko 3000 RSD
                  </h2>
                </div>
                <div>
                  <a href="#container">
                    <button type="submit" style={{
                      width: "200px",
                      height: "50px",
                      border: "none",
                      borderRadius: "25px",
                      background: "#7b11ea", //"#7b11ea",
                      margin: "10px 0",
                      fontSize: "1.2vmax",
                      color: "#fff",
                      cursor: "pointer"
                    }}
                      className="Home__button"
                    >PROIZVODI</button>
                  </a>
                </div>
              </div>
            </div>

            <h2 className="homeHeading">Izdvajamo iz ponude</h2>
            <div className="container" id="container">
              <div className="nt-home-by-genre">
                <div className="nt-box">
                  <div className="nt-box-title">
                    <p>Poslednje dodati proizvodi</p>
                  </div>

                  <CarouselRec>
                    {products && products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </CarouselRec>
                </div>
              </div>
              <br />
              <br />
              <div className="nt-home-by-genre">
                <div className="nt-box">
                  <div className="nt-box-title">
                    <p>Najpopularniji proizvodi</p>
                  </div>

                  <CarouselRec>
                    {bestSellingProducts && bestSellingProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </CarouselRec>
                </div>
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
            <Footer />
            <BottomTab />
          </>
        )}
    </>
  );
};

export default Home;
