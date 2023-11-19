import User  from "../models/userModel.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import httpstatustext  from "../utils/httpstatustext.js";
import AppError from "../utils/apperror.js";
import Overview from "../models/overallModel.js";
import Transaction from "../models/transactionModel.js";

export const getUser = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    const err = AppError.create("User not found", 404, httpstatustext.FAIL);
    return next(err);
  }
  res.status(200).json({
    state: httpstatustext.SUCCESS,
    data: { user },
  });
});

export const getDashboard = asyncWrapper(async (req, res, next) => {
  const transactions = await Transaction.find()
    .limit(50)
    .sort({ createdOn: -1 });
  const currentMonth = "November";
  const currentYear = 2021;
  const currentDay = "2021-11-15";

  const overall = await Overview.find({ year: currentYear });
  const {
    totalCustomers,
    yearlyTotalSoldUnits,
    yearlySalesTotal,
    monthlyData,
    salesByCategory,
  } = overall[0];

  const thisMonthStats = overall[0].monthlyData.find(({ month }) => {
    return month === currentMonth;
  });

  const todayStats = overall[0].dailyData.find(({ date }) => {
    return date === currentDay;
  });

  res.status(200).json({
    state: httpstatustext.SUCCESS,
    data: {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
      overall,
    },
  });
});
