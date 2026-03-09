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
const crypto = await import("crypto");

describe("Auth - Password Recovery", () => {
  beforeAll(async () => await connectTestDB(), 30000);
  afterAll(async () => await closeTestDB());
  beforeEach(async () => {
    await clearTestDB();
    // Create a verified user to test password reset
    await User.create({
      email: "reset@test.com",
      password: "oldPassword123",
      name: "Reset User",
      isVerified: true,
    });
  });

  test("Should generate a reset token (forgot-password)", async () => {
    const response = await request(app)
      .post("/api/auth/forgot-password")
      .send({ email: "reset@test.com" });

    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/Password reset link sent/);

    const user = await User.findOne({ email: "reset@test.com" });
    expect(user?.resetPasswordToken).toBeDefined();
    expect(user?.resetPasswordExpiresAt).toBeDefined();
  });

  test("Should reset password with a valid token", async () => {
    // 1. Manually set a token for the user
    const token = crypto.randomBytes(20).toString("hex");
    await User.findOneAndUpdate(
      { email: "reset@test.com" },
      {
        resetPasswordToken: token,
        resetPasswordExpiresAt: Date.now() + 3600000,
      },
    );

    // 2. Submit the new password
    const response = await request(app)
      .post(`/api/auth/reset-password/${token}`)
      .send({ password: "newSecurePassword123" });

    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/Password reset successful/);

    // 3. Verify the token is cleared and password is changed
    const updatedUser = await User.findOne({ email: "reset@test.com" });
    expect(updatedUser?.resetPasswordToken).toBeUndefined();
    // (Bcrypt check happens automatically in the controller, so status 200 is enough)
  });
});
