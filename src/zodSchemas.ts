import { z } from "zod";

export const tempSchema = z.object({
  id: z.string(),
  temp: z.number().positive(),
  date: z.date(),
});
export type Temp = z.infer<typeof tempSchema>;

export const idSchema = z.object({ id: z.string() });
