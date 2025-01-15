const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const createError = require("../utils/create-error");
const prisma = require("../models/prisma");





exports.fetchtt_OD_csv_upd = async (req, res, next) => {
  try {
    const NAVPCUPD = await prisma.tT_NAV_Od_CSV_Upd.findMany();

    return res.status(200).json({
      status: "success",
      data: {
        NAVOdUPD: NAVOdUPD,
      },
    });
  } catch (err) {
    console.error("Error searching NAVOdUPD:", err);
    return next(createError(500, "Internal Server Error"));
  }
};

exports.fetchtt_OD_csv = async (req, res, next) => {
  try {
    const NAVPC = await prisma.tT_NAV_Od_CSV.findMany();

    return res.status(200).json({
      status: "success",
      data: {
        NAVOd: NAVOd,
      },
    });
  } catch (err) {
    console.error("Error searching NAVOd:", err);
    return next(createError(500, "Internal Server Error"));
  }
};




exports.TT_NAV_OD_CSV = async (req, res, next) => {
  try {
    // Clean up old data
    await prisma.tT_NAV_Od_CSV.deleteMany();
    await prisma.tT_NAV_Od_CSV_Upd.deleteMany();

    const sourceDir = 'C:/TENKEI/Order_CSV';
    const destDir = 'C:/TENKEI/Order_CSV/BK';

    // Check if the destination directory exists, if not, create it
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // List all files in the source directory
    fs.readdir(sourceDir, async (err, files) => {
      if (err) {
        console.error('Error reading directory', err);
        return next(createError(500, 'Internal Server Error'));
      }

      // Filter only CSV files
      const csvFiles = files.filter(file => path.extname(file).toLowerCase() === '.csv');

      // Process each CSV file
      for (const file of csvFiles) {
        const sourcePath = path.join(sourceDir, file);
        const destPath = path.join(destDir, file);

        // Move the file to destination
        try {
          await moveFile(sourcePath, destPath);
          console.log(`${file} moved successfully.`);
        } catch (moveErr) {
          console.error('Error moving file', moveErr);
          return next(createError(500, 'Internal Server Error'));
        }

        // Read the CSV and save records to the database
        const results = [];
        const seenOrderNos = new Set();

        // Read the file and collect unique records
        fs.createReadStream(destPath)
          .pipe(csvParser())
          .on('data', (row) => {
            if (!seenOrderNos.has(row["Order_No"])) {
              seenOrderNos.add(row["Order_No"]);
              results.push({
                Order_No: row["Order_No"], // Prisma Order_No field as primary key
                Request1_CD: row["Request1_CD"] ? parseInt(row["Request1_CD"]) : null,
                Customer_CD: row["Customer_CD"],
                Sales_Person_CD: row["Sales_Person_CD"],
                Order_Date: parseDate(row["Order_Date"]),
                Request_Delivery: parseDate(row["Request_Delivery"]),
                Od_Upd_Date: parseDate(row["Od_Upd_Date"]),
                Item1_CD: row["Item1_CD"],
                NAV_Name: row["NAV_Name"],
                NAV_Size: row["NAV_Size"],
                Quantity: row["Quantity"] ? parseFloat(row["Quantity"]) : null,
                Unit_CD: row["Unit_CD"],
                Unit_Price: row["Unit_Price"] ? parseFloat(row["Unit_Price"]) : null,
                Amount: row["Amount"] ? parseFloat(row["Amount"]) : null,
                Customer_Draw: row["Customer_Draw"],
                Company_Draw: row["Company_Draw"],
                Tolerance: row["Tolerance"],
                Coating: row["Coating"],
                Material1: row["Material1"],
                Material2: row["Material2"],
                H_Treatment1: row["H_Treatment1"],
                H_Treatment2: row["H_Treatment2"],
                Material3: row["Material3"],
                Material4: row["Material4"],
                Material5: row["Material5"],
                H_Treatment3: row["H_Treatment3"],
                H_Treatment4: row["H_Treatment4"],
                H_Treatment5: row["H_Treatment5"],
                Customer_Abb: row["Customer_Abb"],
                Sl_Person_Name: row["Sl_Person_Name"],
                PO_No: row["PO_No"],
              });
            }
          })
          .on('end', async () => {
            try {
              // Use Prisma to save unique records to the database
              if (results.length > 0) {
                await prisma.tT_NAV_Od_CSV.createMany({
                  data: results,
                  skipDuplicates: true, // Prisma will skip duplicates based on primary key
                });
                console.log('CSV records saved successfully.');
              }
            } catch (err) {
              if (err.code === 'P2002') {
                console.error('Duplicate primary key error:', err.meta);
              } else {
                console.error('Error saving records to the database', err);
                return next(createError(500, 'Internal Server Error'));
              }
            }
          });
      }
    });

    res.status(200).send("CSV files processed and moved successfully");
  } catch (err) {
    console.error("Error processing CSV", err);
    return next(createError(500, "Internal Server Error"));
  }
};

// Helper function to move a file asynchronously
async function moveFile(sourcePath, destPath) {
  return new Promise((resolve, reject) => {
    fs.rename(sourcePath, destPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Helper function to parse dates (You may need to adjust date formats)
function parseDate(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date) ? null : date; // Return null if the date is invalid
}












// function delay(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
// async function importCsvToDatabase(filePath) {
  
//   const results =[];

//   return new Promise((resolve, reject) => {
//     fs.createReadStream(filePath)
//       .on("error", (err) => {
//         console.error(`Error reading file ${filePath}:`, err.message);
//         reject(err);
//       })
//       .pipe(csvParser())
//       .on("data", (data) => {
//         const mappedData = mapFiledRow(data);
     
//         function formatToDateTime(date) {
//           if (!date) {
//             return null; 
//           }
        
       
//           const [day, month, year] = date.split("/"); 
        
       
//           const formattedDate = new Date(`${year}-${month}-${day}`);
        
        
//           if (!isNaN(formattedDate.getTime())) {
//             const year = formattedDate.getFullYear();
//             const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
//             const day = String(formattedDate.getDate()).padStart(2, "0");
//             const hours = String(formattedDate.getHours()).padStart(2, "0");
//             const minutes = String(formattedDate.getMinutes()).padStart(2, "0");
//             const seconds = String(formattedDate.getSeconds()).padStart(2, "0");
        
//             return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
//           } else {
//             console.warn(`Invalid date format: ${date}`);
//             return null;
//           }
//         }
//         if (mappedData.Pc_Date) {
//           mappedData.Pc_Date = formatToDateTime(mappedData.Pc_Date);
//           if (!mappedData.Pc_Date) {
//             console.warn(`Invalid date format for Order_Date: ${mappedData.Pc_Date}`);
//           }
//         }
//         if (mappedData.Pc_Req_Delivery) {
//           mappedData.Pc_Req_Delivery = formatToDateTime(mappedData.Pc_Req_Delivery);
//           if (!mappedData.Pc_Req_Delivery) {
//             console.warn(`Invalid date format for Order_Date: ${mappedData.Pc_Req_Delivery}`);
//           }
//         }
//         if (mappedData.Pc_Ans_Delivery) {
//           mappedData.Pc_Ans_Delivery = formatToDateTime(mappedData.Pc_Ans_Delivery);
//           if (!mappedData.Pc_Ans_Delivery) {
//             console.warn(`Invalid date format for Order_Date: ${mappedData.Pc_Ans_Delivery}`);
//           }
//         }
//         if (mappedData.Pc_Arrival_Date) {
//           mappedData.Pc_Arrival_Date = formatToDateTime(mappedData.Pc_Arrival_Date);
//           if (!mappedData.Pc_Arrival_Date) {
//             console.warn(`Invalid date format for Order_Date: ${mappedData.Pc_Arrival_Date}`);
//           }
//         }
//         if (mappedData.Pc_Arrival_Qty) {
//           mappedData.Pc_Arrival_Qty = formatToDateTime(mappedData.Pc_Arrival_Qty);
//           if (!mappedData.Pc_Arrival_Qty) {
//             console.warn(`Invalid date format for Order_Date: ${mappedData.Pc_Arrival_Qty}`);
//           }
//         }
//         if (mappedData.Pc_NAV_Reg_Date) {
//           mappedData.Pc_NAV_Reg_Date = formatToDateTime(mappedData.Pc_NAV_Reg_Date);
//           if (!mappedData.Pc_NAV_Reg_Date) {
//             console.warn(`Invalid date format for Order_Date: ${mappedData.Pc_NAV_Reg_Date}`);
//           }
//         }
//         if (mappedData.Pc_NAV_Upd_Date) {
//           mappedData.Pc_NAV_Upd_Date = formatToDateTime(mappedData.Pc_NAV_Upd_Date);
//           if (!mappedData.Pc_NAV_Upd_Date) {
//             console.warn(`Invalid date format for Order_Date: ${mappedData.Pc_NAV_Upd_Date}`);
//           }
//         }
        
        



//         results.push(mappedData);
//       })
//       .on("end", async () => {
//         try {
//           if (results.length > 0) {
//             await prisma.tT_NAV_Pc_CSV.createMany({
//               data: results,
//             });
//               // Adding delay before deleting the file
//             await delay(1000); // Wait 1 second

//             // Ensure file is not in use before attempting to delete
//             if (fs.existsSync(filePath)) {
//               await fs.promises.unlink(filePath);
//             }

//             resolve();
//           } else {
//             console.warn(`No data found in file ${filePath}`);
//             resolve();
//           }
//         } catch (err) {
//           console.error("Error importing CSV into database", err.message);
//           reject(err);
//         }
//       });
//   });
// }

exports.QT_NAV_OD_CSV_Upd_Add = async (req, res, next) => {
  try {
    // Step 1: Fetch data with INNER JOIN
    const data = await prisma.tT_NAV_Od_CSV.findMany({
      include: {
        // Include related fields if necessary
      },
    });

    // Step 2: Insert each row of data into TT_NAV_Pc_CSV_Upd
    for (const row of data) {
      // Check if the record already exists in TT_NAV_Pc_CSV_Upd using findFirst
      const existingRecord = await prisma.tT_NAV_Od_CSV_Upd.findUnique({
        where: {
          Order_No: row.Order_No,  // Use OdPcLn_No or any unique identifier
        },
      });

      // If the record exists, reject the insertion and return an error
      if (existingRecord) {
        return res.status(400).json({
          status: "error",
          message: `Record with OdPcLn_No ${row.Order_No} already exists in TT_NAV_Pc_CSV_Upd, cannot insert duplicate data.`,
        });
      }

      // If no existing record, proceed with the insert
      await prisma.tT_NAV_Od_CSV_Upd.create({
        data : {
          Order_No: row.Order_No,
          Request1_CD: row.Request1_CD,
          Customer_CD: row.Customer_CD,
          Sales_Person_CD: row.Sales_Person_CD,
          Order_Date: row.Order_Date,
          Request_Delivery: row.Request_Delivery,
          Od_Upd_Date: row.Od_Upd_Date,
          Item1_CD: row.Item1_CD,
          NAV_Name: row.NAV_Name,
          NAV_Size: row.NAV_Size,
          Quantity: row.Quantity,
          Unit_CD: row.Unit_CD,
          Unit_Price: row.Unit_Price,
          Amount: row.Amount,
          Customer_Draw: row.Customer_Draw,
          Company_Draw: row.Company_Draw,
          Tolerance: row.Tolerance,
          Coating: row.Coating,
          Material1: row.Material1,
          Material2: row.Material2,
          H_Treatment1: row.H_Treatment1,
          H_Treatment2: row.H_Treatment2,
          Material3: row.Material3,
          Material4: row.Material4,
          Material5: row.Material5,
          H_Treatment3: row.H_Treatment3,
          H_Treatment4: row.H_Treatment4,
          H_Treatment5: row.H_Treatment5,
          Customer_Abb: row.Customer_Abb,
          Sl_Person_Name: row.Sl_Person_Name,
          PO_No: row.PO_No
        },
      });
    }

    // Step 3: Return success response after processing all data
    return res.status(201).json({
      status: "success",
      message: "Data inserted successfully into TT_NAV_Pc_CSV_Upd!",
    });
  } catch (err) {
    console.error("Error creating NAVPCUPD:", err);
    return next(createError(500, "Internal Server Error"));
  }
};

exports.QT_NAV_OD_CSV_Upd_Upd = async (req, res, next) => {
  try {
    // Step 1: Fetch all data from TT_NAV_Pc_CSV
    const data = await prisma.tT_NAV_Od_CSV.findMany();

    // Step 2: Process updates and inserts
    const operations = data.map(async (row) => {
      // Validate required field
      if (!row.Order_No) {
        console.warn("Missing OdPcLn_No for row:", row);
        return null;
      }

      try {
        // Check if record exists
        const existingRecord = await prisma.tT_NAV_Pc_CSV_Upd.findUnique({
          where: { Order_No: row.Order_No },
        });

        if (existingRecord) {
          // Update existing record
          return prisma.tT_NAV_Od_CSV_Upd.update({
            where: { Order_No: row.Order_No },
            data : {
              Order_No: row.Order_No,
              Request1_CD: row.Request1_CD,
              Customer_CD: row.Customer_CD,
              Sales_Person_CD: row.Sales_Person_CD,
              Order_Date: row.Order_Date,
              Request_Delivery: row.Request_Delivery,
              Od_Upd_Date: row.Od_Upd_Date,
              Item1_CD: row.Item1_CD,
              NAV_Name: row.NAV_Name,
              NAV_Size: row.NAV_Size,
              Quantity: row.Quantity,
              Unit_CD: row.Unit_CD,
              Unit_Price: row.Unit_Price,
              Amount: row.Amount,
              Customer_Draw: row.Customer_Draw,
              Company_Draw: row.Company_Draw,
              Tolerance: row.Tolerance,
              Coating: row.Coating,
              Material1: row.Material1,
              Material2: row.Material2,
              H_Treatment1: row.H_Treatment1,
              H_Treatment2: row.H_Treatment2,
              Material3: row.Material3,
              Material4: row.Material4,
              Material5: row.Material5,
              H_Treatment3: row.H_Treatment3,
              H_Treatment4: row.H_Treatment4,
              H_Treatment5: row.H_Treatment5,
              Customer_Abb: row.Customer_Abb,
              Sl_Person_Name: row.Sl_Person_Name,
              PO_No: row.PO_No
            },
          });
        } else {
          // Insert new record
          console.log("pass");
        }
      } catch (err) {
        console.error(`Error processing row with OdPcLn_No: ${row.Order_No}`, err);
      }
    });

    // Execute all operations in parallel
    await Promise.all(operations);

    return res.status(200).json({
      status: "success",
      message: "Data updated successfully in TT_NAV_Pc_CSV_Upd!",
    });
  } catch (err) {
    console.error("Error updating NAVPCUPD:", err);
    return next(createError(500, "Internal Server Error"));
  }
};


exports.QT_NAV_OD_CSV_Add = async (req, res, next) => {
  try {
    // Step 1: Fetch the data using an INNER JOIN between TT_NAV_Pc_CSV and TD_Procure
    const data = await prisma.tT_NAV_Od_CSV.findMany({
      include: {
        // Include any related fields from the TD_Procure table if necessary
      },
    });

    console.log("Query Result:", data);

    // Step 2: Insert only new records into TD_Procure
    const insertPromises = data.map(async (row) => {
      try {
        // Check if the record already exists in TD_Procure
        const existingRecord = await prisma.tD_Order.findUnique({
          where: { Order_No: row.Order_No },
        });

        if (existingRecord) {
          // If the record exists, skip the insertion
          console.log(`Record with OdPcLn_No ${row.Order_No} already exists, skipping insert.`);
          return null; // Or handle as needed (e.g., reject or log)
        }

        // If the record doesn't exist, insert it into TD_Procure
        return prisma.tD_Order.create({
          data : {
            Order_No: row.Order_No,
            Request1_CD: String(row.Request1_CD),
            TM_Customer: {
              connect: {
                Customer_CD: row.Customer_CD
              }
            },
            Sales_Person_CD: row.Sales_Person_CD,
            Order_Date: row.Order_Date,
            Request_Delivery: row.Request_Delivery,
            Od_Upd_Date: row.Od_Upd_Date,
            TM_Item1: {
              connect: {
                Item1_CD: row.Item1_CD
              }
            },
            NAV_Name: row.NAV_Name,
            NAV_Size: row.NAV_Size,
            Quantity: row.Quantity,
            Unit_CD: row.Unit_CD,
            Unit_Price: row.Unit_Price,
            // Amount: row.Amount,
            Customer_Draw: row.Customer_Draw,
            Company_Draw: row.Company_Draw,
            Tolerance: row.Tolerance,
            Coating: row.Coating,
            Material1: row.Material1,
            Material2: row.Material2,
            H_Treatment1: row.H_Treatment1,
            H_Treatment2: row.H_Treatment2,
            Material3: row.Material3,
            Material4: row.Material4,
            Material5: row.Material5,
            H_Treatment3: row.H_Treatment3,
            H_Treatment4: row.H_Treatment4,
            H_Treatment5: row.H_Treatment5,
            // Customer_Abb: row.Customer_Abb,
            // Sl_Person_Name: row.Sl_Person_Name,
            PO_No: row.PO_No
          }
        });
      } catch (error) {
        console.error("Error inserting row:", row, error);
        throw new Error("Failed to insert row with OdPcLn_No: " + row.Order_No);
      }
    });

    // Filter out null values (skipped inserts) and wait for all insert promises to complete
    const insertedRecords = await Promise.all(insertPromises);
    const newRecords = insertedRecords.filter(record => record !== null);

    // Step 3: Fetch the most recent record from TD_Procure
    
    // Step 4: Return success response with the most recent record and the new records
    return res.status(200).json({
      status: "success",
      message: "Data inserted successfully into TD_Procure!",
      newRecords: newRecords,  // Include only new records that were inserted
       // Include the most recent record in the response
    });
  } catch (err) {
    console.error("Error inserting data into TD_Procure:", err);
    return next(createError(500, "Internal Server Error"));
  }
};



  exports.QT_NAV_OD_CSV_Upd_Ref = async (req, res, next) => {
    try {
      // Step 1: Fetch the necessary data from TT_NAV_Pc_CSV_Upd and TD_Procure by joining these tables
      const dataToUpdate = await prisma.tT_NAV_Od_CSV_Upd.findMany({
        where: {
          Order_No: {
            in: await prisma.tD_Order.findMany({
              select: {
                Order_No: true,
              },
            }).then((rows) => rows.map((row) => row.Order_No)),
          },
        },
        select: {
          
              Order_No: true,
              Request1_CD: true,            
              Customer_CD:true,            
              Sales_Person_CD: true,
              Order_Date: true,
              Request_Delivery: true,
              Od_Upd_Date: true,
              Item1_CD: true,
              NAV_Name: true,
              NAV_Size: true,
              Quantity: true,
              Unit_CD: true,
              Unit_Price: true,
              // Amount: row.Amount,
              Customer_Draw:true,
              Company_Draw: true,
              Tolerance: true,
              Coating: true,
              Material1: true,
              Material2: true,
              H_Treatment1: true,
              H_Treatment2: true,
              Material3: true,
              Material4: true,
              Material5: true,
              H_Treatment3: true,
              H_Treatment4: true,
              H_Treatment5: true,
              // Customer_Abb: row.Customer_Abb,
              // Sl_Person_Name: row.Sl_Person_Name,
              PO_No: true,
        },
      });

      // Step 2: Fetch the old records from TD_Procure before updating
      const oldRecords = await prisma.tD_Order.findMany({
        where: {
          Order_No: {
            in: dataToUpdate.map((row) => row.Order_No),
          },
        },
      });

      // Step 3: Update the TD_Procure table using the fetched data
      const updatePromises = dataToUpdate.map((row) => {
        return prisma.tD_Order.update({
          where: { Order_No: row.Order_No },
          data: {
            Order_No: row.Order_No,
              Request1_CD: String(row.Request1_CD),
              TM_Customer: {
                connect: {
                  Customer_CD: row.Customer_CD
                }
              },
              Sales_Person_CD: row.Sales_Person_CD,
              Order_Date: row.Order_Date,
              Request_Delivery: row.Request_Delivery,
              Od_Upd_Date: row.Od_Upd_Date,
              TM_Item1: {
                connect: {
                  Item1_CD: row.Item1_CD
                }
              },
              NAV_Name: row.NAV_Name,
              NAV_Size: row.NAV_Size,
              Quantity: row.Quantity,
              Unit_CD: row.Unit_CD,
              Unit_Price: row.Unit_Price,
              // Amount: row.Amount,
              Customer_Draw: row.Customer_Draw,
              Company_Draw: row.Company_Draw,
              Tolerance: row.Tolerance,
              Coating: row.Coating,
              Material1: row.Material1,
              Material2: row.Material2,
              H_Treatment1: row.H_Treatment1,
              H_Treatment2: row.H_Treatment2,
              Material3: row.Material3,
              Material4: row.Material4,
              Material5: row.Material5,
              H_Treatment3: row.H_Treatment3,
              H_Treatment4: row.H_Treatment4,
              H_Treatment5: row.H_Treatment5,
              // Customer_Abb: row.Customer_Abb,
              // Sl_Person_Name: row.Sl_Person_Name,
              PO_Nomap: row.PO_Nomap
          },
        });
      });

      // Step 4: Wait for all update operations to complete
      await Promise.all(updatePromises);
      const updatedRecords = await prisma.tD_Order.findMany({
        where: {
          Order_No: {
            in: dataToUpdate.map((row) => row.Order_No),
          },
        },
      });
      // Step 5: Send old records to the frontend along with success message
      return res.status(200).json({
        status: "success",
        message: "Data updated successfully in TD_Procure!",
        oldRecords: oldRecords,
        updatedRecords: updatedRecords, // Return old records to the frontend
      });
    } catch (err) {
      console.error("Error updating data in TD_Procure:", err);
      return next(createError(500, "Internal Server Error"));
    }
  };



exports.RD_NAV_OD_Upd_Ref = async (req, res, next) => {
  try {
    // Execute the raw SQL query with a LEFT JOIN to check if TT_NAV_Od_CSV_Upd has data
    const result = await prisma.$queryRawUnsafe(`
      SELECT TD_Order.*, TD_Procure.*, TT_NAV_Pc_CSV_Upd.*
      FROM TD_Order 
      INNER JOIN TD_Procure 
        ON TD_Order.Order_No = TD_Procure.Order_No
      LEFT JOIN TT_NAV_Pc_CSV_Upd 
        ON TD_Procure.OdPcLn_No = TT_NAV_Pc_CSV_Upd.OdPcLn_No
      WHERE TT_NAV_Pc_CSV_Upd.OdPcLn_No IS NOT NULL;  -- Only include records where TT_NAV_Pc_CSV_Upd has matching data
    `);

    // Return the result to the client
    return res.status(200).json({
      status: "success",
      message: "Data fetched successfully!",
      data: result,
    });
  } catch (err) {
    // Log the error and return an internal server error
    console.error("Error fetching data:", err);
    return next(createError(500, "Internal Server Error"));
  }
};

