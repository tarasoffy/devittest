const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const request = require("supertest");
const app = require("../../src/app");

beforeAll(async () => {
    await prisma.user.create({
        data: {
            id: "1",
            name: "Test User",
            email: "test@example.com",
            balance: 1000
        }
    });

    await prisma.product.create({
        data: {
            id: "1",
            name: "Test Product",
            price: 100,
            stock: 10
        }
    });
});

afterAll(async () => {
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
});

test("POST /orders should not deduct stock if balance is insufficient", async () => {
    const res = await request(app).post("/api/orders").send({
        userId: "1",
        productId: "1",
        quantity: 5,
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Insufficient balance");

    const product = await prisma.product.findUnique({ where: { id: "1" } });
    expect(product.stock).toBe(10);
});