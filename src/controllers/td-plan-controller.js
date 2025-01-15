const createError = require("../utils/create-error");
const prisma = require("../models/prisma");
const { td_planSchema } = require("../validators/plan-validator");
const { connect } = require("../routes/plan-route");

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

const updatePlan = async (req, res) => {
  try {
    const {
      End_No,
      Now_No,
      Total_M_Time,
      Total_P_Time,
      Re_Pr_Qty,
      Re_Total_M_Time,
      Re_Total_P_Time,
      Re_Total_N_Time,
      OdPt_No,
    } = req.body;

    let updateData = {
      End_No,
      Now_No,
      Total_M_Time,
      Total_P_Time,
      Re_Pr_Qty,
      Re_Total_M_Time,
      Re_Total_P_Time,
      Re_Total_N_Time,
    };

    for (let i = 1; i <= 36; i++) {
      const T_Type = req.body[`T_Type${i}`];
      const P_Type = req.body[`P_Type${i}`];
      const S_Type = req.body[`S_Type${i}`];

      updateData[`PTP${i}`] = `${T_Type}${P_Type}${S_Type}`;
    }

    const updatedPlan = await prisma.tD_Plan.update({
      where: {
        OdPt_No,
      },
      data: updateData,
    });

    res.status(200).json(updatedPlan);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating plan");
  }
};

const QD_Pl_WIP_Add = async (req, prisma) => {
  const { Order_No, Parts_No, ...fields } = req.body;

  for (let N = 1; N <= 36; N++) {
    const OdPtPr_No = `${Order_No}${Parts_No}${N}`;
    const RMT = parseInt(fields[`RMT${N}`], 10) || null;

    const existingRecord = await prisma.td_wip.findUnique({
      where: {
        OdPtPr_No,
      },
    });

    const wipData = {
      Order_No,
      Parts_No,
      Process_No: N.toString(),
      OdPt_No: `${Order_No}${Parts_No}`,
      OdPtPr_No,
      PPG: fields.PPG,
      PPC: fields.PPC,
      PMT: fields.PMT,
      PPT: fields.PPT,
      T_Type: fields.T_Type,
      P_Type: fields.P_Type,
      S_Type: fields.S_Type,
      PPD: fields.PPD,
      PML: fields.PML,
      PPL: fields.PPL,
      INN: fields.INN,
      RPD: fields.RPD,
      RMT,
      RPT: fields.RPT,
      RPN: fields.RPN,
      ASP: fields.ASP,
      Now_No: fields.Now_No.toString(),
    };

    if (!existingRecord) {
      await prisma.td_wip.create({
        data: wipData,
      });
      console.log(`Record added for OdPtPr_No: ${OdPtPr_No}`);
    } else {
      await prisma.td_wip.update({
        where: {
          OdPtPr_No,
        },
        data: wipData,
      });
      console.log(`Record updated for OdPtPr_No: ${OdPtPr_No}`);
    }
  }
};

const QD_Pl_WIP_Del = async (req, prisma) => {
  const { Order_No, Parts_No } = req.body;

  for (let N = 1; N <= 36; N++) {
    const OdPtPr_No = `${Order_No}${Parts_No}${N}`;
    const existingRecord = await prisma.td_wip.findUnique({
      where: {
        OdPtPr_No,
      },
    });

    if (existingRecord) {
      await prisma.td_wip.delete({
        where: {
          OdPtPr_No,
        },
      });
      console.log(`Record deleted for OdPtPr_No: ${OdPtPr_No}`);
    } else {
      console.log(`No record found for OdPtPr_No: ${OdPtPr_No}`);
    }
  }
};

exports.TsSet = async (req, res, next) => {
  try {
    const tsSet = await prisma.tS_Set.findUnique({
      where: {
        ID: 1,
      },
    });

    return res.status(200).json({
      status: "success",
      data: {
        tsSet: tsSet,
      },
    });
  } catch (err) {
    console.error("Error searching tsSet:", err);
    return next(createError(500, "Internal Server Error"));
  }
};




exports.Schedule_Calc = async (req, res, next) => {
  try {
    const { Order_No, Parts_No } = req.body;
    const OdPt_No = Order_No + Parts_No;

    let No,
      St_Time,
      St_Scale,
      P_Scale,
      M_Scale,
      O_Scale,
      MH_Scale,
      St_Rev,
      Sc_Scale,
      Fix_N;
    let N,
      Now_No,
      Final_No,
      Now_Date,
      Final_Date,
      Holidays,
      ReDays,
      MinDays,
      Temp_Date,
      FG,
      M_Holiday;
    let PSL = new Array(36);
    let Fix_Pr_N = new Array(36).fill(0);
    let Fix_Re_MH = new Array(36).fill(0);
    let Fix_Date_No = new Array(36);
    let Fix_Date = new Array(36);

    const PPDValues = Array.from({ length: 36 }, (_, i) => {
      const PPDKey = `PPD${i + 1}`;
      return [PPDKey, req.body[PPDKey] || null];
    });

    const isFirstConfirm =
      req.body.Sc_Make_Type && req.body.Sc_Make_Type === "Execute";
    if (isFirstConfirm) {
      const isBackupConfirm =
        req.body.BackupSchedule && req.body.BackupSchedule === "Yes";
      if (isBackupConfirm) {
        while (No < 36) {
          No = No + 1;
        }
      }
    }

    while (No < 36) {
      No = No + 1;
      PSL[No] = 0;
      Fix_Pr_N[No] = 0;
      Fix_Re_MH[No] = 0;
      Fix_Date_No[No] = 0;
      Fix_Date[No] = 0;
    }

    const tsSet = await prisma.tS_Set.findUnique({
      where: {
        ID: 1,
      },
    });

    St_Time = tsSet.Sc_Stagnat_Time;
    St_Scale = tsSet.Sc_Stagnat_Scale;
    P_Scale = tsSet.Sc_Person_Scale;
    M_Scale = tsSet.Sc_Machine_Scale;
    O_Scale = tsSet.Sc_Outside_Scale;
    MH_Scale = tsSet.Sc_ManHour_Scale;

    St_Rev = 0;
    Sc_Scale = 1;

    async function checkHoliday(date) {
      return await prisma.tM_Holiday.count({
        where: { Holiday: new Date(date) },
      });
    }

    if (req.body.Sc_Make_Type === "Equality") {
      Fix_N = 0;
      No = 0;
      N = 1;

      while (No < parseInt(req.body.End_No, 10)) {
        No += 1;
        if (req.body[`RPD${No}`] !== null) {
          if (req.body[`PPD${No}`] === null) {
            req.body[`PPD${No}`] = req.body[`RPD${No}`];
          }
          PSL[No] = 0;
        } else {
          switch (req.body[`P_Type${No}`]) {
            case "M":
              PSL[No] =
                St_Time * St_Scale + req.body[`PPL${No}`] * P_Scale * MH_Scale;
              break;
            case "A":
              PSL[No] =
                St_Time * St_Scale +
                req.body[`PPL${No}`] * P_Scale * MH_Scale +
                req.body[`PML${No}`] * M_Scale * MH_Scale;
              break;
            case "O":
              PSL[No] = St_Time * St_Scale + req.body[`PPL${No}`] * O_Scale;
              break;
          }

          if (No > 1) {
            if (req.body[`P_Type${No - 1}`] === "O") {
              PSL[No] += 720;
            } else if (req.body[`S_Type${No - 1}`] === "F") {
              PSL[No] += 720;
            }
          }

          if (No === parseInt(req.body.End_No, 10)) {
            PSL[No] += 720;
          }

          Fix_Pr_N[N] = Fix_Pr_N[N] + 1;
          Fix_Re_MH[N] = Fix_Re_MH[N] + PSL[No];

          if (req.body[`S_Type${No}`] === "F") {
            if (req.body[`PPD${No}`] !== null) {
              const holidayCount = await checkHoliday(req.body[`PPD${No}`]);
              if (holidayCount !== 0) {
                return res.status(400).send({
                  message: `Cannot set [Fix_Date] to holiday for line ${No}. Please change the date!`,
                });
              }

              Fix_Date_No[N] = No;
              Fix_Date[N] = new Date(req.body[`PPD${No}`]);
              Fix_N += 1;
              N += 1;
            }
          }
          if (No === parseInt(req.body.End_No, 10)) {
            req.body[`PPD${No}`] =
              new Date(req.body.Pt_Delivery) -
              Number(req.body.Pl_Ed_Rev_Day) * 86400000;

            const holidayCount = await checkHoliday(req.body[`PPD${No}`]);
            if (holidayCount !== 0) {
              return res.status(400).send({
                message: `Cannot set [Pt_Delivery] - [Pl_Ed_Rev_Day] to holiday. Please adjust dates.`,
              });
            }

            Fix_Date_No[N] = No;
            Fix_Date[N] = req.body[`PPD${No}`];
            Fix_N += 1;
            N += 1;
          }
        }
      }

      Now_No = parseInt(req.body.Now_No, 10);
      Final_No = Now_No - 1;
      Now_Date = new Date(
        new Date().setDate(new Date().getDate() + req.body.Pl_St_Rev_Day)
      );
      Final_Date = Now_Date;

      N = 0;
      if (Now_No === 1) {
        if (
          req.body[`S_Type${1}`] === "F" &&
          req.body[`PPD${1}`] !== null &&
          new Date(req.body[`PPD${1}`]) > new Date(Date.now() - 1)
        ) {
          Final_No = Now_No;
          Now_No = 2;
          Now_Date = req.body[`PPD${1}`];
          Final_Date = Now_Date;
          N = 1;
        }
      }

        while (N < Fix_N) {
        N += 1;
        //STEP1

        const sqlQuery = `
        SELECT COUNT(*)
        FROM TM_Holiday
        WHERE Holiday >= ?
          AND Holiday <= ?
      `;

        const rawCount = await prisma.$queryRawUnsafe(
          sqlQuery,
          new Date(Fix_Date[N]),
          new Date(Now_Date)
        );
        const holidayCount = rawCount[0]["COUNT(*)"];
        Holidays = parseInt(holidayCount, 10);
        ReDays =
          Math.floor(
            (new Date(Fix_Date[N]).getTime() - new Date(Now_Date).getTime()) /
              (1000 * 60 * 60 * 24)
          ) - Holidays;

        MinDays = Fix_Re_MH[N] / 1440;
        No = Now_No - 1;
        Temp_Date = Now_Date;
        console.log("Holidays:", Holidays);
        console.log("ReDays:", ReDays);
        console.log("MinDays:", MinDays);
        console.log("No:", No);
        console.log("Temp_Date:", Temp_Date);

        while (No < Fix_Date_No[N]) {
          No += 1;
          if (req.body[`RPD${No}`] === null) {
            Temp_Date = new Date(
              Temp_Date + ((PSL[No] / 1440) * Sc_Scale + St_Rev) * 86400000
            );

            FG = 0;

            while (FG < 1) {
              const holidayCount = await prisma.tM_Holiday.count({
                where: {
                  Holiday: {
                    gte: new Date(Now_Date),
                    lte: new Date(Temp_Date),
                  },
                },
              });

              if (holidayCount > 0) {
                M_Holiday = holidayCount;
                while (M_Holiday > 0) {
                  Temp_Date = Temp_Date + 1;
                  const nextDayHolidayCount = await prisma.tM_Holiday.count({
                    where: {
                      Holiday: {
                        gte: new Date(Temp_Date),
                      },
                    },
                  });
                  if (nextDayHolidayCount === 0) {
                    M_Holiday -= 1;
                  }
                }
                FG = 1;
              } else {
                FG = 1;
              }
            }

            if (No < Fix_Date_No[N]) {
              req.body[`PPD${No}`] = new Date(Temp_Date);
              Now_No = No + 1;
              Now_Date = Temp_Date;
            } else {
              if (new Date(Temp_Date) > new Date(Fix_Date[N])) {
                const PPDValues2 = Array.from({ length: 36 }, (_, i) => {
                  const PPDKey = `PPD${i + 1}`;
                  // ตรวจสอบว่า req.body[PPDKey] เป็นวันที่ที่ถูกต้องหรือไม่
                  const value = req.body[PPDKey];
                  const dateValue = value ? new Date(value) : null; // ถ้ามีค่า, แปลงเป็น Date

                  // ถ้าเป็นวันที่ที่ถูกต้อง (ไม่ใช่ NaN), ใช้ค่าที่แปลงแล้ว
                  return [PPDKey, isNaN(dateValue) ? value : dateValue];
                });
                const scheduleData = {
                  ...Object.fromEntries(PPDValues2),
                };
                const message = `No${No} - ${
                  req.body[`PPC${No}`]
                } - ((${new Date(
                  req.body[`PPD${No}`]
                )}) ) is miss date!\nDo you want to change this date?`;
                const message2 =
                  `System can not calc,\n` +
                  `because [No ${No}-${req.body[`PPC${No}`]} (${
                    req.body[`PPD${No}`]
                  })] is not after [${Final_Date}]!\n` +
                  `Do you cancel Calc?`;

                res.json({
                  PPDValues: scheduleData,
                  message: message,
                  message2: message2,
                  confirm: true,
                  changeMessage: `Please change process plan date.`,
                  data: new Date(Temp_Date),
                  No: No,
                  confirm: true,
                });

                const selectedPPD = PPDValues.find(
                  ([key]) => key === `PPD${No}`
                );

                if (selectedPPD) {
                  req.body[`PPD${No}`] = selectedPPD[1];
                }

             
                const holidayCount = await prisma.tM_Holiday.count({
                  where: {
                    Holiday: new Date(req.body[`PPD${No}`]),
                  },
                });

                if (holidayCount !== 0) {
                  res.json({
                    message: `Can not setting [process plan date] = [Holiday] !`,
                    confirm: true,
                  });
                }

                if (new Date(req.body[`PPD${No}`]) < new Date(Final_Date)) {
                  N = 0;
                  while (N < 36) {
                    N += 1;
                    const schedule = await prisma.tD_Schedule.findUnique({
                      where: {
                        Order_No_Parts_No: {
                          Order_No: Order_No, // the actual Order_No value
                          Parts_No: Order_No, // the actual Parts_No value
                        },
                      },
                      select: {
                        [`PPD${N}`]: true,
                      },
                    });

                    if (schedule && schedule[`PPD${N}`]) {
                      req.body[`PPD${N}`] = schedule[`PPD${N}`];
                    }
                  }
                }

                Fix_Date[N] = new Date(req.body[`PPD${No}`]);

                //STEP3
                if (new Date(Fix_Date[N]) === Temp_Date) {
                  Sc_Scale = 1;
                  St_Rev = 0;
                } else {
                  if (new Date(Fix_Date[N]) < new Date(Temp_Date)) {
                    const Holidays = await prisma.tM_Holiday.count({
                      where: {
                        Holiday: {
                          gte: new Date(Final_Date),
                          lte: new Date(Fix_Date[N]),
                        },
                      },
                    });
                    ReDays =
                    Math.floor(
                      (new Date(Fix_Date[N]).getTime() - new Date(Now_Date).getTime()) /
                        (1000 * 60 * 60 * 24)
                    ) - Holidays;

                    St_Rev = ReDays / (Fix_Re_MH[N] / 1440);
                    St_Rev = 0;
                  } else {
                    Holidays = await prisma.tM_Holiday.count({
                      where: {
                        Holiday: {
                          gte: new Date(Final_Date),
                          lte: new Date(Fix_Date[N]),
                        },
                      },
                    });
                    ReDays =
                    Math.floor(
                      (new Date(Fix_Date[N]).getTime() - new Date(Now_Date).getTime()) /
                        (1000 * 60 * 60 * 24)
                    ) - Holidays;

                    Sc_Scale = 1;
                    St_Rev = (ReDays - MinDays) / Fix_Pr_N[N];
                  }
                }
                Now_No = Final_No + 1;
                Now_Date = Final_Date;
                Holidays = parseInt(holidayCount, 10);
                ReDays =
                Math.floor(
                  (new Date(Fix_Date[N]).getTime() - new Date(Now_Date).getTime()) /
                    (1000 * 60 * 60 * 24)
                ) - Holidays;

        
                MinDays = Fix_Re_MH[N] / 1440;
        No = Now_No - 1;
        Temp_Date = Now_Date;
                console.log("Holidays:", Holidays);
        console.log("ReDays:", ReDays);
        console.log("MinDays:", MinDays);
        console.log("No:", No);
        console.log("Temp_Date:", Temp_Date);
        console.log("Sc_Scale:", Sc_Scale);
        console.log("St_Rev:", St_Rev);
        
              } else {
                
                if (req.body[`PPD${No}`] != null) {
                  const fixDate = req.body[`PPD${No}`];
                  const holidayCount = await prisma.tM_Holiday.count({
                    where: {
                      Holiday: new Date(fixDate),
                    },
                  });
                  if (holidayCount > 0) {
                    res.status(400).json({
                      message: "Cannot set [process plan date] to a holiday!",
                      suggestion: "Please retry with a different date.",
                    });
                    //GOTO STEP2
                  }
                }

                if (new Date(req.body[`PPD${No}`]) < new Date(Final_Date)) {
                  res.status(400).json({
                    message: `System can not calc, because [No${No} - ${
                      req.body[`PPC${No}`]
                    } - (${
                      req.body[`PPD${No}`]
                    })] is not after [${Final_Date}]! Do you cancel Calc?`,
                    confirm: true,
                  });
                  N = 0;
                  while (N < 36) {
                    N += 1;
                    const schedule = await prisma.tD_Schedule.findUnique({
                      where: { OdPt_No: OdPt_No },
                      select: { [`PPD${N}`]: true },
                    });

                    if (schedule) {
                    }
                  }
                } else {
                  //GOTO STEP2
                }

                //GOTO STEP3
              }
            }
          } else {
            if (new Date(Fix_Date[N]) !== new Date(Temp_Date)) {
              St_Rev = (ReDays - MinDays) / Fix_Pr_N[N];
              Sc_Scale = 1;
              Now_No = Final_No + 1;
              Now_Date = Final_Date;
              //GOTO STEP1
            }
            Now_No = No + 1;
            Final_No = No;
            Now_Date = new Date(Temp_Date);
            Final_Date = Now_Date;
            Sc_Scale = 1;
            St_Rev = 0;
          }
          
        }
        const PPDValues3 = Array.from({ length: 36 }, (_, i) => {
          const PPDKey = `PPD${i + 1}`;
          return [PPDKey, req.body[PPDKey] || null];
        });
        const scheduleData4 = {
          ...Object.fromEntries(PPDValues3),
        };
        console.log("PPD", scheduleData4);

      }

    }
  } catch (err) {
    console.error("Error Error occurs when Schedule_Calc_Click:", err);
    return next(createError(500, "Internal Server Error"));
  }
};

exports.fetchplan = async (req, res, next) => {
  try {
    const plan = await prisma.tD_Plan.findMany();

    return res.status(200).json({
      status: "success",
      data: {
        plan: plan,
      },
    });
  } catch (err) {
    console.error("Error searching NAVWI:", err);
    return next(createError(500, "Internal Server Error"));
  }
};

exports.Search_Parts_No_AfterUpdate = async (req, res, next) => {
  // ล็อกข้อมูลที่รับเข้ามา
  console.log("Request Body:", req.body);

  try {
    let { Order_No: orderNo, Parts_No: partsNO } = req.body;

    const OdPt_No = orderNo + partsNO;

    const planpartsNO = await prisma.tD_Plan.findFirst({
      where: { OdPt_No: OdPt_No },
    });

    if (!planpartsNO) {
      return next(
        createError(
          404,
          "Plan part not found for the given Order_No and Parts_No"
        )
      );
    }

    let N = 0;
    while (N < 36) {
      N += 1;

      if (planpartsNO[`PPC${N}`] !== null) {
        planpartsNO[`INN${N}`] = await prisma.tD_Schedule
          .findFirst({
            where: { OdPt_No: planpartsNO.OdPt_No },
            select: { [`INN${N}`]: true },
          })
          .then((result) => (result ? result[`INN${N}`] : null));

        const ptpData = await prisma.tD_Plan.findFirst({
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
          .findFirst({
            where: { OdPt_No: planpartsNO.OdPt_No },
            select: { [`PPD${N}`]: true },
          })
          .then((result) => (result ? result[`PPD${N}`] : null));

        planpartsNO[`ASP${N}`] = await prisma.tD_Schedule
          .findFirst({
            where: { OdPt_No: planpartsNO.OdPt_No },
            select: { [`ASP${N}`]: true },
          })
          .then((result) => (result ? result[`ASP${N}`] : null));

        planpartsNO[`BKD${N}`] = await prisma.tD_Schedule
          .findFirst({
            where: { OdPt_No: planpartsNO.OdPt_No },
            select: { [`BKD${N}`]: true },
          })
          .then((result) => (result ? result[`BKD${N}`] : null));

        planpartsNO[`PML${N}`] = await prisma.tD_Schedule
          .findFirst({
            where: { OdPt_No: planpartsNO.OdPt_No },
            select: { [`PML${N}`]: true },
          })
          .then((result) => (result ? result[`PML${N}`] : null));

        planpartsNO[`PPL${N}`] = await prisma.tD_Schedule
          .findFirst({
            where: { OdPt_No: planpartsNO.OdPt_No },
            select: { [`PPL${N}`]: true },
          })
          .then((result) => (result ? result[`PPL${N}`] : null));

        planpartsNO[`RPD${N}`] = await prisma.tD_Result
          .findFirst({
            where: { OdPt_No: planpartsNO.OdPt_No },
            select: { [`RPD${N}`]: true },
          })
          .then((result) => (result ? result[`RPD${N}`] : null));

        planpartsNO[`RMT${N}`] = await prisma.tD_Result
          .findFirst({
            where: { OdPt_No: planpartsNO.OdPt_No },
            select: { [`RMT${N}`]: true },
          })
          .then((result) => (result ? result[`RMT${N}`] : null));

        planpartsNO[`RPT${N}`] = await prisma.tD_Result
          .findFirst({
            where: { OdPt_No: planpartsNO.OdPt_No },
            select: { [`RPT${N}`]: true },
          })
          .then((result) => (result ? result[`RPT${N}`] : null));

        planpartsNO[`RPN${N}`] = await prisma.tD_Result
          .findFirst({
            where: { OdPt_No: planpartsNO.OdPt_No },
            select: { [`RPN${N}`]: true },
          })
          .then((result) => (result ? result[`RPN${N}`] : null));
      }
    }

    // ดึงค่าจาก TD_Plan
    planpartsNO.End_No = await prisma.tD_Plan
      .findFirst({
        where: { OdPt_No: planpartsNO.OdPt_No },
        select: { End_No: true },
      })
      .then((result) => (result ? result.End_No : null));

    planpartsNO.Now_No = await prisma.tD_Plan
      .findFirst({
        where: { OdPt_No: planpartsNO.OdPt_No },
        select: { Now_No: true },
      })
      .then((result) => (result ? result.Now_No : null));

    planpartsNO.Re_Pr_Qty = await prisma.tD_Plan
      .findFirst({
        where: { OdPt_No: planpartsNO.OdPt_No },
        select: { Re_Pr_Qty: true },
      })
      .then((result) => (result ? result.Re_Pr_Qty : null));

    planpartsNO.Total_M_Time = await prisma.tD_Plan
      .findFirst({
        where: { OdPt_No: planpartsNO.OdPt_No },
        select: { Total_M_Time: true },
      })
      .then((result) => (result ? result.Total_M_Time : null));

    planpartsNO.Total_P_Time = await prisma.tD_Plan
      .findFirst({
        where: { OdPt_No: planpartsNO.OdPt_No },
        select: { Total_P_Time: true },
      })
      .then((result) => (result ? result.Total_P_Time : null));

    planpartsNO.Re_Total_M_Time = await prisma.tD_Plan
      .findFirst({
        where: { OdPt_No: planpartsNO.OdPt_No },
        select: { Re_Total_M_Time: true },
      })
      .then((result) => (result ? result.Re_Total_M_Time : null));

    planpartsNO.Re_Total_P_Time = await prisma.tD_Plan
      .findFirst({
        where: { OdPt_No: planpartsNO.OdPt_No },
        select: { Re_Total_P_Time: true },
      })
      .then((result) => (result ? result.Re_Total_P_Time : null));

    planpartsNO.Re_Total_N_Time = await prisma.tD_Plan
      .findFirst({
        where: { OdPt_No: planpartsNO.OdPt_No },
        select: { Re_Total_N_Time: true },
      })
      .then((result) => (result ? result.Re_Total_N_Time : null));

    return res.status(200).json({
      status: "success",
      data: {
        plan: planpartsNO,
      },
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
    switch (quoteDelivery?.Pl_Quote_Delivery || "Product_Delivery") {
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

// exports.deletePlans = async (req, res, next) => {
//   try {
//     // ล็อกข้อมูลที่รับเข้ามา
//     console.log("Request Body:", req.body);

//     // ดึงหมายเลขคำสั่งซื้อจากคำขอ
//     const { Order_No: orderNo, Parts_No: partsNo } = req.body;

//     // ตรวจสอบว่า orderNo และ partsNo เป็นสตริงและมีความยาวที่เหมาะสม
//     if (typeof orderNo !== "string" || orderNo.length < 10) {
//       return next(
//         createError(
//           400,
//           "Order number is required and must be at least 10 characters long"
//         )
//       );
//     }

//     if (typeof partsNo !== "string") {
//       return next(createError(400, "Parts number is required"));
//     }

//     // ค้นหาในฐานข้อมูลเพื่อดูว่ามี order นี้อยู่หรือไม่
//     const existingOrder = await prisma.tD_Order.findUnique({
//       where: { Order_No: orderNo },
//     });

//     // หากไม่พบหมายเลขคำสั่งซื้อ ส่งข้อผิดพลาด
//     if (!existingOrder) {
//       return next(createError(404, "Order not found"));
//     }

//     // ลบข้อมูลใน TD_Plan ที่เกี่ยวข้องกับ Order_No
//     await prisma.tD_Plan.deleteMany({
//       where: { Order_No: orderNo },
//     });

//     // ส่งข้อมูลการลบกลับไปยังผู้ใช้
//     return res.status(200).json({
//       status: "success",
//       message: "Order and related plans deleted successfully",
//     });
//   } catch (err) {
//     console.error("Error deleting order:", err);
//     return next(createError(500, "Internal Server Error"));
//   }
// };

// soft delete
exports.deletePlans = async (req, res, next) => {
  try {
    const { Order_No: orderNo, Parts_No: partsNo } = req.body;

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

    // Check if the order exists
    const existingOrder = await prisma.tD_Order.findUnique({
      where: { Order_No: orderNo },
    });

    if (!existingOrder) {
      return next(createError(404, "Order not found"));
    }

    // Update the soft delete flag in the database
    const updatedPlan = await prisma.tD_Plan.updateMany({
      where: { Order_No: orderNo, Parts_No: partsNo },
      data: { isDeleted: true, deletedAt: new Date() }, // Soft delete
    });

    if (updatedPlan.count === 0) {
      return next(createError(404, "No matching plan found to delete"));
    }

    return res.status(200).json({
      status: "success",
      message: "Plan deleted successfully",
    });
  } catch (err) {
    console.error("Error performing delete:", err);
    return next(createError(500, "Internal Server Error"));
  }
};

exports.createPlan = async (req, res, next) => {
  try {
    const {
      Order_No,
      Parts_No,
      Parts_CD,
      Pt_Material,
      Pt_Delivery,
      Pt_Qty,
      Pt_Unit_CD,
      Pt_Split,
      Pt_Spare_Qty,
      Pt_NG_Qty,
      Pl_Reg_Person_CD,
      Pt_CAT1,
      Pt_CAT2,
      Pt_CAT3,
      Pt_Complete_Date,
      Pt_I_Date,
      Pl_Upd_Person_CD,
      Pl_Schedule_CD,
      Connect_Od_No,
      Connect_Pt_No,
      Connect_Pr_No,
      Pt_Pending,
      Outside,
      Pl_St_Rev_Day,
      Pl_Ed_Rev_Day,
      Info1,
      Info2,
      Info3,
      Info4,
      Info5,
      Info6,
      Info_Chk1,
      Info_Chk2,
      Info_Chk3,
      Info_Chk4,
      Info_Chk5,
      Info_Chk6,
      Money_Object,
    } = req.body;

    const ppcValues = Array.from({ length: 36 }, (_, i) => {
      const ppcKey = `PPC${i + 1}`;
      return [
        ppcKey,
        req.body[ppcKey] || null, // Check if there's a value for each PPC
      ];
    });
    const pmtValues = Array.from({ length: 36 }, (_, i) => {
      const pmtKey = `PMT${i + 1}`;
      return [
        pmtKey,
        req.body[pmtKey] !== undefined && req.body[pmtKey] !== ""
          ? parseInt(req.body[pmtKey], 10)
          : null,
      ];
    });

    const pptValues = Array.from({ length: 36 }, (_, i) => {
      const pptKey = `PPT${i + 1}`;
      return [
        pptKey,
        req.body[pptKey] !== undefined && req.body[pptKey] !== ""
          ? parseInt(req.body[pptKey], 10)
          : null,
      ];
    });
    const ppvValues = Array.from({ length: 36 }, (_, i) => {
      const ppvKey = `PPV${i + 1}`;
      return [
        ppvKey,
        req.body[ppvKey] || null, // Check if there's a value for each PPC
      ];
    });

    const OdPt_No = Order_No + Parts_No;
    let Pl_Progress_CD = "0";
    let FG = 0;
    let KN = 0;
    let Now_No = 0; // ตัวแปร Now_No
    let End_No = 0;
    // ตรวจสอบค่า PPD1 ถึง PPD36
    for (let PD = 1; PD <= 36; PD++) {
      if (req.body[`PPD${PD}`] != null) {
        Pl_Progress_CD = "1";
        break;
      }
    }

    if (Pl_Progress_CD < 2) {
      for (let PD = 1; PD <= 36; PD++) {
        if (req.body[`RPD${PD}`] != null) {
          Pl_Progress_CD = "2";
          break;
        }
      }
    }

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
    let Max_No = 0;
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

        if (isEnd === true) FG++;
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
    if (FG === 0 && req.body.Money_Object === false) {
      req.body.Money_Object = true; // เปลี่ยนค่าเป็น On
    } else if (FG > 0 && req.body.Money_Object === true) {
      req.body.Money_Object = false; // เปลี่ยนค่าเป็น Off
    }

    while (FG < 1) {
      KN++;
      if (KN !== 37) {
        if (
          req.body[`RPD${KN}`] === null ||
          req.body[`RPD${KN}`] === undefined
        ) {
          Now_No = KN;
          FG = 1;
        }
      } else {
        Now_No = KN;
        FG = 1;
      }
    }
    while (FG < 1) {
      KN++;
      if (KN !== 36) {
        const currentPPC = req.body[`PPC${KN}`];
        if (currentPPC && currentPPC.trim() !== "") {
          // ถ้า PPC มีค่าและไม่ใช่ค่าว่าง
          End_No = KN;
        } else {
          // ถ้า PPC เป็นค่าว่าง
          FG = 1;
        }
      } else {
        // หยุดเมื่อ KN ถึง 36
        End_No = KN;
        FG = 1;
      }
    }
    const planData = {
      Order_No,
      Parts_No,
      OdPt_No,
      Parts_CD,
      Pt_Material,
      Pt_Delivery,
      Pt_Qty: parseInt(Pt_Qty, 10),
      Pt_Unit_CD,
      Pt_Split,
      Pt_Spare_Qty: parseInt(Pt_Spare_Qty, 10),
      Pt_NG_Qty: parseInt(Pt_NG_Qty, 10),
      Pl_Reg_Person_CD,
      Pt_CAT1,
      Pt_CAT2,
      Pt_CAT3,
      Pl_Progress_CD,
      Pt_Complete_Date,
      Pt_I_Date,
      Pl_Upd_Person_CD,
      Pl_Schedule_CD,
      Connect_Od_No,
      Connect_Pt_No,
      Connect_Pr_No: parseInt(Connect_Pr_No, 10),
      Pt_Pending,
      Outside,
      Pl_St_Rev_Day,
      Pl_Ed_Rev_Day,
      Info1,
      Info2,
      Info3,
      Info4,
      Info5,
      Info6,
      Info_Chk1,
      Info_Chk2,
      Info_Chk3,
      Info_Chk4,
      Info_Chk5,
      Info_Chk6,
      Money_Object,
      ...Object.fromEntries(ppcValues),
      ...Object.fromEntries(pmtValues),
      ...Object.fromEntries(pptValues),
      ...Object.fromEntries(ppvValues),
      Max_No: Max_No.toString(),
      Now_No: Now_No.toString(),
      End_No: End_No.toString(),
    };

    const existingPlan = await prisma.tD_Plan.findFirst({
      where: {
        OdPt_No: OdPt_No,
      },
    });

    if (existingPlan) {
      const updatedPlan = await prisma.tD_Plan.updateMany({
        where: {
          OdPt_No: OdPt_No,
        },
        data: {
          ...planData,
          Pl_Upd_Date: new Date(),
        },
      });
      return res.status(200).json({
        message: "Plan updated successfully",
        result: updatedPlan,
      });
    } else {
      const newPlan = await prisma.tD_Plan.create({
        data: {
          ...planData,
          Pl_St_Rev_Day:parseFloat(Pl_St_Rev_Day),
          Pl_Ed_Rev_Day:parseFloat(Pl_Ed_Rev_Day),
          Pl_Upd_Date: new Date(),
          Pl_Reg_Date: new Date(),
        },
      });

      return res
        .status(201)
        .json({ message: "Plan created successfully", plan: newPlan });
    }
  } catch (err) {
    console.error("Error creating Plan:", err);
    return next(createError(500, "Internal Server Error"));
  }
};

exports.createSchedule = async (req, res, next) => {
  try {
    const { Order_No, Parts_No } = req.body;
    const OdPt_No = Order_No + Parts_No;

    const PPDValues = Array.from({ length: 36 }, (_, i) => {
      const PPDKey = `PPD${i + 1}`;
      return [PPDKey, req.body[PPDKey] || null];
    });

    const scheduleData = {
      Order_No,
      Parts_No,
      OdPt_No,
      ...Object.fromEntries(PPDValues),
    };

    const existingSchedule = await prisma.tD_Schedule.findFirst({
      where: {
        OdPt_No: OdPt_No,
      },
    });

    if (existingSchedule) {
      const updatedSchedule = await prisma.tD_Schedule.updateMany({
        where: {
          OdPt_No: OdPt_No,
        },
        data: { ...scheduleData, Sc_Upd_Date: new Date().toISOString() },
      });
      return res.status(200).json({
        message: "Schedule updated successfully",
        result: updatedSchedule,
      });
    } else {
      const newSchedule = await prisma.tD_Schedule.create({
        data: {
          ...scheduleData,
          Sc_Reg_Date: new Date().toISOString(),
          Sc_Upd_Date: new Date().toISOString(),
        },
      });

      return res
        .status(201)
        .json({ message: "Schedule created successfully", newSchedule });
    }
  } catch (err) {
    console.error("Error creating Schedule:", err);
    return next(createError(500, "Internal Server Error"));
  } finally {
    await prisma.$disconnect();
  }
};

exports.createResult = async (req, res, next) => {
  try {
    const { Order_No, Parts_No } = req.body;
    const OdPt_No = Order_No + Parts_No;

    const rpdValues = Array.from({ length: 36 }, (_, i) => {
      const rpdKey = `RPD${i + 1}`;
      return [rpdKey, req.body[rpdKey] || null];
    });
    const rmtValues = Array.from({ length: 36 }, (_, i) => {
      const rmtKey = `RMT${i + 1}`;
      const value = req.body[rmtKey] !== undefined ? req.body[rmtKey] : null;
      return [
        rmtKey,
        value !== null && !isNaN(value) ? parseInt(value, 10) : null,
      ];
    });
    const rptValues = Array.from({ length: 36 }, (_, i) => {
      const rptKey = `RPT${i + 1}`;
      const value = req.body[rptKey] !== undefined ? req.body[rptKey] : null;
      return [
        rptKey,
        value !== null && !isNaN(value) ? parseInt(value, 10) : null,
      ];
    });
    const rpnValues = Array.from({ length: 36 }, (_, i) => {
      const rpnKey = `RPN${i + 1}`;
      const value = req.body[rpnKey] !== undefined ? req.body[rpnKey] : null;
      return [
        rpnKey,
        value !== null && !isNaN(value) ? parseInt(value, 10) : null,
      ];
    });
    const resultData = {
      Order_No,
      Parts_No,
      OdPt_No,

      ...Object.fromEntries(rpdValues),
      ...Object.fromEntries(rmtValues),
      ...Object.fromEntries(rptValues),
      ...Object.fromEntries(rpnValues),
    };
    const existingResult = await prisma.tD_Result.findFirst({
      where: {
        OdPt_No: OdPt_No,
      },
    });
    if (existingResult) {
      const updatedResult = await prisma.tD_Result.updateMany({
        where: {
          OdPt_No: OdPt_No,
        },
        data: { ...resultData, Rs_Upd_Date: new Date().toISOString() },
      });
      return res.status(200).json({
        message: "Result updated successfully",
        result: updatedResult,
      });
    } else {
      const newResult = await prisma.tD_Result.create({
        data: {
          ...resultData,
          Rs_Upd_Date: new Date().toISOString(),
          Rs_Reg_Date: new Date().toISOString(),
        },
      });
      return res
        .status(201)
        .json({ message: "Result created successfully", newResult });
    }
  } catch (err) {
    console.error("Error creating Result:", err);
    return next(createError(500, "Internal Server Error"));
  } finally {
    await prisma.$disconnect();
  }
};

exports.createWip = async (req, res, next) => {
  try {
    const { Order_No, Parts_No, PPG, PPD, INN, RPD, RPT, RPN, ASP } = req.body;

    let Total_M_Time = 0;
    let Total_P_Time = 0;
    let Re_Total_M_Time = 0;
    let Re_Total_P_Time = 0;
    let Re_Total_N_Time = 0;
    let Re_Pr_Qty = 0;
    let FG = 0;
    let KN = 0;
    let Now_No = 0;
    let End_No = 0;
    while (FG < 1) {
      KN++;
      if (KN !== 37) {
        if (
          req.body[`RPD${KN}`] === null ||
          req.body[`RPD${KN}`] === undefined
        ) {
          Now_No = KN;
          FG = 1;
        }
      } else {
        Now_No = KN;
        FG = 1;
      }
    }

    FG = 0;
    KN = 0;
    while (FG < 1) {
      KN++;
      if (KN !== 36) {
        if (!req.body[`PPC${KN}`]) {
          FG = 1;
        } else {
          End_No = KN;
        }
      } else {
        End_No = KN;
        FG = 1;
      }
    }

    for (let N = 1; N <= 36; N++) {
      const PPC = req.body[`PPC${N}`];
      let T_Type = req.body[`T_Type${N}`];
      let P_Type = req.body[`P_Type${N}`];
      let S_Type = req.body[`S_Type${N}`];

      if (PPC) {
        if (!T_Type) {
          const process = await prisma.tM_Process.findUnique({
            where: { Process_CD: PPC },
            select: { T_Type: true, P_Type: true, S_Type: true },
          });

          T_Type = process?.T_Type || null;
          P_Type = process?.P_Type || null;
          S_Type = process?.S_Type || null;

          if (req.body[`PMT${N}`] > req.body[`PPT${N}`]) {
            P_Type = "A";
          }

          req.body[`T_Type${N}`] = T_Type;
          req.body[`P_Type${N}`] = P_Type;
          req.body[`S_Type${N}`] = S_Type;
        }

        const PMT = parseInt(req.body[`PMT${N}`], 10) || 0;
        const PPT = parseInt(req.body[`PPT${N}`], 10) || 0;
        const Pt_Qty = parseInt(req.body[`Pt_Qty`], 10) || 0;
        const Pt_Spare_Qty = parseInt(req.body[`Pt_Spare_Qty`], 10) || 0;
        const Pt_NG_Qty = parseInt(req.body[`Pt_NG_Qty`], 10) || 0;

        const PML =
          T_Type === "L"
            ? PMT
            : isNaN(PMT) ||
              isNaN(Pt_Qty) ||
              isNaN(Pt_Spare_Qty) ||
              isNaN(Pt_NG_Qty)
            ? null
            : PMT * (Pt_Qty + Pt_Spare_Qty - Pt_NG_Qty);

        const PPL =
          T_Type === "L"
            ? PPT
            : isNaN(PPT) ||
              isNaN(Pt_Qty) ||
              isNaN(Pt_Spare_Qty) ||
              isNaN(Pt_NG_Qty)
            ? null
            : PPT * (Pt_Qty + Pt_Spare_Qty - Pt_NG_Qty);

        Total_M_Time += PML;
        Total_P_Time += PPL;

        if (!req.body[`RPD${N}`]) {
          Re_Pr_Qty += 1;
          Re_Total_M_Time += req.body[`PML${N}`] || 0;
          Re_Total_P_Time += req.body[`PPL${N}`] || 0;

          if (req.body[`P_Type${N}`] === "M") {
            Re_Total_N_Time += req.body[`PPL${N}`] || 0;
          } else {
            Re_Total_N_Time +=
              (req.body[`PPL${N}`] || 0) + (req.body[`PML${N}`] || 0);
          }
        }
        const OdPtPr_No = `${Order_No}${Parts_No}${N}`;
        const OdPt_No = `${Order_No}${Parts_No}`;

        const existingWip = await prisma.tD_WIP.findFirst({
          where: { OdPtPr_No },
        });

        const wipData = {
          Order_No,
          Parts_No,
          Process_No: N.toString(),
          OdPt_No,
          OdPtPr_No,
          PPG,
          PPC,
          PMT,
          PPT,
          T_Type,
          P_Type,
          S_Type,
          PPD,
          PML,
          PPL,
          INN,
          RPD,
          RMT: parseInt(req.body[`RMT${N}`], 10) || null,
          RPT,
          RPN,
          ASP,
          Now_No: Now_No.toString(),
        };
        const scheduleData = {};

        for (let i = 1; i <= 36; i++) {
          const T_Type = req.body[`T_Type${i}`];
          const PMT = parseInt(req.body[`PMT${i}`], 10) || 0;
          const PPT = parseInt(req.body[`PPT${i}`], 10) || 0;
          const Pt_Qty = parseInt(req.body[`Pt_Qty`], 10) || 0;
          const Pt_Spare_Qty = parseInt(req.body[`Pt_Spare_Qty`], 10) || 0;
          const Pt_NG_Qty = parseInt(req.body[`Pt_NG_Qty`], 10) || 0;

          scheduleData[`PML${i}`] =
            T_Type === "L"
              ? PMT
              : isNaN(PMT) ||
                isNaN(Pt_Qty) ||
                isNaN(Pt_Spare_Qty) ||
                isNaN(Pt_NG_Qty)
              ? null
              : PMT * (Pt_Qty + Pt_Spare_Qty - Pt_NG_Qty);

          scheduleData[`PPL${i}`] =
            T_Type === "L"
              ? PPT
              : isNaN(PPT) ||
                isNaN(Pt_Qty) ||
                isNaN(Pt_Spare_Qty) ||
                isNaN(Pt_NG_Qty)
              ? null
              : PPT * (Pt_Qty + Pt_Spare_Qty - Pt_NG_Qty);
        }
        await prisma.tD_Schedule.updateMany({
          where: { OdPt_No },
          data: scheduleData,
        });
        if (existingWip) {
          await prisma.tD_WIP.updateMany({
            where: { OdPtPr_No },
            data: wipData,
          });
        } else {
          await prisma.tD_WIP.create({ data: wipData });
        }
      } else {
        ["PMT", "PPT", "T_Type", "P_Type", "S_Type"].forEach((key) => {
          req.body[`${key}${N}`] = null;
        });
      }
    }

    const OdPt_No = `${Order_No}${Parts_No}`;
    const planData = {
      Now_No: Now_No.toString(),
      End_No: End_No.toString(),
      Re_Pr_Qty,
      Total_M_Time,
      Total_P_Time,
      Re_Total_M_Time,
      Re_Total_P_Time,
      Re_Total_N_Time,
      // Handle PTP values dynamically
      ...Array.from({ length: 36 }, (_, i) => ({
        [`PTP${i + 1}`]: `${req.body[`T_Type${i + 1}`] ?? ""}${
          req.body[`P_Type${i + 1}`] ?? ""
        }${req.body[`S_Type${i + 1}`] ?? ""}`,
      })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    };
    console.log(`PPC${KN}:`, req.body[`PPC${KN}`]);
    await prisma.tD_Plan.updateMany({ where: { OdPt_No }, data: planData });

    res.status(201).json({ message: "Wip created or updated successfully" });
  } catch (err) {
    console.error("Error creating or updating Wip:", err);
    return next(createError(500, "Internal Server Error"));
  } finally {
    await prisma.$disconnect();
  }
};

exports.deleteWip = async (req, res, next) => {
  try {
    const { Order_No, Parts_No } = req.body;

    for (let N = 1; N <= 36; N++) {
      const OdPtPr_No = `${Order_No}${Parts_No}${N}`;

      const existingWip = await prisma.tD_WIP.findFirst({
        where: {
          OdPtPr_No: OdPtPr_No,
        },
      });

      if (existingWip) {
        await prisma.tD_WIP.delete({
          where: {
            Order_No_Parts_No_Process_No: {
              Order_No,
              Parts_No,
              Process_No: N.toString(),
            },
          },
        });
      }
    }

    return res.status(200).json({ message: "WIP deleted successfully" });
  } catch (err) {
    console.error("Error deleting WIP:", err);
    return next(createError(500, "Internal Server Error"));
  } finally {
    await prisma.$disconnect();
  }
};

exports.deleteResult = async (req, res, next) => {
  try {
    const { Order_No, Parts_No } = req.body;
    const OdPt_No = `${Order_No}${Parts_No}`;

    const existingResult = await prisma.tD_Result.findFirst({
      where: {
        OdPt_No: OdPt_No,
      },
    });

    if (existingResult) {
      const deletedResult = await prisma.tD_Result.delete({
        where: {
          Order_No_Parts_No: {
            Order_No,
            Parts_No,
          },
        },
      });

      return res.status(200).json({
        message: "Result deleted successfully",
        deletedResult,
      });
    } else {
      return res.status(404).json({
        message: "Result not found",
      });
    }
  } catch (err) {
    console.error("Error deleting Result:", err);
    return next(createError(500, "Internal Server Error"));
  } finally {
    await prisma.$disconnect();
  }
};

exports.deleteSchedule = async (req, res, next) => {
  try {
    const { Order_No, Parts_No } = req.body;
    const OdPt_No = `${Order_No}${Parts_No}`;

    const existingSchedule = await prisma.tD_Schedule.findFirst({
      where: {
        OdPt_No: OdPt_No,
      },
    });

    if (existingSchedule) {
      const deletedSchedule = await prisma.tD_Schedule.delete({
        where: {
          Order_No_Parts_No: {
            Order_No,
            Parts_No,
          },
        },
      });

      return res.status(200).json({
        message: "Schedule deleted successfully",
        deletedSchedule,
      });
    } else {
      return res.status(404).json({
        message: "Schedule not found",
      });
    }
  } catch (err) {
    console.error("Error deleting Schedule:", err);
    return next(createError(500, "Internal Server Error"));
  } finally {
    await prisma.$disconnect();
  }
};

exports.deletePlan = async (req, res, next) => {
  try {
    const { Order_No, Parts_No } = req.body;
    const OdPt_No = `${Order_No}${Parts_No}`;

    const existingPlan = await prisma.tD_Plan.findFirst({
      where: {
        OdPt_No: OdPt_No,
      },
    });

    if (existingPlan) {
      const deletedPlan = await prisma.tD_Plan.delete({
        where: {
          Order_No_Parts_No: {
            Order_No,
            Parts_No,
          },
        },
      });

      return res.status(200).json({
        message: "Plan deleted successfully",
        deletedPlan,
      });
    } else {
      return res.status(404).json({
        message: "Plan not found",
      });
    }
  } catch (err) {
    console.error("Error deleting Plan:", err);
    return next(createError(500, "Internal Server Error"));
  } finally {
    await prisma.$disconnect();
  }
};

exports.getPlan = async (req, res, next) => {
  try {
    const selectAllPlan = await prisma.tD_Plan.findMany();
    return res.status(200).json({
      message: "Fetch TD_PLAN data successfully.",
      data: selectAllPlan,
    });
  } catch (error) {
    console.error("Error deleting Plan:", error);
    return next(createError(500, "Internal Server Error"));
  }
};
