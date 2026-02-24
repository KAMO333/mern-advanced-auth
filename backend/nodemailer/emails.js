import { BrevoClient } from "@getbrevo/brevo"; // Standard for v4.x
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { sender } from "./nodemailer.config.js";

// Initialize the single Brevo client
const client = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

export const sendVerificationEmail = async (email, verificationToken) => {
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
      to: [{ email: email }],
    });

    console.log("Brevo API success:", JSON.stringify(result));
  } catch (error) {
    console.error("Brevo API error:", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const result = await client.transactionalEmails.sendTransacEmail({
      subject: "Welcome to Auth Company",
      htmlContent: WELCOME_EMAIL_TEMPLATE.replace(/{name}/g, name),
      sender: { name: sender.name, email: sender.email },
      to: [{ email: email }],
    });
    console.log("Welcome email sent successfully:", JSON.stringify(result));
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const result = await client.transactionalEmails.sendTransacEmail({
      subject: "Reset your password",
      htmlContent: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetURL}",
        resetURL,
      ),
      sender: { name: sender.name, email: sender.email },
      to: [{ email: email }],
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

export const sendResetSuccessEmail = async (email) => {
  try {
    const result = await client.transactionalEmails.sendTransacEmail({
      subject: "Password Reset Successful",
      htmlContent: PASSWORD_RESET_SUCCESS_TEMPLATE,
      sender: { name: sender.name, email: sender.email },
      to: [{ email: email }],
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
