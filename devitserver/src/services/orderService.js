const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createOrder(userId, productId, quantity) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Product not found");

  if (product.stock < quantity) throw new Error("Insufficient stock");

  const totalPrice = product.price * quantity;
  if (user.balance < totalPrice) throw new Error("Insufficient balance");

  return await prisma.$transaction(async (prisma) => {
    await prisma.user.update({
      where: { id: userId },
      data: { balance: user.balance - totalPrice }
    });

    await prisma.product.update({
      where: { id: productId },
      data: { stock: product.stock - quantity }
    });

    return prisma.order.create({
      data: { userId, productId, quantity, totalPrice }
    });
  });
}

async function getOrdersByUser(userId) {
  return prisma.order.findMany({
    where: { userId },
    include: { product: true },
  });
}

module.exports = { createOrder, getOrdersByUser };
