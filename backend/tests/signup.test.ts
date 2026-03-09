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

describe("Auth - Signup & Verification", () => {
  beforeAll(async () => await connectTestDB(), 30000);
  afterAll(async () => await closeTestDB());
  beforeEach(async () => await clearTestDB());

  test("Should register a user successfully", async () => {
    const userData = {
      email: "new@test.com",
      password: "Password123!",
      name: "New User",
    };
    const response = await request(app).post("/api/auth/signup").send(userData);
    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe(userData.email);
  });

  test("Should verify email with valid code", async () => {
    await User.create({
      email: "verify@test.com",
      password: "password123",
      name: "Verify Me",
      verificationToken: "123456",
      verificationTokenExpiresAt: new Date(Date.now() + 3600000),
    });

    const response = await request(app)
      .post("/api/auth/verify-email")
      .send({ code: "123456" });
    expect(response.status).toBe(200);
    expect(response.body.user.isVerified).toBe(true);
  });
});
