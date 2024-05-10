"use server";

import { createId } from "@paralleldrive/cuid2";
import { db } from "../db";
import { temps } from "../db/schema";
import { type Temp } from "~/zodSchemas";
import { getServerAuthSession } from "../auth";
import { revalidatePath } from "next/cache";

export const createSample = async ({ temp, date }: Temp) => {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const id = createId();
  await db.insert(temps).values({
    id,
    temp,
    createdAt: date,
    createdById: session.user.id,
  });
  revalidatePath("/");
};
