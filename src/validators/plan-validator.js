const Joi = require('joi');

const td_planSchema = Joi.object({
  Order_No: Joi.string().required(),        // ฟิลด์ที่ต้องมีค่า
  Parts_No: Joi.string().required(),        
  OdPt_No: Joi.string().optional(),
  Parts_CD: Joi.string(),
  Pt_Material: Joi.string(),
  Pt_Qty: Joi.number().integer(),
  Pt_Unit_CD: Joi.string(),
  Pt_Split: Joi.boolean(),
  Pt_Spare_Qty: Joi.number().integer(),
  Pt_NG_Qty: Joi.number().integer(),
  Pt_l_Comp_Qty: Joi.number().integer(),
  Connect_Od_No: Joi.string(),
  Connect_Pt_No: Joi.string(),
  Connect_Pr_No: Joi.number().integer(),
  Pl_Quote_OdPt_No: Joi.string(),
  PI_Quote_CD: Joi.string(),
  PI_St_Rev_Day: Joi.number().integer(),
  Pl_Ed_Rev_Day: Joi.number().integer(),
  Pl_Progress_CD: Joi.number().integer(),
  PI_Schedule_CD: Joi.string(),
  Pt_Instructions: Joi.string(),
  Pt_Remark: Joi.string(),
  Pt_Information: Joi.string(),
  Pl_Reg_Person_CD: Joi.string(),
  PI_Upd_Person_CD: Joi.string(),
  Pt_Delivery: Joi.date(),
  Target_Delivery: Joi.date(),
  PI_Reg_Date: Joi.date(),
  Pt_Complete_Date: Joi.date(),
  Pt_I_Date: Joi.date(),
  Pt_Shipment_Date: Joi.date(),
  Pt_Calc_Date: Joi.date(),
  Pt_Confirm_Date: Joi.date(),
  PI_Upd_Date: Joi.date(),
  Pl_Month_Plan: Joi.boolean(),
  PI_Wweek_Plan: Joi.boolean(),
  PI_Today_Plan: Joi.boolean(),
  Pt_CAT1: Joi.boolean(),
  Pt_CAT2: Joi.boolean(),
  Pt_CAT3: Joi.boolean(),
  Money_Object: Joi.boolean(),
  Outside: Joi.boolean(),
  Pt_Pending: Joi.boolean(),
  Info1: Joi.string(),
  Info2: Joi.string(),
  Info3: Joi.string(),
  Info4: Joi.string(),
  Info5: Joi.string(),
  Info6: Joi.string(),
  Info_Chk1: Joi.boolean(),
  Info_Chk2: Joi.boolean(),
  Info_Chk3: Joi.boolean(),
  Info_Chk4: Joi.boolean(),
  Info_Chk5: Joi.boolean(),
  Info_Chk6: Joi.boolean(),
  Max_No: Joi.string(),
  End_No: Joi.string(),
  Now_No: Joi.string(),
  Total_M_Time: Joi.number().integer(),
  Total_P_Time: Joi.number().integer(),
  Re_Pr_Qty: Joi.number().integer(),
  Re_Total_M_Time: Joi.number().integer(),
  Re_Total_P_Time: Joi.number().integer(),
  Re_Total_N_Time: Joi.number().integer(),
  Re_Days: Joi.number().integer(),
  Re_Days_CAT: Joi.number().integer(),
  Re_Days_Work_R: Joi.number().integer(),
  Re_Days_Work_P: Joi.number().integer(),
  Re_Pr_Qty_P: Joi.number().integer(),
  Priority_P: Joi.number().integer(),
  Join_P: Joi.number().integer(),
  Priority_Rate: Joi.number().integer(),
  PPC1: Joi.string(),
  PPC2: Joi.string(),
  PPC3: Joi.string(),
  PPC4: Joi.string(),
  PPC5: Joi.string(),
  PPC6: Joi.string(),
  PPC7: Joi.string(),
  PPC8: Joi.string(),
  PPC9: Joi.string(),
  PPC10: Joi.string(),
  PPC11: Joi.string(),
  PPC12: Joi.string(),
  PPC13: Joi.string(),
  PPC14: Joi.string(),
  PPC15: Joi.string(),
  PPC16: Joi.string(),
  PPC17: Joi.string(),
  PPC18: Joi.string(),
  PPC19: Joi.string(),
  PPC20: Joi.string(),
  PPC21: Joi.string(),
  PPC22: Joi.string(),
  PPC23: Joi.string(),
  PPC24: Joi.string(),
  PPC25: Joi.string(),
  PPC26: Joi.string(),
  PPC27: Joi.string(),
  PPC28: Joi.string(),
  PPC29: Joi.string(),
  PPC30: Joi.string(),
  PPC31: Joi.string(),
  PPC32: Joi.string(),
  PPC33: Joi.string(),
  PPC34: Joi.string(),
  PPC35: Joi.string(),
  PPC36: Joi.string(),
  PMT1: Joi.number().integer(),
  PMT2: Joi.number().integer(),
  PMT3: Joi.number().integer(),
  PMT4: Joi.number().integer(),
  PMT5: Joi.number().integer(),
  PMT6: Joi.number().integer(),
  PMT7: Joi.number().integer(),
  PMT8: Joi.number().integer(),
  PMT9: Joi.number().integer(),
  PMT10: Joi.number().integer(),
  PMT11: Joi.number().integer(),
  PMT12: Joi.number().integer(),
  PMT13: Joi.number().integer(),
  PMT14: Joi.number().integer(),
  PMT15: Joi.number().integer(),
  PMT16: Joi.number().integer(),
  PMT17: Joi.number().integer(),
  PMT18: Joi.number().integer(),
  PMT19: Joi.number().integer(),
  PMT20: Joi.number().integer(),
  PMT21: Joi.number().integer(),
  PMT22: Joi.number().integer(),
  PMT23: Joi.number().integer(),
  PMT24: Joi.number().integer(),
  PMT25: Joi.number().integer(),
  PMT26: Joi.number().integer(),
  PMT27: Joi.number().integer(),
  PMT28: Joi.number().integer(),
  PMT29: Joi.number().integer(),
  PMT30: Joi.number().integer(),
  PMT31: Joi.number().integer(),
  PMT32: Joi.number().integer(),
  PMT33: Joi.number().integer(),
  PMT34: Joi.number().integer(),
  PMT35: Joi.number().integer(),
  PMT36: Joi.number().integer()
});

module.exports = {td_planSchema};
