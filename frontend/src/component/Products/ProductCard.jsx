import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      <Link className="ProductCard" to={`/product/${product._id}`}>
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="ProductImg"
        />
        <p className="productCategory">{product.category}</p>
        <p className="productName">{product.name}</p>
        <div>
          <Rating {...options} />
          {[2, 3, 4].includes(product.numOfReviews)
            ? <span>({product.numOfReviews} Recenzije)</span>
            : <span>({product.numOfReviews} Recenzija)</span>
          }
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="offerPriceBox">
            <h1
              className="discountPrice"
              style={{
                paddingLeft: "2.5vmax",
                fontSize: ".9vmax",
                paddingBottom: "0",
                color: '#e43232'
              }}
            >
              {product.offerPrice > 0 ? `${product.offerPrice},00 RSD` : ""}
            </h1>
            <span className="p__Price">{`${product.price},00 RSD`}</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
