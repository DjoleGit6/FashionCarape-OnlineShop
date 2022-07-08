const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
require("dotenv").config({
  path:"backend/config/.env"
});


exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next) =>{
    const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Molimo vas da se prijavite za pristup ovom resursu", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decodedData.id);

  next();
});

// Admin Roles
exports.authorizeRoles = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
          return next(new ErrorHandler(`${req.user.role} ne može pristupiti ovim resursima`));
        };
        next();
    }
}