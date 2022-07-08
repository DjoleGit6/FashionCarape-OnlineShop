import React, { useEffect, useState } from "react";
import Footer from "../../Footer";
import Header from "../Home/Header";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../more/Loader";
import ProductCard from "./ProductCard";
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Pagination from "react-js-pagination";
import "./Product.css";
import Typography from"@material-ui/core/Typography"
// import { useAlert } from "react-alert";
import MetaData from "../../more/Metadata";
import BottomTab from "../../more/BottomTab";

const categories = [
  "Ženski unihopi",
  "Ženski unihopi - print",
  "Ženski unihopi - u boji",
  "Ženske helanke",
  "Ženske dokolenice",
  "Ženske natkolenice",
  "Ženske samodržeće",
  "Ženske sokne",
  "Dečiji unihop",
  "Dečije dokolenice",
  "Dečije sokne",
  "Muške sokne",
  "Muške nazuvice",
  "Muške sportske"
]

const Products = ({ match }) => {
  const dispatch = useDispatch();
  
  const [currentPage, setCurrentPage] = useState(1);
  
  const [category,setCategory] = useState("");

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };


  useEffect(() => {
      if(error){
          alert(error);
          dispatch(clearErrors())
      }
    dispatch(getProduct(keyword, currentPage,category));
  }, [dispatch, keyword,currentPage,category,error]); 



  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <MetaData title="Proizvodi" />
          <Header />
          <div>
           {products.length === 0 ? 
            ""
            :
            <h2
            style={{
              textAlign: "center",
              borderBottom: "1px solid #de3ac6",
              width: "20vmax",
              fontSize: "1.4vmax",
              fontFamily: "Poppins,sans-serif",
              margin: "3vmax auto",
              color: "#de3ac6",
            }}
          >
            Izdvajamo iz ponude
          </h2>
           }
            <div className="sidebar__product" style={{
                display:"flex",
                flex:1,
            }}>
                <div className="sidebar__products" style={{
                  border: "1px solid #999",
                  margin:"1vmax",
                  flex:".177",
                  height: "65vh"
              }}>
                  <Typography style={{fontSize:"1.2vmax",padding:"5px"}}>IZABERITE KATEGORIJU</Typography>
                  <ul className="categoryBox">
                      {categories.map((category) =>(
                          <li
                          className="category-link"
                          key={category}
                          onClick={() =>setCategory(category)}
                          type="checkbox">
                          {category}
                          </li> 
                      ))}
                  </ul>
              </div>

             {products.length === 0 ?
             <span style={{
               display:"block",
               padding:"30px 0",
               fontSize:"1.5rem",
               flex:".9",
               textAlign:"center"
             }}>Nije pronadjen nijedan proizvod ....</span>
             : 
             <div
             className="products"
             style={{
               display: "flex",
               flexWrap: "wrap",
               justifyContent: "center",
               flex:".9"
             }}
           >
             {products &&
               products.map((product) => (
                 <ProductCard key={product._id} product={product} />
               ))}
           </div>
              }
             
             </div>
            
              <div
                className="pagination__box"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "6vmax",
                }}
              >
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
          </div>
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Products;
