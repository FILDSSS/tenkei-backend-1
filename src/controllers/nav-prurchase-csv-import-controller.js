const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const createError = require("../utils/create-error");
const prisma = require("../models/prisma");




exports.fetchtt_purchase_csv_upd = async (req, res, next) => {
  try {
    const NAVPCUPD = await prisma.tT_NAV_Pc_CSV_Upd.findMany();

    return res.status(200).json({
      status: "success",
      data: {
        NAVPCUPD: NAVPCUPD,
      },
    });
  } catch (err) {
    console.error("Error searching NAVPCUPD:", err);
    return next(createError(500, "Internal Server Error"));
  }
};

exports.fetchtt_purchase_csv = async (req, res, next) => {
  try {
    const NAVPC = await prisma.tT_NAV_Pc_CSV.findMany();

    return res.status(200).json({
      status: "success",
      data: {
        NAVPC: NAVPC,
      },
    });
  } catch (err) {
    console.error("Error searching NAVPC:", err);
    return next(createError(500, "Internal Server Error"));
  }
};




exports.TT_NAV_PC_CSV = async (req, res, next) => {
  try {
    // await prisma.tT_NAV_Pc_CSV_Upd.deleteMany();
    await prisma.tT_NAV_Pc_CSV.deleteMany();
    await prisma.tT_NAV_Pc_CSV_Upd.deleteMany();
    const sourceDir = 'C:/TENKEI/Purchase_CSV';
    const destDir = 'C:/TENKEI/Purchase_CSV/BK';
    
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
        fs.createReadStream(destPath)
          .pipe(csvParser())
          .on('data', (row) => {
            results.push({
              Procure_No: row["No_"],
              Vendor_CD: row["Buy-from Vendor No_"],
              Pc_Date: parseDate(row["Order Date"]),
              Pc_Line_No: parseInt(row["Line No_"]),
              Order_No: row["Sales Order No_"],
              Pc_Name: row["Description"],
              Pc_Material: row["Description 2"],
              Unit_Price: parseFloat(row["Direct Unit Cost"]),
              Pc_Qty: parseFloat(row["Quantity"]),
              Pc_Unit_CD: row["Unit of Measure Code"],
              Pc_Person_CD: row["Purchaser Code"],
              Pc_Req_Delivery: parseDate(row["Expected Receipt Date"]),
              Pc_Ans_Delivery: parseDate(row["Vendor Confirm Delivery Date"]),
              Pc_Arrival_Date: parseDate(row["Date Received"]),
              Pc_Arrival_Qty: parseFloat(row["Quantity Received"]),
              Pc_NAV_Reg_Date: parseDate(row["Insert Date"]),
              Pc_NAV_Upd_Date: parseDate(row["Modify Date"]),
              Pc_Progress_CD: row["Flag"],
              OdPc_No: `${row["Sales Order No_"]}${row["No_"]}`, // Concatenate Order_No and Procure_No
              OdPcLn_No: `${row["Sales Order No_"]}${row["No_"]}${parseInt(row["Line No_"])}`,
            });
          })
          .on('end', async () => {
            try {
              // Use Prisma to save all rows to the database
              await prisma.tT_NAV_Pc_CSV.createMany({
                data: results,
              });
             
              console.log('CSV records saved successfully.');
            } catch (err) {
              console.error('Error saving records to the database', err);
              return next(createError(500, 'Internal Server Error'));
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

exports.QT_NAV_Pc_CSV_Upd_Add = async (req, res, next) => {
  try {
    // Step 1: Fetch data with INNER JOIN
    const data = await prisma.tT_NAV_Pc_CSV.findMany({
      include: {
        // Include related fields if necessary
      },
    });

    // Step 2: Insert each row of data into TT_NAV_Pc_CSV_Upd
    for (const row of data) {
      // Check if the record already exists in TT_NAV_Pc_CSV_Upd using findFirst
      const existingRecord = await prisma.tT_NAV_Pc_CSV_Upd.findUnique({
        where: {
          OdPcLn_No: row.OdPcLn_No,  // Use OdPcLn_No or any unique identifier
        },
      });

      // If the record exists, reject the insertion and return an error
      if (existingRecord) {
        return res.status(400).json({
          status: "error",
          message: `Record with OdPcLn_No ${row.OdPcLn_No} already exists in TT_NAV_Pc_CSV_Upd, cannot insert duplicate data.`,
        });
      }

      // If no existing record, proceed with the insert
      await prisma.tT_NAV_Pc_CSV_Upd.create({
        data: {
          Procure_No: row.Procure_No,
          Vendor_CD: row.Vendor_CD,
          Pc_Date: row.Pc_Date,
          Pc_Line_No: row.Pc_Line_No,
          Order_No: row.Order_No,
          Pc_Name: row.Pc_Name,
          Pc_Material: row.Pc_Material,
          Unit_Price: row.Unit_Price,
          Pc_Qty: row.Pc_Qty,
          Pc_Unit_CD: row.Pc_Unit_CD,
          Pc_Person_CD: row.Pc_Person_CD,
          Pc_Req_Delivery: row.Pc_Req_Delivery,
          Pc_Ans_Delivery: row.Pc_Ans_Delivery,
          Pc_Arrival_Date: row.Pc_Arrival_Date,
          Pc_Arrival_Qty: row.Pc_Arrival_Qty,
          Pc_NAV_Reg_Date: row.Pc_NAV_Reg_Date,
          Pc_NAV_Upd_Date: row.Pc_NAV_Upd_Date,
          Pc_Progress_CD: row.Pc_Progress_CD,
          OdPc_No: row.OdPc_No,
          OdPcLn_No: row.OdPcLn_No,
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

exports.QT_NAV_Pc_CSV_Upd_Upd = async (req, res, next) => {
  try {
    // Step 1: Fetch all data from TT_NAV_Pc_CSV
    const data = await prisma.tT_NAV_Pc_CSV.findMany();

    // Step 2: Process updates and inserts
    const operations = data.map(async (row) => {
      // Validate required field
      if (!row.OdPcLn_No) {
        console.warn("Missing OdPcLn_No for row:", row);
        return null;
      }

      try {
        // Check if record exists
        const existingRecord = await prisma.tT_NAV_Pc_CSV_Upd.findUnique({
          where: { OdPcLn_No: row.OdPcLn_No },
        });

        if (existingRecord) {
          // Update existing record
          return prisma.tT_NAV_Pc_CSV_Upd.update({
            where: { OdPcLn_No: row.OdPcLn_No },
            data: {
              Procure_No: row.Procure_No,
              Vendor_CD: row.Vendor_CD,
              Pc_Date: row.Pc_Date,
              Pc_Line_No: row.Pc_Line_No,
              Order_No: row.Order_No,
              Pc_Name: row.Pc_Name,
              Pc_Material: row.Pc_Material,
              Unit_Price: row.Unit_Price,
              Pc_Qty: row.Pc_Qty,
              Pc_Unit_CD: row.Pc_Unit_CD,
              Pc_Person_CD: row.Pc_Person_CD,
              Pc_Req_Delivery: row.Pc_Req_Delivery,
              Pc_Ans_Delivery: row.Pc_Ans_Delivery,
              Pc_Arrival_Date: row.Pc_Arrival_Date,
              Pc_Arrival_Qty: row.Pc_Arrival_Qty,
              Pc_NAV_Reg_Date: row.Pc_NAV_Reg_Date,
              Pc_NAV_Upd_Date: row.Pc_NAV_Upd_Date,
              Pc_Progress_CD: row.Pc_Progress_CD,
              OdPc_No: row.OdPc_No,
            },
          });
        } else {
          // Insert new record
          console.log("pass");
        }
      } catch (err) {
        console.error(`Error processing row with OdPcLn_No: ${row.OdPcLn_No}`, err);
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


exports.QT_NAV_Pc_CSV_Add = async (req, res, next) => {
  try {
    // Step 1: Fetch the data using an INNER JOIN between TT_NAV_Pc_CSV and TD_Procure
    const data = await prisma.tT_NAV_Pc_CSV.findMany({
      include: {
        // Include any related fields from the TD_Procure table if necessary
      },
    });

    console.log("Query Result:", data);

    // Step 2: Insert only new records into TD_Procure
    const insertPromises = data.map(async (row) => {
      try {
        // Check if the record already exists in TD_Procure
        const existingRecord = await prisma.tD_Procure.findUnique({
          where: { OdPcLn_No: row.OdPcLn_No },
        });

        if (existingRecord) {
          // If the record exists, skip the insertion
          console.log(`Record with OdPcLn_No ${row.OdPcLn_No} already exists, skipping insert.`);
          return null; // Or handle as needed (e.g., reject or log)
        }

        // If the record doesn't exist, insert it into TD_Procure
        return prisma.tD_Procure.create({
          data: {
            Procure_No: row.Procure_No,
            Vendor_CD: row.Vendor_CD,
            Pc_Date: row.Pc_Date,
            Pc_Line_No: row.Pc_Line_No,
            Order_No: row.Order_No,
            Pc_Name: row.Pc_Name,
            Pc_Material: row.Pc_Material,
            Unit_Price: row.Unit_Price,
            Pc_Qty: row.Pc_Qty,
            Pc_Unit_CD: row.Pc_Unit_CD,
            Pc_Person_CD: row.Pc_Person_CD,
            Pc_Req_Delivery: row.Pc_Req_Delivery,
            Pc_Ans_Delivery: row.Pc_Ans_Delivery,
            Pc_Arrival_Date: row.Pc_Arrival_Date,
            Pc_Arrival_Qty: row.Pc_Arrival_Qty,
            Pc_NAV_Reg_Date: row.Pc_NAV_Reg_Date,
            Pc_NAV_Upd_Date: row.Pc_NAV_Upd_Date,
            Pc_Progress_CD: row.Pc_Progress_CD,
            OdPc_No: row.OdPc_No,
            OdPcLn_No: row.OdPcLn_No,
          }
        });
      } catch (error) {
        console.error("Error inserting row:", row, error);
        throw new Error("Failed to insert row with OdPcLn_No: " + row.OdPcLn_No);
      }
    });

    // Filter out null values (skipped inserts) and wait for all insert promises to complete
    const insertedRecords = await Promise.all(insertPromises);
    const newRecords = insertedRecords.filter(record => record !== null);

    // Step 3: Fetch the most recent record from TD_Procure
    const recentRecord = await prisma.tD_Procure.findFirst({
      orderBy: {
        Pc_NAV_Upd_Date: 'desc', // Assuming Pc_NAV_Upd_Date to determine the most recent record
      },
    });

    // Log the most recent record
    console.log('Most recent record inserted into TD_Procure:', recentRecord);

    // Step 4: Return success response with the most recent record and the new records
    return res.status(200).json({
      status: "success",
      message: "Data inserted successfully into TD_Procure!",
      newRecords: newRecords,  // Include only new records that were inserted
      recentRecord: recentRecord,  // Include the most recent record in the response
    });
  } catch (err) {
    console.error("Error inserting data into TD_Procure:", err);
    return next(createError(500, "Internal Server Error"));
  }
};



exports.QT_NAV_Pc_CSV_Upd_Ref = async (req, res, next) => {
  try {
    // Step 1: Fetch the necessary data from TT_NAV_Pc_CSV_Upd and TD_Procure by joining these tables
    const dataToUpdate = await prisma.tT_NAV_Pc_CSV_Upd.findMany({
      where: {
        OdPcLn_No: {
          in: await prisma.tD_Procure.findMany({
            select: {
              OdPcLn_No: true,
            },
          }).then((rows) => rows.map((row) => row.OdPcLn_No)),
        },
      },
      select: {
        OdPcLn_No: true,
        Order_No: true,
        Procure_No: true,
        OdPc_No: true,
        Vendor_CD: true,
        Pc_Name: true,
        Pc_Material: true,
        Unit_Price: true,
        Pc_Qty: true,
        Pc_Unit_CD: true,
        Pc_Person_CD: true,
        Pc_Date: true,
        Pc_Req_Delivery: true,
        Pc_Ans_Delivery: true,
        Pc_Progress_CD: true,
        Pc_Arrival_Date: true,
        Pc_Arrival_Qty: true,
        Pc_NAV_Reg_Date: true,
        Pc_NAV_Upd_Date: true,
        Pc_Line_No: true,
      },
    });

    // Step 2: Fetch the old records from TD_Procure before updating
    const oldRecords = await prisma.tD_Procure.findMany({
      where: {
        OdPcLn_No: {
          in: dataToUpdate.map((row) => row.OdPcLn_No),
        },
      },
    });

    // Step 3: Update the TD_Procure table using the fetched data
    const updatePromises = dataToUpdate.map((row) => {
      return prisma.tD_Procure.update({
        where: { OdPcLn_No: row.OdPcLn_No },
        data: {
          Order_No: row.Order_No,
          Procure_No: row.Procure_No,
          OdPc_No: row.OdPc_No,
          Vendor_CD: row.Vendor_CD,
          Pc_Name: row.Pc_Name,
          Pc_Material: row.Pc_Material,
          Unit_Price: row.Unit_Price,
          Pc_Qty: row.Pc_Qty,
          Pc_Unit_CD: row.Pc_Unit_CD,
          Pc_Person_CD: row.Pc_Person_CD,
          Pc_Date: row.Pc_Date,
          Pc_Req_Delivery: row.Pc_Req_Delivery,
          Pc_Ans_Delivery: row.Pc_Ans_Delivery,
          Pc_Progress_CD: row.Pc_Progress_CD,
          Pc_Arrival_Date: row.Pc_Arrival_Date,
          Pc_Arrival_Qty: row.Pc_Arrival_Qty,
          Pc_Upd_Date: new Date(), // Setting the update date to current time
          Pc_NAV_Reg_Date: row.Pc_NAV_Reg_Date,
          Pc_NAV_Upd_Date: row.Pc_NAV_Upd_Date,
          Pc_Line_No: row.Pc_Line_No,
        },
      });
    });

    // Step 4: Wait for all update operations to complete
    await Promise.all(updatePromises);

    // Step 5: Send old records to the frontend along with success message
    return res.status(200).json({
      status: "success",
      message: "Data updated successfully in TD_Procure!",
      oldRecords: oldRecords, // Return old records to the frontend
    });
  } catch (err) {
    console.error("Error updating data in TD_Procure:", err);
    return next(createError(500, "Internal Server Error"));
  }
};



exports.RD_NAV_Pc_Upd_Ref = async (req, res, next) => {
  try {
    // Execute the raw SQL query
    const result = await prisma.$queryRawUnsafe(`
      SELECT TD_Order.*, TD_Procure.*, TT_NAV_Pc_CSV_Upd.*
      FROM TD_Order 
      INNER JOIN (TD_Procure 
        INNER JOIN TT_NAV_Pc_CSV_Upd 
        ON TD_Procure.OdPcLn_No = TT_NAV_Pc_CSV_Upd.OdPcLn_No
      ) ON TD_Order.Order_No = TD_Procure.Order_No;
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



exports.import_purchase = async (req, res, next) => {
  try {
   

    // Step 1: 
    console.log("Processing NAV_Pc_CSV files...");
    await exports.TT_NAV_PC_CSV(req, res, next);

    // Step 2: 
    console.log("Adding NAV_Pc_CSV data to NAV_Pc_CSV_Upd...");
    await exports.QT_NAV_Pc_CSV_Upd_Add(req, res, next);
   

    // Step 3: 
    console.log("Adding NAV_Pc_CSV data to NAV_Pc_CSV_Upd...");
    await  exports.QT_NAV_Pc_CSV_Upd_Upd(req, res, next);

    // Step 4: 
    console.log("Adding NAV_Pc_CSV data to NAV_Pc_CSV_Upd...");
    await  exports.QT_NAV_Pc_CSV_Add(req, res, next);

    // Step 4: 
    console.log("Adding NAV_Pc_CSV data to NAV_Pc_CSV_Upd...");
    await  exports.QT_NAV_Pc_CSV_Upd_Ref(req, res, next);


    // Final success response
    return res.status(200).json({
      status: "success",
      message: "All functions executed successfully.",
    });
  } catch (error) {
    console.error("Error in import_purchase:", error);
    return next(createError(500, "Internal Server Error"));
  }
};





