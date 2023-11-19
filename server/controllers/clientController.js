import Product from "../models/productModel.js";
import ProductState from "../models/productState.js";
import User from "../models/userModel.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import Transaction from "../models/transactionModel.js";
import getCountryISO3 from "country-iso-2-to-3";
import httpstatustext from "../utils/httpstatustext.js";

export const getProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find({}, { __v: false });
  const productsWithStats = await Promise.all(
    products.map(async (product) => {
      const state = await ProductState.find({
        productId: product._id,
      });
      return {
        ...product._doc,
        state,
      };
    })
  );
  res.status(200).json({
    state: httpstatustext.SUCCESS,
    data: { product: productsWithStats },
  });
});

export const getCustomers = asyncWrapper(async (req, res) => {
  const customers = await User.find({ role: "user" });
  res.status(200).json({ state: httpstatustext.SUCCESS, data: { customers } });
});

export const getTransaction = asyncWrapper(async (req, res) => {
  let { search = "" } = req.query;
  const query = {
    $or: [
      { cost: { $regex: new RegExp(search, "i") } },
      { userId: { $regex: new RegExp(search, "i") } },
    ],
  };
  const transaction = await Transaction.find(query);
  res
    .status(200)
    .json({ state: httpstatustext.SUCCESS, data: { transaction } });
});

export const getGeography = asyncWrapper(async (req, res) => {
  const users = await User.find();
  const mapLocations = users.reduce((acc, { country }) => {
    const countryISO3 = getCountryISO3(country);
    if (!acc[countryISO3]) acc[countryISO3] = 0;
    acc[countryISO3]++;
    return acc;
  }, {});
  const formattedLocations = Object.entries(mapLocations).map(
    ([country, count]) => {
      return { id: country, value: count };
    }
  );
  res.status(200).json({ state: httpstatustext.SUCCESS, formattedLocations });
});
