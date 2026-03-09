import { jest } from "@jest/globals";
import type { Express } from "express";

await jest.unstable_mockModule("../mail/emails.js", () => ({
  sendVerificationEmail: jest
    .fn<() => Promise<void>>()
    .mockResolvedValue(undefined),
  sendWelcomeEmail: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
  sendPasswordResetEmail: jest
    .fn<() => Promise<void>>()
    .mockResolvedValue(undefined),
  sendResetSuccessEmail: jest
    .fn<() => Promise<void>>()
    .mockResolvedValue(undefined),
}));

const { app } = (await import("../index.js")) as { app: Express };
const { User } = await import("../models/user.model.js");
const { connectTestDB, closeTestDB, clearTestDB } = await import("./setup.js");
const request = (await import("supertest")).default;
const bcrypt = await import("bcryptjs");

describe("Auth - Login Logic", () => {
  beforeAll(async () => await connectTestDB(), 30000);
  afterAll(async () => await closeTestDB());
  beforeEach(async () => {
    await clearTestDB();
    const hashedPassword = await bcrypt.default.hash("password123", 10);
    await User.create({
      email: "login@test.com",
      password: hashedPassword,
      name: "User",
      isVerified: true,
    });
  });

  test("Should login successfully", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "login@test.com", password: "password123" });
    expect(response.status).toBe(200);
    expect(response.headers["set-cookie"]).toBeDefined();
  });

  test("Should fail with incorrect password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "login@test.com", password: "wrong" });
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/Incorrect password/);
  });
});
