import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export const getUser = async (id: string) => {
  return await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .then((res) => res[0] ?? null);
};
