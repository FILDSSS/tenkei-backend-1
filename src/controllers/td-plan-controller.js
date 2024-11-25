const createError = require("../utils/create-error");
const prisma = require("../models/prisma");
const { td_planSchema } = require("../validators/plan-validator");

exports.Search_Order_No_AfterUpdate = async (req, res, next) => {
  try {
    // ล็อกข้อมูลที่รับเข้ามา
    console.log("Request Body:", req.body);

    let { Order_No: orderNo } = req.body; // ใช้ destructuring เพื่อดึง Order_No

    // ตรวจสอบว่า orderNo เป็นสตริงและมีความยาวที่เหมาะสม
    if (typeof orderNo !== "string" || orderNo.length < 10) {
      return next(
        createError(
          400,
          "Order number is required and must be at least 10 characters long"
        )
      );
    }

    // กำหนดตัวแปร SON (ใช้ในกรณีที่ OrderNo มีความยาว 12)
    let SON = 0;

    // ตรวจสอบความยาวของหมายเลขคำสั่งซื้อ
    if (orderNo.length === 12) {
      SON = orderNo;
      orderNo = orderNo.substring(0, 10); // ตัดหมายเลขคำสั่งซื้อเหลือ 10 ตัวอักษร
    }

    // ค้นหาในฐานข้อมูลโดยใช้ Prisma (จอยตาราง TD_Plan)
    const partsNo = await prisma.tD_Plan.findMany({
      where: { Order_No: orderNo },
    });

    // ส่งข้อมูลหมายเลขคำสั่งซื้อกลับไปยังผู้ใช้
    return res.status(200).json({
      status: "success",
      data: {
        partsNo: partsNo,
      },
    });
  } catch (err) {
    console.error("Error searching partsNo:", err);
    return next(createError(500, "Internal Server Error"));
  }
};

exports.Search_Parts_No_AfterUpdate = async (req, res, next) => {
  // ล็อกข้อมูลที่รับเข้ามา
  console.log("Request Body:", req.body);

  try {
    // ตรวจสอบข้อมูลที่รับเข้ามา
    const { error } = td_planSchema.validate(req.body);
    if (error) {
      console.error("Validation Error:", error.details[0].message);
      return next(createError(400, error.details[0].message));
    }

    // ดึงหมายเลขคำสั่งซื้อและหมายเลขชิ้นส่วนจากคำขอ
    let { Order_No: orderNo, Parts_No: partsNO } = req.body;

    // สร้าง OdPt_No จาก Order_No และ Parts_No
    const OdPt_No = orderNo + partsNO;

    // ค้นหาในฐานข้อมูลโดยใช้ Prisma (จอยตาราง TD_Plan)
    const planpartsNO = await prisma.tD_Plan.findFirst({
      where: { OdPt_No: OdPt_No },
    });

    // ตรวจสอบว่ามีข้อมูลหรือไม่
    if (!planpartsNO) {
      return next(
        createError(
          404,
          "Plan part not found for the given Order_No and Parts_No"
        )
      );
    }

    // กำหนดตัวแปร N และเริ่มทำงานในลูป
    let N = 0;
    while (N < 36) {
      N += 1;

      // ตรวจสอบค่า PPC
      if (planpartsNO[`PPC${N}`] !== null) {
        // ใช้ Prisma DLookup แทน DLookup ใน VBA
        planpartsNO[`INN${N}`] = await prisma.tD_Schedule
          .findUnique({
            where: { OdPt_No: planpartsNO.OdPt_No },
            select: { [`INN${N}`]: true },
          })
          .then((result) => (result ? result[`INN${N}`] : null));

        const ptpData = await prisma.tD_Plan.findUnique({
          where: { OdPt_No: planpartsNO.OdPt_No },
          select: {
            [`PTP${N}`]: true,
          },
        });

        if (ptpData) {
          planpartsNO[`T_Type${N}`] = ptpData[`PTP${N}`]?.charAt(0) || null;
          planpartsNO[`P_Type${N}`] = ptpData[`PTP${N}`]?.charAt(1) || null;
          planpartsNO[`S_Type${N}`] = ptpData[`PTP${N}`]?.charAt(2) || null;
        }

        planpartsNO[`PPD${N}`] = await prisma.tD_Schedule
          .findUnique({
            where: { OdPt_No: planpartsNO.OdPt_No },
            select: { [`PPD${N}`]: true },
          })
          .then((result) => (result ? result[`PPD${N}`] : null));

        planpartsNO[`RPD${N}`] = await prisma.tD_Result
          .findUnique({
            where: { OdPt_No: planpartsNO.OdPt_No },
            select: { [`RPD${N}`]: true },
          })
          .then((result) => (result ? result[`RPD${N}`] : null));

        planpartsNO[`RMT${N}`] = await prisma.tD_Result
          .findUnique({
            where: { OdPt_No: planpartsNO.OdPt_No },
            select: { [`RMT${N}`]: true },
          })
          .then((result) => (result ? result[`RMT${N}`] : null));

        planpartsNO[`RPT${N}`] = await prisma.tD_Result
          .findUnique({
            where: { OdPt_No: planpartsNO.OdPt_No },
            select: { [`RPT${N}`]: true },
          })
          .then((result) => (result ? result[`RPT${N}`] : null));

        planpartsNO[`RPN${N}`] = await prisma.tD_Result
          .findUnique({
            where: { OdPt_No: planpartsNO.OdPt_No },
            select: { [`RPN${N}`]: true },
          })
          .then((result) => (result ? result[`RPN${N}`] : null));
      }
    }

    // ดึงค่าจาก TD_Plan
    planpartsNO.End_No = await prisma.tD_Plan
      .findUnique({
        where: { OdPt_No: planpartsNO.OdPt_No },
        select: { End_No: true },
      })
      .then((result) => (result ? result.End_No : null));

    planpartsNO.Now_No = await prisma.tD_Plan
      .findUnique({
        where: { OdPt_No: planpartsNO.OdPt_No },
        select: { Now_No: true },
      })
      .then((result) => (result ? result.Now_No : null));

    planpartsNO.Re_Pr_Qty = await prisma.tD_Plan
      .findUnique({
        where: { OdPt_No: planpartsNO.OdPt_No },
        select: { Re_Pr_Qty: true },
      })
      .then((result) => (result ? result.Re_Pr_Qty : null));

    planpartsNO.Total_M_Time = await prisma.tD_Plan
      .findUnique({
        where: { OdPt_No: planpartsNO.OdPt_No },
        select: { Total_M_Time: true },
      })
      .then((result) => (result ? result.Total_M_Time : null));

    planpartsNO.Total_P_Time = await prisma.tD_Plan
      .findUnique({
        where: { OdPt_No: planpartsNO.OdPt_No },
        select: { Total_P_Time: true },
      })
      .then((result) => (result ? result.Total_P_Time : null));

    planpartsNO.Re_Total_M_Time = await prisma.tD_Plan
      .findUnique({
        where: { OdPt_No: planpartsNO.OdPt_No },
        select: { Re_Total_M_Time: true },
      })
      .then((result) => (result ? result.Re_Total_M_Time : null));

    planpartsNO.Re_Total_P_Time = await prisma.tD_Plan
      .findUnique({
        where: { OdPt_No: planpartsNO.OdPt_No },
        select: { Re_Total_P_Time: true },
      })
      .then((result) => (result ? result.Re_Total_P_Time : null));

    planpartsNO.Re_Total_N_Time = await prisma.tD_Plan
      .findUnique({
        where: { OdPt_No: planpartsNO.OdPt_No },
        select: { Re_Total_N_Time: true },
      })
      .then((result) => (result ? result.Re_Total_N_Time : null));

    // ส่งข้อมูลกลับ
    return res.status(200).json({
      status: "success",
      data: planpartsNO,
    });
  } catch (err) {
    console.error("Error searching parts number:", err);
    return next(createError(500, "Internal Server Error"));
  }
};

exports.editplan = async (req, res, next) => {
  try {
    // ตรวจสอบข้อมูลที่ส่งเข้ามา
    const { error, value } = td_planSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // ข้อมูลที่ตรวจสอบแล้วสามารถใช้งานได้
    const planData = value;
    const OdPt_No = planData.Order_No + planData.Parts_No;

    // ล็อกข้อมูลที่ต้องการแก้ไข
    console.log("Plan Data to be edited:", planData);

    // ดึงค่า Pl_Quote_Delivery จาก TS_Set
    const quoteDelivery = await prisma.tS_Set.findUnique({
      where: { ID: 1 },
      select: { Pl_Quote_Delivery: true },
    });

    // กำหนดค่า Pt_Delivery ตามค่าที่ได้
    switch (quoteDelivery?.PI_Quote_Delivery || "Product_Delivery") {
      case "Request":
        planData.Pt_Delivery = await prisma.tD_Order
          .findUnique({
            where: { Order_No: planData.Order_No },
            select: { Request_Delivery: true },
          })
          .then((res) => res.Request_Delivery);
        break;
      case "NAV":
        planData.Pt_Delivery = await prisma.tD_Order
          .findUnique({
            where: { Order_No: planData.Order_No },
            select: { NAV_Delivery: true },
          })
          .then((res) => res.NAV_Delivery);
        break;
      case "Confirm":
        planData.Pt_Delivery = await prisma.tD_Order
          .findUnique({
            where: { Order_No: planData.Order_No },
            select: { Confirm_Delivery: true },
          })
          .then((res) => res.Confirm_Delivery);
        break;
      case "Product":
        planData.Pt_Delivery = await prisma.tD_Order
          .findUnique({
            where: { Order_No: planData.Order_No },
            select: { Product_Delivery: true },
          })
          .then((res) => res.Product_Delivery);
        break;
    }

    // กำหนดค่า Parts_CD
    planData.Parts_CD = 110;

    // รับค่า MATE_No จาก req.body
    const MATE_No = req.body.MATE_No; // คาดว่าผู้ใช้จะส่งข้อมูล MATE_No ใน request body

    if (!MATE_No) {
      return res.status(400).json({ message: "MATE_No is required." });
    }

    switch (MATE_No) {
      case 1:
        planData.Pt_Material = await prisma.tD_Order
          .findUnique({
            where: { Order_No: planData.Order_No },
            select: { Material1: true },
          })
          .then((res) => res.Material1);
        break;
      case 2:
        planData.Pt_Material = await prisma.tD_Order
          .findUnique({
            where: { Order_No: planData.Order_No },
            select: { Material2: true },
          })
          .then((res) => res.Material2);
        break;
      case 3:
        planData.Pt_Material = await prisma.tD_Order
          .findUnique({
            where: { Order_No: planData.Order_No },
            select: { Material3: true },
          })
          .then((res) => res.Material3);
        break;
      case 4:
        planData.Pt_Material = await prisma.tD_Order
          .findUnique({
            where: { Order_No: planData.Order_No },
            select: { Material4: true },
          })
          .then((res) => res.Material4);
        break;
      case 5:
        planData.Pt_Material = await prisma.tD_Order
          .findUnique({
            where: { Order_No: planData.Order_No },
            select: { Material5: true },
          })
          .then((res) => res.Material5);
        break;
      default:
        return res.status(400).json({ message: "Invalid MATE_No." });
    }

    // ดึงข้อมูล Quantity และ Unit_CD
    planData.Pt_Qty = await prisma.tD_Order
      .findUnique({
        where: { Order_No: planData.Order_No },
        select: { Quantity: true },
      })
      .then((res) => res.Quantity);

    planData.Pt_Unit_CD = await prisma.tD_Order
      .findUnique({
        where: { Order_No: planData.Order_No },
        select: { Unit_CD: true },
      })
      .then((res) => res.Unit_CD);

    // ตรวจสอบและปรับค่า Pt_Delivery
    if (req.body.Auto_Year_Change === -1) {
      const deliveryDate = new Date(planData.Pt_Delivery); // แปลงเป็นวันที่
      const currentDate = new Date();

      // ตรวจสอบเงื่อนไข
      if ((currentDate - deliveryDate) / (1000 * 3600 * 24) > 183) {
        planData.Pt_Delivery = new Date(
          deliveryDate.setFullYear(deliveryDate.getFullYear() + 1)
        );
      }
    }

    // ตรวจสอบข้อมูลก่อนการอัปเดต
    if (!planData.Order_No) {
      return res.status(400).json({ message: "Order_No is required." });
    }
    if (!planData.Parts_No) {
      return res.status(400).json({ message: "Parts_No is required." });
    }
    const productDelivery = await prisma.tD_Order
      .findUnique({
        where: { Order_No: planData.Order_No },
        select: { Product_Delivery: true },
      })
      .then((res) => res.Product_Delivery);
    if (!planData.Pt_Delivery) {
      return res.status(400).json({ message: "Pt_Delivery is required." });
    }
    if (!planData.Parts_CD) {
      return res.status(400).json({ message: "Parts_CD is required." });
    }
    const quantity = await prisma.tD_Order
      .findUnique({
        where: { Order_No: planData.Order_No },
        select: { Quantity: true },
      })
      .then((res) => res.Quantity);
    if (!planData.Pt_Qty) {
      return res.status(400).json({ message: "Pt_Qty is required." });
    }
    if (planData.Pt_Spare_Qty === undefined) {
      return res.status(400).json({ message: "Pt_Spare_Qty is required." });
    }
    if (planData.Pt_NG_Qty === undefined) {
      return res.status(400).json({ message: "Pt_NG_Qty is required." });
    }
    if (planData.Pl_Ed_Rev_Day === undefined) {
      return res.status(400).json({ message: "Pl_Ed_Rev_Day is required." });
    }

    // อัปเดตข้อมูลในฐานข้อมูล
    const updatedplan = await prisma.tD_Plan.update({
      where: { OdPt_No: OdPt_No }, // ระบุเงื่อนไขในการค้นหา
      data: planData, // ข้อมูลที่ต้องการแก้ไข
    });

    // ส่งข้อมูลที่อัปเดตกลับไป
    return res.status(200).json(updatedplan);
  } catch (err) {
    // ล็อกข้อผิดพลาดเพื่อการตรวจสอบ
    console.error("Error editing order:", err);
    return next(createError(500, "Internal Server Error"));
  }
};

exports.graph = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);

    const {
      TG_ProcessG,
      Tg_St_Pl_Date,
      Tg_Ed_Pl_Date,
      searchPPG,
      searchPPC,
      startRsDate,
      endRsDate,
      Result_Search,
    } = req.body;

    // ตรวจสอบ TG_ProcessG ว่ามีค่าเป็น null หรือไม่
    if (!TG_ProcessG) {
      const confirmViewAllGroups = confirm(
        "Process Group is none! \nAll group view?"
      );
      if (!confirmViewAllGroups) {
        console.log("Focus on TG_ProcessG");
        return res.status(400).json({ message: "กรุณาระบุ Process Group." });
      }
    }

    const startDate = Tg_St_Pl_Date || 0;
    const endDate = Tg_Ed_Pl_Date || 2958465;

    const orderWithPlans = await prisma.tD_Order.findUnique({
      where: { Order_No: orderNo },
      include: {
        Plan: {
          where: { Order_No: orderNo },
        },
        WIP: {
          include: {
            Schedule: true,
            Result: true,
          },
          where: {
            PPG: {
              contains: searchPPG || "",
            },
            PPC: {
              contains: searchPPC || "",
            },
            Process_No: {
              lt: 7,
            },
          },
        },
        Customer: true,
        WorkG: true,
        Schedule: {
          where: {
            PPD: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
        Result: {
          where: {
            RPD: {
              gte: startRsDate || 0,
              lte: endRsDate || 2958465,
            },
            AND: [
              {
                RPD: {
                  not: null,
                },
              },
              {
                RPD: {
                  equals: Result_Search === 0 ? null : { not: null },
                },
              },
            ],
          },
        },
      },
    });

    return res.json(orderWithPlans);
  } catch (err) {
    console.error("Error searching order:", err);
    return next(createError(500, "Internal Server Error"));
  }
};

exports.deletePlans = async (req, res, next) => {
  try {
    // ล็อกข้อมูลที่รับเข้ามา
    console.log("Request Body:", req.body);

    // ดึงหมายเลขคำสั่งซื้อจากคำขอ
    const { Order_No: orderNo, Parts_No: partsNo } = req.body;

    // ตรวจสอบว่า orderNo และ partsNo เป็นสตริงและมีความยาวที่เหมาะสม
    if (typeof orderNo !== "string" || orderNo.length < 10) {
      return next(
        createError(
          400,
          "Order number is required and must be at least 10 characters long"
        )
      );
    }

    if (typeof partsNo !== "string") {
      return next(createError(400, "Parts number is required"));
    }

    // ค้นหาในฐานข้อมูลเพื่อดูว่ามี order นี้อยู่หรือไม่
    const existingOrder = await prisma.tD_Order.findUnique({
      where: { Order_No: orderNo },
    });

    // หากไม่พบหมายเลขคำสั่งซื้อ ส่งข้อผิดพลาด
    if (!existingOrder) {
      return next(createError(404, "Order not found"));
    }

    // ลบข้อมูลใน TD_Plan ที่เกี่ยวข้องกับ Order_No
    await prisma.tD_Plan.deleteMany({
      where: { Order_No: orderNo },
    });

    // ส่งข้อมูลการลบกลับไปยังผู้ใช้
    return res.status(200).json({
      status: "success",
      message: "Order and related plans deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting order:", err);
    return next(createError(500, "Internal Server Error"));
  }
};

exports.createPlan = async (req, res, next) => {
  try {
    const { Order_No, Parts_No, ...otherFields } = req.body;

    const OdPt_No = Order_No + Parts_No;
    let Pl_Progress_CD = 0;
    let FG = 0; // ใช้สำหรับตรวจสอบ Money_Object
    let KN = 0; // ตัวแปรสำหรับการนับ
    let End_No = 0; // ตัวแปร End_No
    let Now_No = 0; // ตัวแปร Now_No
    
    // ตรวจสอบค่า PPD1 ถึง PPD36
    for (let PD = 1; PD <= 36; PD++) {
      if (req.body[`PPD${PD}`] != null) {
        Pl_Progress_CD = 1;
        break;
      }
    }

    // ตรวจสอบค่า RPD1 ถึง RPD36 หากยังไม่ได้อัปเดต
    if (Pl_Progress_CD < 2) {
      for (let PD = 1; PD <= 36; PD++) {
        if (req.body[`RPD${PD}`] != null) {
          Pl_Progress_CD = 2;
          break;
        }
      }
    }

    // ตรวจสอบ Od_Progress_CD
    const Od_Progress_CD = await prisma.tD_Order.findUnique({
      where: { Order_No },
      select: { Od_Progress_CD: true },
    });

    if (Od_Progress_CD && Od_Progress_CD.Od_Progress_CD > 3) {
      Od_Progress_CD.Od_Progress_CD = 3;
    } else if (!Od_Progress_CD || Od_Progress_CD.Od_Progress_CD < 1) {
      Od_Progress_CD.Od_Progress_CD = 1;
    }

    // ตรวจสอบค่า PPC1 ถึง PPC36 และอัปเดต PMT, PPT
    let Max_No = "0";
    for (let N = 1; N <= 36; N++) {
      const PPC = req.body[`PPC${N}`];

      if (PPC) {
        Max_No = N;

        // อัปเดต PMT
        if (!req.body[`PMT${N}`]) {
          req.body[`PMT${N}`] =
            (await prisma.tM_Process.findUnique({
              where: { Process_CD: PPC },
              select: { Std_M_Time: true },
            }).Std_M_Time) || null;
        }

        // อัปเดต PPT
        if (!req.body[`PPT${N}`]) {
          req.body[`PPT${N}`] =
            (await prisma.tM_Process.findUnique({
              where: { Process_CD: PPC },
              select: { Std_P_Time: true },
            }).Std_P_Time) || null;
        }

        // ตรวจสอบ End
        const isEnd = await prisma.tM_Process.findUnique({
          where: { Process_CD: PPC },
          select: { End: true },
        }).End;

        if (isEnd === -1) FG++;
      } else {
        // ล้างค่า PMT, PPT, T_Type, P_Type, S_Type
        req.body[`PMT${N}`] = null;
        req.body[`PPT${N}`] = null;
        req.body[`T_Type${N}`] = null;
        req.body[`P_Type${N}`] = null;
        req.body[`S_Type${N}`] = null;
      }
    }

    // จัดการ Money_Object
    if (FG === 0 && req.body.Money_Object === -1) {
      req.body.Money_Object = 0; // เปลี่ยนค่าเป็น Off
    } else if (FG > 0 && req.body.Money_Object === 0) {
      req.body.Money_Object = -1; // เปลี่ยนค่าเป็น On
    }

    // Logic to determine End_No (based on PPC1 to PPC36)
    FG = 0;
    KN = 0;
    while (FG < 1) {
      KN++;
      if (KN !== 36) {
        if (req.body[`PPC${KN}`] === null) {
          FG = 1;
        } else {
          End_No = KN;
        }
      } else {
        End_No = KN;
        FG = 1;
      }
    }

    // Logic to determine Now_No (based on RPD1 to RPD36)
    FG = 0;
    KN = 0;
    while (FG < 1) {
      KN++;
      if (KN !== 37) {
        if (req.body[`RPD${KN}`] === null) {
          Now_No = KN;
          FG = 1;
        }
      } else {
        Now_No = KN;
        FG = 1;
      }
    }

    // กำหนดค่า End_No และ Now_No ในข้อมูลที่เตรียมจะบันทึก
    req.body.End_No = End_No;
    req.body.Now_No = Now_No;

    if (!otherFields.Pl_Reg_Date) {
      Od_Progress_CD.Pl_Reg_Date = new Date();
    }
    Od_Progress_CD.Pl_Upd_Date = new Date();

    // เตรียมข้อมูลสำหรับการบันทึก
    const planData = {
      ...otherFields,
      Order_No,
      Parts_No,
      OdPt_No,
      Pl_Progress_CD,
      Max_No,
    };

    // ตรวจสอบ schema
    const { error, value } = td_planSchema.validate(planData);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // สร้างแผนใหม่ในฐานข้อมูล
    const newPlan = await prisma.tD_Plan.create({ data: value });

    return res
      .status(201)
      .json({ message: "Plan created successfully", plan: newPlan });
  } catch (err) {
    console.error("Error creating Plan:", err);
    return next(createError(500, "Internal Server Error"));
  }
};
