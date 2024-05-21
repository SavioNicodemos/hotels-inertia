import { z } from "zod";

const envSchema = z.object({
  APP_NAME: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse({
  APP_NAME: import.meta.env.VITE_APP_NAME,
});
