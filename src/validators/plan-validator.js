const Joi = require("joi");

const td_planSchema = Joi.object({
  Order_No: Joi.string().required(), // ฟิลด์ที่ต้องมีค่า
  Parts_No: Joi.string().required(),
  OdPt_No: Joi.string().optional(),
  Parts_CD: Joi.string().optional().allow(null, ""),
  Pt_Material: Joi.string().optional().allow(null, ""),
  Pt_Qty: Joi.number().integer().optional().allow(null),
  Pt_Unit_CD: Joi.string().optional().allow(null, ""),
  Pt_Split: Joi.boolean().optional().allow(null),
  Pt_Spare_Qty: Joi.number().integer().optional().allow(null),
  Pt_NG_Qty: Joi.number().integer().optional().allow(null),
  Pt_l_Comp_Qty: Joi.number().integer().optional().allow(null),
  Connect_Od_No: Joi.string().optional().allow(null, ""),
  Connect_Pt_No: Joi.string().optional().allow(null, ""),
  Connect_Pr_No: Joi.number().integer().optional().allow(null),
  Pl_Quote_OdPt_No: Joi.string().optional().allow(null, ""),
  Pl_Quote_CD: Joi.string().optional().allow(null, ""),
  Pl_St_Rev_Day: Joi.number().integer().optional().allow(null),
  Pl_Ed_Rev_Day: Joi.number().integer().optional().allow(null),
  Pl_Progress_CD: Joi.string().optional().allow(null),
  Pl_Schedule_CD: Joi.string().optional().allow(null, ""),
  Pt_Instructions: Joi.string().optional().allow(null, ""),
  Pt_Remark: Joi.string().optional().allow(null, ""),
  Pt_Information: Joi.string().optional().allow(null, ""),
  Pl_Reg_Person_CD: Joi.string().optional().allow(null, ""),
  Pl_Upd_Person_CD: Joi.string().optional().allow(null, ""),
  Pl_Schedule_CD: Joi.string().optional().allow(null, ""),
  Pt_Delivery: Joi.date().optional().allow(null),
  Target_Delivery: Joi.date().optional().allow(null),
  Pl_Reg_Date: Joi.date().optional().allow(null),
  Pt_Complete_Date: Joi.date().optional().allow(null),
  Pt_I_Date: Joi.date().optional().allow(null),
  Pt_Shipment_Date: Joi.date().optional().allow(null),
  Pt_Calc_Date: Joi.date().optional().allow(null),
  Pt_Confirm_Date: Joi.date().optional().allow(null),
  Pl_Upd_Date: Joi.date().optional().allow(null),
  Pl_Month_Plan: Joi.boolean().optional().allow(null),
  Pl_Wweek_Plan: Joi.boolean().optional().allow(null),
  Pl_Today_Plan: Joi.boolean().optional().allow(null),
  Pt_CAT1: Joi.boolean().optional().allow(null),
  Pt_CAT2: Joi.boolean().optional().allow(null),
  Pt_CAT3: Joi.boolean().optional().allow(null),
  Money_Object: Joi.boolean().optional().allow(null),
  Outside: Joi.boolean().optional().allow(null),
  Pt_Pending: Joi.boolean().optional().allow(null),
  Info1: Joi.string().optional().allow(null, ""),
  Info2: Joi.string().optional().allow(null, ""),
  Info3: Joi.string().optional().allow(null, ""),
  Info4: Joi.string().optional().allow(null, ""),
  Info5: Joi.string().optional().allow(null, ""),
  Info6: Joi.string().optional().allow(null, ""),
  Info_Chk1: Joi.boolean().optional().allow(null),
  Info_Chk2: Joi.boolean().optional().allow(null),
  Info_Chk3: Joi.boolean().optional().allow(null),
  Info_Chk4: Joi.boolean().optional().allow(null),
  Info_Chk5: Joi.boolean().optional().allow(null),
  Info_Chk6: Joi.boolean().optional().allow(null),
  Max_No: Joi.string().optional().allow(null, "", Joi.string()),
  End_No: Joi.string().optional().allow(null, ""),
  Now_No: Joi.string().optional().allow(null, ""),
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
  Rs_Input: Joi.boolean().optional().allow(null),
  Into_I: Joi.boolean().optional().allow(null),
  Calc_Chk: Joi.boolean().optional().allow(null),
  // Generating fields PPT1 to PPT36
  ...Array.from({ length: 36 }, (_, i) => `PPT${i + 1}`).reduce((acc, key) => {
    acc[key] = Joi.number().integer().optional().allow(null);
    return acc;
  }, {}),
  // Generating fields PMT1 to PMT36
  ...Array.from({ length: 36 }, (_, i) => `PMT${i + 1}`).reduce((acc, key) => {
    acc[key] = Joi.number().integer().optional().allow(null);
    return acc;
  }, {}),
  // Generating fields PPC1 to PPC36
  ...Array.from({ length: 36 }, (_, i) => `PPC${i + 1}`).reduce((acc, key) => {
    acc[key] = Joi.string().optional().allow(null, "");
    return acc;
  }, {}),
  ...Array.from({ length: 36 }, (_, i) => `PPV${i + 1}`).reduce((acc, key) => {
    acc[key] = Joi.string().optional().allow(null, "");
    return acc;
  }, {}),
  ...Array.from({ length: 36 }, (_, i) => `PTP${i + 1}`).reduce((acc, key) => {
    acc[key] = Joi.string().optional().allow(null, "");
    return acc;
  }, {}),
  ...Array.from({ length: 36 }, (_, i) => `INN${i + 1}`).reduce((acc, key) => {
    acc[key] = Joi.string().optional().allow(null, "");
    return acc;
  }, {}),
  ...Array.from({ length: 36 }, (_, i) => `T_Type${i + 1}`).reduce(
    (acc, key) => {
      acc[key] = Joi.string().optional().allow(null, "");
      return acc;
    },
    {}
  ),
  ...Array.from({ length: 36 }, (_, i) => `P_Type${i + 1}`).reduce(
    (acc, key) => {
      acc[key] = Joi.string().optional().allow(null, "");
      return acc;
    },
    {}
  ),
  ...Array.from({ length: 36 }, (_, i) => `S_Type${i + 1}`).reduce(
    (acc, key) => {
      acc[key] = Joi.string().optional().allow(null, "");
      return acc;
    },
    {}
  ),
  ...Array.from({ length: 36 }, (_, i) => `PPD${i + 1}`).reduce((acc, key) => {
    acc[key] = Joi.date().optional().allow(null);
    return acc;
  }, {}),
  ...Array.from({ length: 36 }, (_, i) => `ASP${i + 1}`).reduce((acc, key) => {
    acc[key] = Joi.date().optional().allow(null);
    return acc;
  }, {}),
  ...Array.from({ length: 36 }, (_, i) => `BKD${i + 1}`).reduce((acc, key) => {
    acc[key] = Joi.date().optional().allow(null);
    return acc;
  }, {}),
  ...Array.from({ length: 36 }, (_, i) => `PML${i + 1}`).reduce((acc, key) => {
    acc[key] = Joi.number().integer().optional().allow(null);
    return acc;
  }, {}),
  ...Array.from({ length: 36 }, (_, i) => `PPL${i + 1}`).reduce((acc, key) => {
    acc[key] = Joi.number().integer().optional().allow(null);
    return acc;
  }, {}),
  ...Array.from({ length: 36 }, (_, i) => `RPD${i + 1}`).reduce((acc, key) => {
    acc[key] = Joi.date().optional().allow(null);
    return acc;
  }, {}),
  ...Array.from({ length: 36 }, (_, i) => `RMT${i + 1}`).reduce((acc, key) => {
    acc[key] = Joi.number().integer().optional().allow(null);
    return acc;
  }, {}),
    ...Array.from({ length: 36 }, (_, i) => `RPT${i + 1}`).reduce((acc, key) => {
    acc[key] = Joi.number().integer().optional().allow(null);
    return acc;
  }, {}),
      ...Array.from({ length: 36 }, (_, i) => `RPN${i + 1}`).reduce((acc, key) => {
    acc[key] = Joi.number().integer().optional().allow(null);
    return acc;
  }, {}),
});

module.exports = { td_planSchema };
