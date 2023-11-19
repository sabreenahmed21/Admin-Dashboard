import mongoose from "mongoose";
import validator from "validator"; 

const userSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: [true, 'Please tell us youre name'],
      min: 2,
      max: 100
    },
    email : {
      type: String,
      required: [true, 'Please tell us your email address'],
      unique: true,
      lowercase: true,
      max:50,
      validate : {
        validator : function(value) {
          return validator.isEmail(value);
        },
        message : 'Please enter a valid email address'
      }
    },
    password : {
      type: String,
      required: [true, 'Please tell us your password'],
      min: 6,
      select: false
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type:String,
      enum: ["user", "admin", "superadmin"],
      default: "admin"
    }
  },
  {
    timestamps: true,
  }
)
export default mongoose.model('User', userSchema);