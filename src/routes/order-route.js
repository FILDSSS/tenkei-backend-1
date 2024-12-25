const express = require("express");
const tdOrderController = require("../controllers/td-order-controller");
const router = express.Router();

router.get("/td-orders", tdOrderController.fetchOrders);
router.get("/workerG", tdOrderController.tm_workerg);
router.get("/worker", tdOrderController.tm_worker);
router.put("/update-worker", tdOrderController.updateWorker);
router.get("/request1", tdOrderController.tm_request1);
router.get("/request2", tdOrderController.tm_request2);
router.get("/request3", tdOrderController.tm_request3);
router.get("/customer", tdOrderController.tm_customer);
router.put("/update-customer", tdOrderController.updateCustomer);
router.post("/search-order", tdOrderController.Search_Order_No_AfterUpdate);
router.post("/search-cal", tdOrderController.Search_Order_No_AfterUpdate2);
router.put("/edit-order", tdOrderController.editOrder);
router.delete("/delete-order", tdOrderController.deleteOrder);
router.post("/add-order", tdOrderController.createOrder);
router.post("/update-calc", tdOrderController.editCalc);

module.exports = router;