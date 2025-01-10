import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN || "4caa7aaef77df275d871f6efdcc43364",
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Kamogelo Mmopane",
};
