"use server";

import { createId } from "@paralleldrive/cuid2";
import { db } from "../db";
import { temps } from "../db/schema";
import type { Sample, Temp } from "~/zodSchemas";
import { getServerAuthSession } from "../auth";
import { revalidatePath } from "next/cache";
import { and, asc, eq, gte, lte } from "drizzle-orm";

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

export const editSample = async ({ id, date, temp }: Sample) => {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  await db.update(temps).set({ temp, updatedAt: date }).where(eq(temps.id, id));
  revalidatePath("/");
};

export const getSamples = async ({
  from,
  to,
}: {
  from: Date | null;
  to: Date | null;
}) => {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const data = await db
    .select({ id: temps.id, date: temps.createdAt, temp: temps.temp })
    .from(temps)
    .where(
      and(
        eq(temps.createdById, session.user.id),
        from ? gte(temps.createdAt, from) : undefined,
        to ? lte(temps.createdAt, to) : undefined,
      ),
    )
    .orderBy(asc(temps.createdAt));
  return data;
};
