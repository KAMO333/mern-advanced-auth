import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

describe("Auth Core Logic Tests", () => {
  // 1. Token Logic Test
  test("Token Logic: Should be a function", () => {
    expect(typeof generateTokenAndSetCookie).toBe("function");
  });

  // 2. Password Hashing Test
  test("Password Hashing: Should correctly scramble and verify passwords", async () => {
    const password = "SecurePassword123";
    const salt = await bcryptjs.genSalt(10);
    const hashed = await bcryptjs.hash(password, salt);

    expect(hashed).not.toBe(password);
    const isMatch = await bcryptjs.compare(password, hashed);
    expect(isMatch).toBe(true);
  });

  // 3. Email Validation Logic
  test("Email Validation: Should identify invalid email formats", () => {
    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
    expect(validateEmail("kamogelo@example.com")).toBe(true);
    expect(validateEmail("invalid-email")).toBe(false);
  });

  // 4. Crypto Reset Token Test
  test("Reset Token Logic: Should generate a 40-character hex string", () => {
    const resetToken = crypto.randomBytes(20).toString("hex");
    expect(resetToken).toHaveLength(40);
    expect(/^[0-9a-fA-F]+$/.test(resetToken)).toBe(true);
  });
});
