const productService = require("../services/productService");
const logger = require("../config/logger");

async function getProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Product error" });
  }
}

module.exports = { getProducts };
