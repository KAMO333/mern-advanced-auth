import { BrevoClient } from "@getbrevo/brevo";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { sender } from "./brevo.config.js";

// Initialize the single Brevo client with explicit API key check
const apiKey = process.env.BREVO_API_KEY;
if (!apiKey) {
  throw new Error("BREVO_API_KEY is not defined");
}

const client = new BrevoClient({ apiKey });

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string,
): Promise<void> => {
  try {
    const result = await client.transactionalEmails.sendTransacEmail({
      subject: "Verify your email",
      htmlContent: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken,
      ),
      sender: {
        name: sender.name,
        email: sender.email,
      },
      to: [{ email }],
    });

    console.log("Brevo API verification success:", JSON.stringify(result));
  } catch (error) {
    console.error("Brevo API verification error:", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (
  email: string,
  name: string,
): Promise<void> => {
  try {
    const result = await client.transactionalEmails.sendTransacEmail({
      subject: "Welcome to Auth Company",
      htmlContent: WELCOME_EMAIL_TEMPLATE.replace(/{name}/g, name),
      sender: { name: sender.name, email: sender.email },
      to: [{ email }],
    });
    console.log("Welcome email sent successfully:", JSON.stringify(result));
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string,
): Promise<void> => {
  try {
    const result = await client.transactionalEmails.sendTransacEmail({
      subject: "Reset your password",
      htmlContent: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetURL}",
        resetURL,
      ),
      sender: { name: sender.name, email: sender.email },
      to: [{ email }],
    });
    console.log(
      "Password reset email sent successfully:",
      JSON.stringify(result),
    );
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email: string): Promise<void> => {
  try {
    const result = await client.transactionalEmails.sendTransacEmail({
      subject: "Password Reset Successful",
      htmlContent: PASSWORD_RESET_SUCCESS_TEMPLATE,
      sender: { name: sender.name, email: sender.email },
      to: [{ email }],
    });
    console.log(
      "Reset success email sent successfully:",
      JSON.stringify(result),
    );
  } catch (error) {
    console.error("Error sending reset success email:", error);
    throw new Error(`Error sending reset success email: ${error}`);
  }
};
