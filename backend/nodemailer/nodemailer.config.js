import dotenv from "dotenv";

dotenv.config();

// We only need the sender info and export the API key for emails.js
export const sender = {
  email: process.env.EMAIL_USER, // Ensure this is your verified Brevo sender email
  name: "Kamogelo Mmopane",
};
