"use server";

import { createId } from "@paralleldrive/cuid2";
import { db } from "../db";
import { temps } from "../db/schema";
import type { TempId, Temp } from "~/zodSchemas";
import { getServerAuthSession } from "../auth";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

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

export const removeSample = async (id: string) => {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  await db.delete(temps).where(eq(temps.id, id));
  revalidatePath("/");
};

export const editSample = async ({ id, date, temp }: TempId) => {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  await db.update(temps).set({ temp, updatedAt: date }).where(eq(temps.id, id));
  revalidatePath("/");
};
