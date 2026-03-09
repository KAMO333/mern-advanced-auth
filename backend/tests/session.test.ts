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

describe("Auth - Session & Middleware", () => {
  beforeAll(async () => await connectTestDB(), 30000);
  afterAll(async () => await closeTestDB());
  beforeEach(async () => await clearTestDB());

  test("Should logout successfully by clearing the cookie", async () => {
    const response = await request(app).post("/api/auth/logout");
    expect(response.status).toBe(200);
    expect(response.headers["set-cookie"][0]).toMatch(/token=;/);
  });

  test("Should verify a user is authenticated (check-auth)", async () => {
    const hashedPassword = await bcrypt.default.hash("password123", 10);
    await User.create({
      email: "check@test.com",
      password: hashedPassword,
      name: "Check User",
      isVerified: true,
    });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "check@test.com", password: "password123" });

    const response = await request(app)
      .get("/api/auth/check-auth")
      .set("Cookie", loginRes.headers["set-cookie"]);

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe("check@test.com");
  });
});
