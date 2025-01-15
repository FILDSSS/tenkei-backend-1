const express = require("express");
const NavODCsvController = require("../controllers/nav-Order-csv-import-controller");
const Od_pg = require("../controllers/nav-od-pg");


const router = express.Router();

// router.get("/fetch-nav-order-csv-upd", NavODCsvController.fetchtt_OD_csv_upd);
// router.get("/fetch-nav-order-csv", NavODCsvController.fetchtt_OD_csv);

// router.post("/TT_NAV_Od_CSV", NavODCsvController.TT_NAV_OD_CSV);
// router.post("/QT_NAV_Od_CSV_Upd_Add", NavODCsvController.QT_NAV_OD_CSV_Upd_Add);
// router.post("/QT_NAV_od_CSV_Upd_Upd", NavODCsvController.QT_NAV_OD_CSV_Upd_Upd);
// router.post("/QT_NAV_Od_CSV_Add", NavODCsvController.QT_NAV_OD_CSV_Add);
// router.post("/QT_NAV_Pc_CSV_Upd_Ref", NavODCsvController.QT_NAV_OD_CSV_Upd_Ref);
// router.get("/RD_NAV_Pc_Upd_Ref", NavODCsvController.RD_NAV_OD_Upd_Ref)

router.post("/import_order", Od_pg.import_order);


module.exports = router;