import  Overview from '../models/overallModel.js';
import httpstatustext from '../utils/httpstatustext.js';

export const getSales = async (req, res) => {
  const overall =await Overview.find();
  res.status(200).json({
    state: httpstatustext.SUCCESS,
    data: {overall}
  })
}

