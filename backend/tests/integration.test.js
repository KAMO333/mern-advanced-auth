import { jest } from "@jest/globals";

// Must be BEFORE any dynamic imports of modules that use emails.js
await jest.unstable_mockModule("../nodemailer/emails.js", () => ({
  sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
  sendWelcomeEmail: jest.fn().mockResolvedValue(undefined),
  sendPasswordResetEmail: jest.fn().mockResolvedValue(undefined),
  sendResetSuccessEmail: jest.fn().mockResolvedValue(undefined),
}));

// Dynamic imports AFTER mock registration - this is critical
const { app } = await import("../index.js");
const { User } = await import("../models/user.model.js");
const { connectTestDB, closeTestDB, clearTestDB } = await import("./setup.js");
const request = (await import("supertest")).default;

describe("Auth Integration - Signup Flow", () => {
  beforeAll(async () => {
    await connectTestDB();
  }, 60000);

  afterAll(async () => {
    await closeTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
  });

  test("Should register a user and hash their password", async () => {
    const userData = {
      email: "tester@johannesburg.com",
      password: "StrongPassword123!",
      name: "Kamo Tester",
    };

    const response = await request(app).post("/api/auth/signup").send(userData);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.user.email).toBe(userData.email);

    const savedUser = await User.findOne({ email: userData.email });
    expect(savedUser).toBeTruthy();
    expect(savedUser.name).toBe("Kamo Tester");
    expect(savedUser.password).not.toBe(userData.password);
  });

  test("Should fail if email already exists", async () => {
    await User.create({
      email: "duplicate@test.com",
      password: "password123",
      name: "Existing User",
    });

    const response = await request(app).post("/api/auth/signup").send({
      email: "duplicate@test.com",
      password: "newpassword123",
      name: "New User",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/User already exists/);
  });
});
