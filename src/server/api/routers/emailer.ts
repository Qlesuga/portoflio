import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const emailRouter = createTRPCRouter({
  sendEmial: publicProcedure
    .input(
      z.object({
        name: z.string().min(3),
        email: z.string().min(4).email(),
        message: z.string().min(10),
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
      console.log(validateCaptcha);
      console.log(await validateCaptcha.json());
      return {
        greeting: input,
      };
    }),
});
