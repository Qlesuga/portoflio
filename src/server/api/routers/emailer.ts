import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createTransport } from "nodemailer";
import { checkBotId } from "botid/server";
import { TRPCError } from "@trpc/server";

const transporter = createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: "contact@qles.dev",
    pass: process.env.EMIAL_PASSWORD,
  },
});

export const emailRouter = createTRPCRouter({
  sendEmial: publicProcedure
    .input(
      z.object({
        name: z.string().min(3),
        email: z.string().min(4).email(),
        message: z.string().min(10),
        language: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { isBot } = await checkBotId();
      console.log(isBot);

      if (isBot) {
        let message = "failed anti-bot detection";
        if (input.language == "pl") {
          message = "nieudana weryfikacja anty botowa";
        }
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: message,
        });
      }

      await transporter.sendMail({
        to: "contact@qles.dev",
        subject: `New Message on Portfolio from ${input.name}`,
        text: `emial:${input.email}\nMessage: ${input.message}`,
      });

      let subject_text = "Just a Quick Note to Say I Got Your Message";
      let response_text = `Thank you for contacting me,\n I will get back to you as soon as I can`;
      if (input.language == "pl") {
        subject_text = "Szybka notka że otrzymałem twój email";
        response_text = `Dziękuję za kontakt.\nOdezwę się tak szybko, jak to będzie możliwe.`;
      }

      await transporter.sendMail({
        from: `"Qles" <contact@qles.dev> `,
        to: input.email,
        subject: subject_text,
        text: response_text,
      });

      if (input.language == "pl") {
        return {
          message:
            "email został wysłany, możesz sprawdzić swojego maila jeżeli chcesz się upewnic",
        };
      }
      return {
        message: "mail sent, you can check your mail to be sure",
      };
    }),
});
