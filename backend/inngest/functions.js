import { Inngest } from "inngest";
import User from "../models/user.js";
import { sendMail } from "../utils/mailer.js";

export const inngest = new Inngest({ id: "my-app" });

const onUserSignUP = inngest.createFunction(
  { id: "on-user-signup", retries: 2 },
  { event: "user/signup" },
  async ({ event, step }) => {
    try {
      const email = event.data.email;
      await step.run("get-user", async () => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
      });

      await step.run("send-welcome-email", async () => {
        const subject = `Welcome to the app`;
        const message = `Hi,

Thanks for signing up. We're glad to have you onboard!`;
        await sendMail(email, subject, message);
      });

      return { success: true, message: "Welcome email sent successfully" };
    } catch (error) {
      console.error("Error in onUserSignUP function:", error);
      return { success: false, message: error.message };
    }
  }
);

export const functions = [onUserSignUP];
