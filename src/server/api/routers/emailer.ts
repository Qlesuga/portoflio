import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createTransport } from "nodemailer";
import { TRPCError } from "@trpc/server";

type hCatpchaVerificationResponse = {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  credit: boolean;
};

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
        captchaToken: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const params = new URLSearchParams();
      params.append("secret", process.env.HCAPTCHA_SECRET ?? "");
      params.append("response", input.captchaToken);
      params.append("sitekey", "885221c2-5b24-43a0-a20e-bcd2722edf48");

      const validateCaptcha = await fetch(
        "https://api.hcaptcha.com/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params,
        },
      );

      const captchaBody: hCatpchaVerificationResponse =
        (await validateCaptcha.json()) as hCatpchaVerificationResponse;
      if (!captchaBody?.success) {
        let message = "captcha validation failed";
        if (input.language == "pl") {
          message = "weryfikacja captcha zakończona niepowodzeniem";
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
