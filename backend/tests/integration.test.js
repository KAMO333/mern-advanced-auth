import request from "supertest";
import { app } from "../index.js";
import { User } from "../models/user.model.js";
import { connectTestDB, closeTestDB, clearTestDB } from "./setup.js";

describe("Auth Integration - Signup Flow", () => {
  // Give the setup 60 seconds
  beforeAll(async () => {
    await connectTestDB();
  }, 60000);

  // Give the teardown 10 seconds
  afterAll(async () => {
    await closeTestDB();
  }, 10000);

  // Give the clear 10 seconds
  afterEach(async () => {
    await clearTestDB();
  }, 10000);

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
