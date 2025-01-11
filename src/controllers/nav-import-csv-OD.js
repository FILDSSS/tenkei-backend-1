const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const createError = require("../utils/create-error");
const prisma = require("../models/prisma");

const sourceDir = 'C:/TENKEI/Order_CSV';
const destDir = 'C:/TENKEI/Order_CSV/BK';

// Helper function to parse dates
function parseDate(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date) ? null : date;
}

// Refactored code with exports syntax
exports.import_order = async (req, res, next) => {
  try {
    const files = fs.readdirSync(sourceDir); // Read all files in the source directory

    const result = []; // To store the result of old and updated records
    const old =[];
    const updated=[];
    let hasUpdate = false; // Flag to track if any updates occurred

    for (const file of files) {
      const filePath = path.join(sourceDir, file);

      if (file.endsWith('.csv')) {
        const records = [];
        
        // Parse the CSV file
        const stream = fs.createReadStream(filePath).pipe(csvParser());
        for await (const row of stream) {
          // Map the CSV row to Prisma fields
          const orderData = {
            Order_No: row.Order_No,
            Request1_CD: String(row.Request1_CD),
            TM_Customer: {
              connect: {
                Customer_CD: row.Customer_CD,
              },
            },
            Sales_Person_CD: row.Sales_Person_CD,
            Order_Date: parseDate(row.Order_Date),
            Request_Delivery: parseDate(row.Request_Delivery),
            Od_Upd_Date: parseDate(row.Od_Upd_Date),
            TM_Item1: {
              connect: {
                Item1_CD: row.Item1_CD,
              },
            },
            NAV_Name: row.NAV_Name,
            NAV_Size: row.NAV_Size,
            Quantity: row.Quantity ? parseFloat(row.Quantity) : null,
            Unit_CD: row.Unit_CD,
            Unit_Price: row.Unit_Price ? parseFloat(row.Unit_Price) : null,
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
            //PO_No: row.PO_No,
          };

          records.push(orderData);
        }

        // Process each record
        for (const record of records) {
          const { Order_No } = record; // Get Order_No for checking existence

          // Check if the order already exists
          let existingOrder = await prisma.tD_Order.findUnique({
            where: { Order_No: Order_No },
          });



          if (existingOrder) {
            // Check if all values are the same, skip the update if no changes
            const isSame = Object.keys(record).every(key => {
              // Check for nested objects (e.g., TM_Customer, TM_Item1)
              if (typeof record[key] === 'object' && record[key] !== null) {
                // Compare nested objects if necessary
                return JSON.stringify(record[key]) === JSON.stringify(existingOrder[key]);
              }
              return record[key] === existingOrder[key];
            });
          
            if (isSame) {
              // Skip the update if no change
              console.log(`Skipping update for Order_No: ${Order_No} as no changes were made.`);
              continue; // Skip to the next record
            }
          
            // Update existing order if there are changes
            const updatedOrder = await prisma.tD_Order.update({
              where: { Order_No: Order_No },
              data: { ...record, // Spread the original record data
                Od_NAV_Upd_Date: new Date(),}
            });
          
            // Set the flag to true as an update occurred
            hasUpdate = true;
          
            // Only send the old and updated data when the status is "update"
            result.push({
              status: 'updated',
              
             
            });
            old.push({
            existingOrder
            });
            updated.push({updatedOrder
            })
          } else {
            // Insert new order
            const newOrder = await prisma.tD_Order.create({
              data: record,
            });

            // Send only the status when a new record is created
            result.push({
              status: 'on-update',
            });
          }
        }

        // Move processed file to backup folder
        const destPath = path.join(destDir, file);
        fs.renameSync(filePath, destPath);
      }
    }

    // Set stage to 'update' if any update occurred, otherwise set it to 'create'
    const stage = hasUpdate ? 'update' : 'create';

    // Return the result to the frontend
    res.status(200).json({
      old:old,
      updated:updated,
      success: true,
      data: result, 
      stage: stage,
      mode:"Order" // Set 'update' if updates occurred, else 'create'
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    const err = createError(500, 'An error occurred while importing orders.');
    res.status(err.statusCode).json({ message: err.message });
  }
};
