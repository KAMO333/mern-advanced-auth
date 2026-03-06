import dotenv from "dotenv";

dotenv.config();

// 1. Define a Type for your sender to ensure data integrity
interface EmailSender {
  email: string;
  name: string;
}

// 2. Validate environment variables at startup
const emailUser = process.env.EMAIL_USER;

if (!emailUser) {
  throw new Error(
    "EMAIL_USER is not defined in the environment variables. Please check your .env file.",
  );
}

export const sender: EmailSender = {
  email: emailUser,
  name: "Kamogelo Mmopane",
};

// 3. Export the API key directly so emails.ts can use it with the Brevo SDK
export const BREVO_API_KEY = process.env.BREVO_API_KEY;
