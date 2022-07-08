import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon style={{color:"#de3ac6"}}/>

      <Typography>Vaša porudžbina je uspešno poslata </Typography>
      <Link to="/orders" style={{backgroundColor:"#7b11ea"}}>Vidite porudžbine</Link>
    </div>
  );
};

export default Success;