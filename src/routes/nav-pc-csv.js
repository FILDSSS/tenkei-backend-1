const express = require("express");
const NavPCCsvController = require("../controllers/nav-prurchase-csv-import-controller");
const pg = require("../controllers/nav-pc-pg");


const router = express.Router();

// router.get("/fetch-nav-order-csv-upd", NavPCCsvController.fetchtt_purchase_csv);
// router.get("/fetch-nav-order-csv", NavPCCsvController.fetchtt_purchase_csv);

// router.post("/TT_NAV_Pc_CSV", NavPCCsvController.TT_NAV_PC_CSV);
// router.post("/QT_NAV_Pc_CSV_Upd_Add", NavPCCsvController.QT_NAV_Pc_CSV_Upd_Add);
// router.post("/QT_NAV_Pc_CSV_Upd_Upd", NavPCCsvController.QT_NAV_Pc_CSV_Upd_Upd);
// router.post("/QT_NAV_Pc_CSV_Add", NavPCCsvController.QT_NAV_Pc_CSV_Add);
// router.post("/QT_NAV_Pc_CSV_Upd_Ref", NavPCCsvController.QT_NAV_Pc_CSV_Upd_Ref);
// router.post("/import_CSV_PC", NavPCCsvController.import_purchase);
router.post("/import_CSV_Purchase", pg.importCsv);


router.get("/RD_NAV_Pc_Upd_Ref", NavPCCsvController.RD_NAV_Pc_Upd_Ref);  


module.exports = router;