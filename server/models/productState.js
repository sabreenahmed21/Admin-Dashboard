import mongoose from "mongoose";

const productStateSchema = new mongoose.Schema(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    monthlyData: [{ month: String, totalSales: Number, totalUnits: Number }],
    dailyData: [{ date: String, totalSales: Number, totalUnits: Number }],
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("ProductState", productStateSchema);
