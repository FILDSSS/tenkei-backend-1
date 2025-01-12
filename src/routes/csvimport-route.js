const express = require("express");
const pcImport = require("../controllers/nav-import-csv-PC");
const OdImport = require("../controllers/nav-import-csv-OD");
const router = express.Router();

router.post("/Import_Order", OdImport.import_order);
router.post("/Import_Purchase", pcImport.import_Purchase);

module.exports = router;