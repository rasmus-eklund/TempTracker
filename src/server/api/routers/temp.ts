import { createId } from "@paralleldrive/cuid2";
import { and, eq, lte, gte, asc } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { temps } from "~/server/db/schema";
import { fromToSchema, idSchema, tempSchema, tempSchemaId } from "~/zodSchemas";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(tempSchema)
    .mutation(async ({ ctx, input: { temp, date } }) => {
      const id = createId();
      await ctx.db.insert(temps).values({
        id,
        temp,
        createdAt: date,
        createdById: ctx.session.user.id,
      });
    }),

  read: protectedProcedure
    .input(fromToSchema)
    .query(async ({ ctx, input: { from, to } }) => {
      const userId = ctx.session.user.id;
      const data = await ctx.db
        .select({ id: temps.id, date: temps.createdAt, temp: temps.temp })
        .from(temps)
        .where(
          and(
            eq(temps.createdById, userId),
            gte(temps.createdAt, from),
            lte(temps.createdAt, to),
          ),
        )
        .orderBy(asc(temps.createdAt));
      return data;
    }),

  update: protectedProcedure
    .input(tempSchemaId)
    .mutation(async ({ ctx, input: { date, id, temp } }) => {
      await ctx.db
        .update(temps)
        .set({ temp, updatedAt: date })
        .where(eq(temps.id, id));
    }),

  delete: protectedProcedure
    .input(idSchema)
    .mutation(async ({ ctx, input: { id } }) => {
      return await ctx.db.delete(temps).where(eq(temps.id, id)).returning();
    }),
});
