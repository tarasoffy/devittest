const orderService = require("../services/orderService");
const logger = require("../config/logger");

async function createOrder(req, res) {
  const { userId, productId, quantity } = req.body;

  try {
    const order = await orderService.createOrder(userId, productId, quantity);
    res.status(201).json(order);
  } catch (error) {
    logger.error(error.message);
    res.status(400).json({ error: error.message });
  }
}

async function getOrders(req, res) {
  const { userId } = req.params;

  try {
    const orders = await orderService.getOrdersByUser(userId);
    res.json(orders);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { createOrder, getOrders };
