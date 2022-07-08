const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

    // wrong mongodb id error
    if(err.name === "CastError"){
        const message = `Resursi nisu pronađeni sa ovim ID-em..Nevažeći ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
  

    // Duplicate key error
    if (err.code === 11000) {
        const message = `Duplikat ${Object.keys(err.keyValue)} je unet`;
        err = new ErrorHandler(message, 400);
      }

     // Wrong Jwt error
     if (err.name === "JsonWebTokenError") {
     const message = `Vaš URL je nevažeći, pokušajte ponovo`;
     err = new ErrorHandler(message, 400);
     }

      //Jwt expired error
      if (err.name === "TokenExpiredError") {
        const message = `Vaš URL je istekao, pokušajte ponovo`;
        err = new ErrorHandler(message, 400);
        }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}

