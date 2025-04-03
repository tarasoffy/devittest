const express = require("express");
const orderRoutes = require("./orderRoutes");
const productRoutes = require("./productRoutes");

const router = express.Router();

router.use("/orders", orderRoutes);
router.use("/products", productRoutes);

module.exports = router;