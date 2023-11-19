import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import generalRoutes from "./routs/generalRouter.js";
import clientRoutes from "./routs/clientRouter.js";
import managementRoutes from "./routs/managementRouter.js";
import salesRoutes from "./routs/salesRouter.js";
import  globalError from './controllers/errorController.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(mongoSanitize());
app.use(cors());

/*ROUTES */
app.use("/general", generalRoutes);
app.use("/client", clientRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// /* IMPORT DATA */
// import User from './models/userModel.js';
// import Product from "./models/productModel.js";
// import ProductState from './models/productState.js';
// import Transaction from './models/transactionModel.js';
//import  Overview  from './models/overallModel.js';
// import AffiliateStat  from './models/affiliateModel.js'
//import {dataAffiliateStat ,dataUser ,dataProduct, dataProductState , dataTransaction , dataOverallStat} from "./data/index.js";

/* MONGOOSE CONNECTION */
const db = process.env.BASE_URL.replace("<password>", process.env.PASSWORD_URL);
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to Mongoosedb");
    /* only add data one time */
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    //ProductState.insertMany(dataProductState);
    //Transaction.insertMany(dataTransaction);
    //Overview.insertMany(dataOverallStat);
    //AffiliateStat.insertMany( dataAffiliateStat )
  });

/* ERROR*/
app.all("*", (req, res, next) => {
  const err = new Error(`Not Found: ${req.originalUrl} on this server`);
  err.statuscode ;
  next(err);
});
app.use(globalError);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log("server listening on port " + port));
