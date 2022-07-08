const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mongo4j = require("mongo4j");
require("dotenv").config({
    path:"backend/config/.env"
  })

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Molimo Vas, vaše ime"],
        minlength:[3,"Unesite ime od najmanje 3 znaka"], 
        maxlength:[50, "Ime ne može biti veće od 15 znakova"],
        neo_prop: true
    },
    email:{
       type:String,
       required:[true,"Molimo vas da unesete svoj email"],
       validate: [validator.isEmail,"Molimo Vas da unesete ispravan e-mail"],
       unique: true,
       neo_prop: true
   },
   password:{
      type:String,
      required:[true,"Molimo vas unesite vašu šifru!"],
      minlength:[8,"Lozinka treba da ima više od 8 znakova"],
      select: false,
      neo_prop: true
   },
   avatar:{
    public_id:{
        type:String,
        required:true,
    },
    url:{ 
        type:String,
        required:true,
    },
   },
   role:{
       type:String,
       default: "user",
       neo_prop: true
   },
   createdAt:{
     type: Date,
     default:Date.now(),
   },
   resetPasswordToken: String,
   resetPasswordTime: Date,
});

// Hash password
userSchema.pre("save", async function(next){
     if (!this.isModified("password")) {
        next();
      }
    this.password = await bcrypt.hash(this.password,10);
});

// jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    });
};

// compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// Forgot password
userSchema.methods.getResetToken = function(){
    // Generating token
   const resetToken = crypto.randomBytes(20).toString("hex");
    
//    hashing and adding resetPasswordToken to userSchema
this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

this.resetPasswordTime = Date.now() + 15 * 60 * 1000;

return resetToken;
}

userSchema.plugin(mongo4j.plugin());

module.exports = mongoose.model("User",userSchema);
