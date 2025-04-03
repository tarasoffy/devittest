const request = require("supertest");
const app = require("../../src/app");

test("API should return 429 after exceeding request limit", async () => {
    for (let i = 0; i < 11; i++) {
      await request(app).get("/products");
    }
  
    const res = await request(app).get("/products");
    expect(res.status).toBe(429);
    expect(res.body.message).toBe("Too many requests, please try again later.");
  });  