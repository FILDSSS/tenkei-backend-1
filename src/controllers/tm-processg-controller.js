const createError = require("../utils/create-error");
const prisma = require("../models/prisma");
const { tm_processgSchema } = require("../validators/processg-validator");

exports.fetchProcessG = async (req, res, next) => {
  try {
    const processg = await prisma.tM_ProcessG.findMany();

    // ส่งข้อมูลทั้งหมดกลับไปยังผู้ใช้
    return res.status(200).json({
      status: "success",
      data: {
        processg: processg,
      },
    });
  } catch (err) {
    console.error("Error searching processG:", err);
    return next(createError(500, "Internal Server Error"));
  }
};

exports.fetchTtProcessG = async (req, res, next) => {
  try {
    const ttprocessg = await prisma.tT_ProcessG.findMany();

    // ส่งข้อมูลทั้งหมดกลับไปยังผู้ใช้
    return res.status(200).json({
      status: "success",
      data: {
        processg: ttprocessg,
      },
    });
  } catch (err) {
    console.error("Error searching ttprocessG:", err);
    return next(createError(500, "Internal Server Error"));
  }
};

exports.updateProcessg = async (req, res, next) => {
  try {
    // ตรวจสอบข้อมูล
    const { error, value } = tm_processgSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // ข้อมูลที่ตรวจสอบแล้ว
    const processgData = value;

    console.log("Processg Data to be updated:", processgData);

    // อัปเดตข้อมูลในฐานข้อมูล
    const updateProcessg = await prisma.tM_ProcessG.update({
      where: { ProcessG_CD: processgData.ProcessG_CD }, // ระบุเงื่อนไขการค้นหา
      data: {
        ...processgData, // ข้อมูลที่ต้องการอัปเดต
      },
    });

    // ส่งคำตอบกลับ
    return res.status(200).json({
      message: "ProcessG updated successfully",
      processg: updateProcessg,
    });
  } catch (err) {
    console.error("Error updating ProcessG:", err);
    return next(createError(500, "Internal Server Error"));
  }
};

exports.Show_action = async (req, res, next) => {
  const {
    TG_ProcessG,
    TG_Process,
    Result_Search,
    Print_Object,
    Tg_St_Pl_Date,
    Tg_Ed_Pl_Date,
    Tg_St_Rs_Date,
    Tg_Ed_Rs_Date,
    S_Customer_CD1,
    S_Customer_CD2,
    S_Customer_CD3,
    S_No_Customer_CD,
    S_Customer_Name1,
    S_Customer_Name2,
    S_Customer_Name3,
    S_Item1_CD,
    S_St_Od_Progress_CD,
    S_Ed_Od_Progress_CD,
    S_St_Pl_Progress_CD,
    S_Ed_Pl_Progress_CD,
    S_Parts_Pending,
    S_St_Parts_No,
    S_Ed_Parts_No,
    S_Od_Pending,
  } = req.body;

  var startDate = new Date(0);
  // startDate.setUTCHours(0, 0, 0, 0);

  var endDate = new Date();
  // endDate.setUTCHours(23, 59, 59, 999);

  const check_S_Customer_CD1 = S_Customer_CD1 || null;
  const check_S_Customer_CD2 = S_Customer_CD2 || null;
  const check_S_Customer_CD3 = S_Customer_CD3 || null;

  const filter_Customer_CD = {
    OR: [
      check_S_Customer_CD1 && { Customer_CD: check_S_Customer_CD1 },
      check_S_Customer_CD2 && { Customer_CD: check_S_Customer_CD2 },
      check_S_Customer_CD3 && { Customer_CD: check_S_Customer_CD3 },
    ].filter(Boolean), // Remove undefined/null values
  };

  const check_S_No_Customer_CD = S_No_Customer_CD || null;

  const check_S_Customer_Name1 = S_Customer_Name1 || null;
  const check_S_Customer_Name2 = S_Customer_Name2 || null;
  const check_S_Customer_Name3 = S_Customer_Name3 || null;

  const filter_S_Customer_Name = {
    OR: [
      check_S_Customer_Name1 && {
        Customer_Abb: { contains: check_S_Customer_Name1 },
      },
      check_S_Customer_Name2 && {
        Customer_Abb: { contains: check_S_Customer_Name2 },
      },
      check_S_Customer_Name3 && {
        Customer_Abb: { contains: check_S_Customer_Name3 },
      },
    ].filter(Boolean), // Remove undefined or null conditions
  };

  const check_S_Od_Pending = S_Od_Pending || "*";

  const check_S_Parts_Pending = S_Parts_Pending || "*";
  try {
    const selectProcessGPlan = await prisma.tD_Order.findMany({
      where: {
        Od_Progress_CD: { lt: "7" },
        ...(filter_Customer_CD.OR.length > 0 ? filter_Customer_CD : {}),
        ...(check_S_No_Customer_CD
          ? { Customer_CD: { not: check_S_No_Customer_CD } } // Apply "not equals" filter if S_No_Customer_CD is provided
          : {}), // No filter if S_No_Customer_CD is null
        ...(filter_S_Customer_Name.OR.length > 0 ? filter_S_Customer_Name : {}),
        Item1_CD: S_Item1_CD || null,
        ...(check_S_Od_Pending !== "*"
          ? {
              Od_Pending: check_S_Od_Pending === "Yes" ? -1 : 0, // Match "-1" for "Yes" and other values for "No"
            }
          : {}), // No filter if S_Od_Pending is "*"
        OR: [
          { Od_Progress_CD: S_St_Od_Progress_CD },
          {
            Od_Progress_CD: {
              gte: S_St_Od_Progress_CD || "0",
              lte: S_Ed_Od_Progress_CD || "9",
            },
          },
        ],
      },
      select: {
        Plan: {
          select: {
            schedule: {
              select: {
                PPD1: true,
                PPD2: true,
                PPD3: true,
                PPD4: true,
                PPD5: true,
                PPD6: true,
                PPD7: true,
                PPD8: true,
                PPD9: true,
                PPD10: true,
                PPD11: true,
                PPD12: true,
                PPD13: true,
                PPD14: true,
                PPD15: true,
                PPD16: true,
                PPD17: true,
                PPD18: true,
                PPD19: true,
                PPD20: true,
                PPD21: true,
                PPD22: true,
                PPD23: true,
                PPD24: true,
                PPD25: true,
                PPD26: true,
                PPD27: true,
                PPD28: true,
                PPD29: true,
                PPD30: true,
                PPD31: true,
                PPD32: true,
                PPD33: true,
                PPD34: true,
                PPD35: true,
                PPD36: true,
              },
            },
            Result: {
              select: {
                RPD1: true,
                RPD2: true,
                RPD3: true,
                RPD4: true,
                RPD5: true,
                RPD6: true,
                RPD7: true,
                RPD8: true,
                RPD9: true,
                RPD10: true,
                RPD11: true,
                RPD12: true,
                RPD13: true,
                RPD14: true,
                RPD15: true,
                RPD16: true,
                RPD17: true,
                RPD18: true,
                RPD19: true,
                RPD20: true,
                RPD21: true,
                RPD22: true,
                RPD23: true,
                RPD24: true,
                RPD25: true,
                RPD26: true,
                RPD27: true,
                RPD28: true,
                RPD29: true,
                RPD30: true,
                RPD31: true,
                RPD32: true,
                RPD33: true,
                RPD34: true,
                RPD35: true,
                RPD36: true,
              },
            },
            wips: {
              select: {
                Process_No: true,
                PPG: true,
                PPC: true,
                PPD: true,
                PML: true,
                PPL: true,
                RPD: true,
                Now_No: true,
                processGroup: {
                  where: {
                    List:
                      Print_Object === "Yes"
                        ? -1
                        : Print_Object === "No"
                        ? 0
                        : undefined,
                  },
                },
              },
              where: {
                PPG: { contains: TG_ProcessG || "" },
                PPC: { contains: TG_Process || "" },
                RPD: Result_Search === 0 ? null : { not: null },
                RPD: { lte: Tg_Ed_Rs_Date ?? endDate },
                RPD: { gte: Tg_St_Rs_Date ?? startDate },
                PPD: { lte: Tg_Ed_Pl_Date ?? endDate },
                PPD: { gte: Tg_St_Pl_Date ?? startDate },
              },
            },
          },
          where: {
            Pl_Progress_CD: { lt: "7" },
            ...(check_S_Parts_Pending !== "*"
              ? { Pt_Pending: check_S_Parts_Pending === "Yes" ? -1 : 0 }
              : {}),
            OR: [
              {
                Parts_No: S_St_Parts_No,
              },
              {
                Parts_No: {
                  gte: S_St_Parts_No || "0",
                  lte: S_Ed_Parts_No || "99",
                },
              },
            ],
            OR: [
              { Pl_Progress_CD: S_St_Pl_Progress_CD },
              {
                Pl_Progress_CD: {
                  gte: S_St_Pl_Progress_CD || "0",
                  lte: S_Ed_Pl_Progress_CD || "9",
                },
              },
            ],
          },
        },
        TM_Customer: {
          select: { Customer_Abb: true },
        },
        TM_WorkG: {
          select: { WorkG_Mark: true },
        },
      },
    });
    return res.status(200).json({ result: selectProcessGPlan });
  } catch (error) {
    console.error("Error updating ProcessG:", error);
    return next(createError(500, "Internal Server Error"));
  }
};
