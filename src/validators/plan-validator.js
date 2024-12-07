const Joi = require('joi');

const td_planSchema = Joi.object({
  Order_No: Joi.string().required(),        // ฟิลด์ที่ต้องมีค่า
  Parts_No: Joi.string().required(),        
  OdPt_No: Joi.string().optional(),
  Parts_CD: Joi.string().optional().allow(null, ''),
  Pt_Material: Joi.string().optional().allow(null, ''),
  Pt_Qty: Joi.number().integer().optional().allow(null),
  Pt_Unit_CD: Joi.string().optional().allow(null, ''),
  Pt_Split: Joi.boolean().optional().allow(null),
  Pt_Spare_Qty: Joi.number().integer().optional().allow(null),
  Pt_NG_Qty: Joi.number().integer().optional().allow(null),
  Pt_l_Comp_Qty: Joi.number().integer().optional().allow(null),
  Connect_Od_No: Joi.string().optional().allow(null, ''),
  Connect_Pt_No: Joi.string().optional().allow(null, ''),
  Connect_Pr_No: Joi.number().integer().optional().allow(null),
  Pl_Quote_OdPt_No: Joi.string().optional().allow(null, ''),
  PI_Quote_CD: Joi.string().optional().allow(null, ''),
  PI_St_Rev_Day: Joi.number().integer().optional().allow(null),
  Pl_Ed_Rev_Day: Joi.number().integer().optional().allow(null),
  Pl_Progress_CD: Joi.number().integer().optional().allow(null),
  PI_Schedule_CD: Joi.string().optional().allow(null, ''),
  Pt_Instructions: Joi.string().optional().allow(null, ''),
  Pt_Remark: Joi.string().optional().allow(null, ''),
  Pt_Information: Joi.string().optional().allow(null, ''),
  Pl_Reg_Person_CD: Joi.string().optional().allow(null, ''),
  PI_Upd_Person_CD: Joi.string().optional().allow(null, ''),
  Pt_Delivery: Joi.date().optional().allow(null),
  Target_Delivery: Joi.date().optional().allow(null),
  PI_Reg_Date: Joi.date().optional().allow(null),
  Pt_Complete_Date: Joi.date().optional().allow(null),
  Pt_I_Date: Joi.date().optional().allow(null),
  Pt_Shipment_Date: Joi.date().optional().allow(null),
  Pt_Calc_Date: Joi.date().optional().allow(null),
  Pt_Confirm_Date: Joi.date().optional().allow(null),
  PI_Upd_Date: Joi.date().optional().allow(null),
  Pl_Month_Plan: Joi.boolean().optional().allow(null),
  PI_Wweek_Plan: Joi.boolean().optional().allow(null),
  PI_Today_Plan: Joi.boolean().optional().allow(null),
  Pt_CAT1: Joi.boolean().optional().allow(null),
  Pt_CAT2: Joi.boolean().optional().allow(null),
  Pt_CAT3: Joi.boolean().optional().allow(null),
  Money_Object: Joi.boolean().optional().allow(null),
  Outside: Joi.boolean().optional().allow(null),
  Pt_Pending: Joi.boolean().optional().allow(null),
  Info1: Joi.string().optional().allow(null, ''),
  Info2: Joi.string().optional().allow(null, ''),
  Info3: Joi.string().optional().allow(null, ''),
  Info4: Joi.string().optional().allow(null, ''),
  Info5: Joi.string().optional().allow(null, ''),
  Info6: Joi.string().optional().allow(null, ''),
  Info_Chk1: Joi.boolean().optional().allow(null),
  Info_Chk2: Joi.boolean().optional().allow(null),
  Info_Chk3: Joi.boolean().optional().allow(null),
  Info_Chk4: Joi.boolean().optional().allow(null),
  Info_Chk5: Joi.boolean().optional().allow(null),
  Info_Chk6: Joi.boolean().optional().allow(null),
  Max_No: Joi.string().optional().allow(null, '', Joi.string()),
  End_No: Joi.string().optional().allow(null, ''),
  Now_No: Joi.string().optional().allow(null, ''),
  Total_M_Time: Joi.number().integer().optional().allow(null),
  Total_P_Time: Joi.number().integer().optional().allow(null),
  Re_Pr_Qty: Joi.number().integer().optional().allow(null),
  Re_Total_M_Time: Joi.number().integer().optional().allow(null),
  Re_Total_P_Time: Joi.number().integer().optional().allow(null),
  Re_Total_N_Time: Joi.number().integer().optional().allow(null),
  Re_Days: Joi.number().integer().optional().allow(null),
  Re_Days_CAT: Joi.number().integer().optional().allow(null),
  Re_Days_Work_R: Joi.number().integer().optional().allow(null),
  Re_Days_Work_P: Joi.number().integer().optional().allow(null),
  Re_Pr_Qty_P: Joi.number().integer().optional().allow(null),
  Priority_P: Joi.number().integer().optional().allow(null),
  Join_P: Joi.number().integer().optional().allow(null),
  Priority_Rate: Joi.number().integer().optional().allow(null),
  Od_Progress_CD: Joi.number().optional().allow(null),
  Pl_Reg_Date: Joi.date().optional().allow(null),
  Pl_Upd_Date: Joi.date().optional().allow(null),
  PPC1: Joi.string().optional().allow(null, ''),
  PPC2: Joi.string().optional().allow(null, ''),
  PPC3: Joi.string().optional().allow(null, ''),
  PPC4: Joi.string().optional().allow(null, ''),
  PPC5: Joi.string().optional().allow(null, ''),
  PPC6: Joi.string().optional().allow(null, ''),
  PPC7: Joi.string().optional().allow(null, ''),
  PPC8: Joi.string().optional().allow(null, ''),
  PPC9: Joi.string().optional().allow(null, ''),
  PPC10: Joi.string().optional().allow(null, ''),
  PPC11: Joi.string().optional().allow(null, ''),
  PPC12: Joi.string().optional().allow(null, ''),
  PPC13: Joi.string().optional().allow(null, ''),
  PPC14: Joi.string().optional().allow(null, ''),
  PPC15: Joi.string().optional().allow(null, ''),
  PPC16: Joi.string().optional().allow(null, ''),
  PPC17: Joi.string().optional().allow(null, ''),
  PPC18: Joi.string().optional().allow(null, ''),
  PPC19: Joi.string().optional().allow(null, ''),
  PPC20: Joi.string().optional().allow(null, ''),
  PPC21: Joi.string().optional().allow(null, ''),
  PPC22: Joi.string().optional().allow(null, ''),
  PPC23: Joi.string().optional().allow(null, ''),
  PPC24: Joi.string().optional().allow(null, ''),
  PPC25: Joi.string().optional().allow(null, ''),
  PPC26: Joi.string().optional().allow(null, ''),
  PPC27: Joi.string().optional().allow(null, ''),
  PPC28: Joi.string().optional().allow(null, ''),
  PPC29: Joi.string().optional().allow(null, ''),
  PPC30: Joi.string().optional().allow(null, ''),
  PPC31: Joi.string().optional().allow(null, ''),
  PPC32: Joi.string().optional().allow(null, ''),
  PPC33: Joi.string().optional().allow(null, ''),
  PPC34: Joi.string().optional().allow(null, ''),
  PPC35: Joi.string().optional().allow(null, ''),
  PPC36: Joi.string().optional().allow(null, ''),
  PMT1: Joi.number().integer().optional().allow(null),
  PMT2: Joi.number().integer().optional().allow(null),
  PMT3: Joi.number().integer().optional().allow(null),
  PMT4: Joi.number().integer().optional().allow(null),
  PMT5: Joi.number().integer().optional().allow(null),
  PMT6: Joi.number().integer().optional().allow(null),
  PMT7: Joi.number().integer().optional().allow(null),
  PMT8: Joi.number().integer().optional().allow(null),
  PMT9: Joi.number().integer().optional().allow(null),
  PMT10: Joi.number().integer().optional().allow(null),
  PMT11: Joi.number().integer().optional().allow(null),
  PMT12: Joi.number().integer().optional().allow(null),
  PMT13: Joi.number().integer().optional().allow(null),
  PMT14: Joi.number().integer().optional().allow(null),
  PMT15: Joi.number().integer().optional().allow(null),
  PMT16: Joi.number().integer().optional().allow(null),
  PMT17: Joi.number().integer().optional().allow(null),
  PMT18: Joi.number().integer().optional().allow(null),
  PMT19: Joi.number().integer().optional().allow(null),
  PMT20: Joi.number().integer().optional().allow(null),
  PMT21: Joi.number().integer().optional().allow(null),
  PMT22: Joi.number().integer().optional().allow(null),
  PMT23: Joi.number().integer().optional().allow(null),
  PMT24: Joi.number().integer().optional().allow(null),
  PMT25: Joi.number().integer().optional().allow(null),
  PMT26: Joi.number().integer().optional().allow(null),
  PMT27: Joi.number().integer().optional().allow(null),
  PMT28: Joi.number().integer().optional().allow(null),
  PMT29: Joi.number().integer().optional().allow(null),
  PMT30: Joi.number().integer().optional().allow(null),
  PMT31: Joi.number().integer().optional().allow(null),
  PMT32: Joi.number().integer().optional().allow(null),
  PMT33: Joi.number().integer().optional().allow(null),
  PMT34: Joi.number().integer().optional().allow(null),
  PMT35: Joi.number().integer().optional().allow(null),
  PMT36: Joi.number().integer().optional().allow(null),
});

module.exports = {td_planSchema};
