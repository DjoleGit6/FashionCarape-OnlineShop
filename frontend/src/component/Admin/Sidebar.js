import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
//import LocalOffer from "@material-ui/icons/LocalOffer";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import logo from "../../Assets/fc_logo.png";

const Sidebar = () => {
  
  const button = () =>{
    //let items = document.querySelectorAll(".Dashboard__item");
   
}

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce"
        />
      </Link>
      <Link to="/dashboard">
        <p className="Dashboard__item" onClick={button}>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
          <Link to="/admin/products">
              <p className="Dashboard__item"><PostAddIcon /> Svi proizvodi</p>
          </Link>

          <Link to="/admin/product">
             <p><AddIcon />Novi proizvod</p>
          </Link>

         
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Porudžbine
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Korisnici
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Ocene
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;