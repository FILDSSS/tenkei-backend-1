const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const createError = require("../utils/create-error");
const prisma = require("../models/prisma");

const sourceDir = 'C:/TENKEI/Purchase_CSV';
const destDir = 'C:/TENKEI/Purchase_CSV/BK';

// Function to parse date values
const parseDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  };
  
  exports.import_Purchase = async (req, res, next) => {
    try {
      const files = fs.readdirSync(sourceDir).filter((file) => file.endsWith(".csv"));
  
      const updatedData = [];
      const oldData = [];
  
      for (const file of files) {
        const filePath = path.join(sourceDir, file);
        const records = [];
  
        try {
          // Read and parse the CSV file
          await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
              .pipe(csvParser())
              .on("data", (row) => {
                records.push({
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
                  OdPc_No: `${row["Sales Order No_"]}${row["No_"]}`,
                  OdPcLn_No: `${row["Sales Order No_"]}${row["No_"]}${parseInt(row["Line No_"])}`,
                });
              })
              .on("end", resolve)
              .on("error", reject);
          });
        } catch (csvError) {
          console.error(`Error parsing CSV file ${file}:`, csvError);
          throw createError(500, `Error parsing CSV file ${file}`, csvError);
        }
  
        // Process records: Add new or update existing
        for (const record of records) {
          try {
            const existing = await prisma.tD_Procure.findUnique({ where: { OdPcLn_No: record.OdPcLn_No } });
  
            if (existing) {
              // Compare old data and new data
              const hasChanges = Object.keys(record).some((key) => {
                // Skip the comparison if the key is related to fields like OdPcLn_No
                if (key === 'OdPcLn_No') return false;
  
                // Compare old and new values
                return record[key] !== existing[key];
              });
  
              if (hasChanges) {
                // Update the record if changes are detected
                const updated = await prisma.tD_Procure.update({
                  where: { OdPcLn_No: record.OdPcLn_No },
                  data: {
                    ...record,
                    Pc_Upd_Date: new Date(),
                    Pc_Ans_Delivery: record.Pc_Ans_Delivery ? record.Pc_Ans_Delivery : null,
                    Pc_Arrival_Date: record.Pc_Arrival_Date ? record.Pc_Arrival_Date : null,
                  },
                });
                updatedData.push(updated);
                oldData.push(existing);  // Save the old data for comparison
              }
            } else {
              // If the record doesn't exist, create a new one
              await prisma.tD_Procure.create({ data: {...record,
                Pc_NAV_Reg_Date: new Date(),
                Pc_Upd_Date: new Date(),
              } });
            }
          } catch (prismaError) {
            console.error(`Error processing record ${record.OdPcLn_No}:`, prismaError);
            throw createError(500, `Error processing record ${record.OdPcLn_No}`, prismaError);
          }
        }
  
        // Move processed file to destination directory
        const destPath = path.join(destDir, file);
        fs.renameSync(filePath, destPath);
      }
  
      // Return response to frontend
      res.status(200).json({
        updated: updatedData,
        old: oldData,
        stage: updatedData.length > 0 ? "update" : "no-updates",
        mode:"Purchase"
      });
    } catch (err) {
      console.error("Error during CSV import:", err);
      next(createError(500, "Error importing CSV", err));
    }
  };  