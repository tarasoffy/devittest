const request = require("supertest");
const app = require("../../src/app");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.user.create({
    data: {
        id: "1",
        balance: 1000,
        name: "Test User",
        email: "test@example.com"
    }
    });
  await prisma.product.create({
    data: { id: "1", price: 100, stock: 10, name: "Test Product"},
  });
});

afterAll(async () => {
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

test("POST /orders should create an order", async () => {
  const res = await request(app).post("/api/orders").send({
    userId: "1",
    productId: "1",
    quantity: 2,
  });

  expect(res.status).toBe(201);
  expect(res.body.totalPrice).toBe(200);
});

test("GET /orders/:userId should return orders for a user", async () => {
  const res = await request(app).get("/api/orders/1");
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});