require("dotenv").config();
const express = require('express');
const authRoute = require("./src/routes/auth-route");
const orderRoute = require("./src/routes/order-route");
const orderlistRoute = require("./src/routes/orderlist-route");
const planRoute = require("./src/routes/plan-route");
const costRoute = require("./src/routes/cost-route");
const procureRoute = require("./src/routes/procure-route");
const coatingRoute = require("./src/routes/coating-route");
const item1Route = require("./src/routes/item1-route");
const supplyRoute = require("./src/routes/supply-route");
const targetRoute = require("./src/routes/target-route");
const unitRoute = require("./src/routes/unit-route");
const workgRoute = require("./src/routes/workg-route");
const deliveryRoute = require("./src/routes/delivery-route");
const ContractDocuRoute = require("./src/routes/contractdocu-route");
const odquoteRoute = require("./src/routes/odquote-route");
const odprogressRoute = require("./src/routes/odprogress-route");
const priceRoute = require("./src/routes/price-route");
const specificRoute = require("./src/routes/specific-route");
const vendorRoute = require("./src/routes/vendor-route");
const inoutsideRoute = require("./src/routes/inoutside-route");
const pcprogressRoute = require("./src/routes/pcprogress-route");
const scheduleRoute = require("./src/routes/schedule-route");
const partsRoute = require("./src/routes/parts-route");
const navfgRoute = require("./src/routes/navfg-route");
const navwiRoute = require("./src/routes/navwi-route");
const processRoute = require("./src/routes/process-route");
const plprogressRoute = require("./src/routes/plprogress-route");
const setRoute = require("./src/routes/set-route");
const processgRoute = require("./src/routes/processg-route");
const resourceRoute = require("./src/routes/resource-route");
const resultRoute = require("./src/routes/result-route");
const csprogressRoute = require("./src/routes/csprogress-route");
const ppcRoute = require("./src/routes/planppc-route");
const costlistRoute = require("./src/routes/costlist-route");
const holidayRoute = require("./src/routes/holiday-route");
const logger = require('./src/middlewares/logger');

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(logger); // Apply the logger middleware


app.use('/auth', authRoute);
app.use('/order', orderRoute);
app.use('/orderlist', orderlistRoute);
app.use('/plan', planRoute);
app.use('/procure', procureRoute);
app.use('/coating', coatingRoute);
app.use('/item1', item1Route);
app.use('/supply', supplyRoute);
app.use('/target', targetRoute);
app.use('/unit', unitRoute);
app.use('/workg', workgRoute);
app.use('/docu', ContractDocuRoute);
app.use('/delivery', deliveryRoute);
app.use('/odquote', odquoteRoute);
app.use('/odprogress', odprogressRoute);
app.use('/price', priceRoute);
app.use('/specific', specificRoute);
app.use('/vendor', vendorRoute);
app.use('/inoutside', inoutsideRoute);
app.use('/pcprogress', pcprogressRoute);
app.use('/schedule', scheduleRoute);
app.use('/parts', partsRoute);
app.use('/navfg', navfgRoute);
app.use('/navwi', navwiRoute);
app.use('/process', processRoute);
app.use('/plprogress', plprogressRoute);
app.use('/set', setRoute);
app.use('/processg', processgRoute);
app.use('/resource', resourceRoute);
app.use('/result', resultRoute);
app.use('/cost', costRoute);
app.use('/csprogress', csprogressRoute);
app.use('/planppc', ppcRoute);
app.use('/costlist', costlistRoute);
app.use('/holiday', holidayRoute);
const PORT = process.env.PORT || "4000";
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));

module.exports = app;