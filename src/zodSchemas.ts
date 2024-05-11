import { z } from "zod";

export const tempSchemaId = z.object({
  id: z.string(),
  temp: z.coerce.number().positive(),
  date: z.coerce.date(),
});
export type Sample = z.infer<typeof tempSchemaId>;

export const tempSchema = z.object({
  temp: z.coerce.number().positive(),
  date: z.coerce.date(),
});
export type Temp = z.infer<typeof tempSchema>;

export type UserRole = "user" | "admin";
