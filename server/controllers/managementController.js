import User from "../models/userModel.js";
import mongoose from "mongoose";
import Transaction from "../models/transactionModel.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import httpstatustext  from "../utils/httpstatustext.js";

export const getAdmins = asyncWrapper(async (req, res, next) => {
  const admins = await User.find({ role: "admin" });
  res.status(200).json({ state: httpstatustext.SUCCESS, data: { admins } });
});

export const getUserPerformance = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const userWithStats = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "affiliatestats",
        localField: "_id",
        foreignField: "userId",
        as: "affiliateStats",
      },
    },
    { $unwind: "$affiliateStats" },
  ]);
  const saleTransactions = await Promise.all(
    userWithStats[0].affiliateStats.affiliateSales.map((id) => {
      return Transaction.findById(id);
    })
  );
  const filteredSaleTransactions = saleTransactions.filter(
    (transaction) => transaction !== null
  );
  res
    .status(200)
    .json({
      state: httpstatustext.SUCCESS,
      user: userWithStats[0],
      sales: filteredSaleTransactions,
    });
});
