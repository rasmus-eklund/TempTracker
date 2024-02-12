import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { temps } from "~/server/db/schema";
import { idSchema, tempSchema, tempSchemaId } from "~/zodSchemas";

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

  read: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const data = await ctx.db
      .select()
      .from(temps)
      .where(eq(temps.createdById, userId));
    return data.map(({ temp, createdAt }) => ({ date: createdAt, temp }));
  }),

  update: protectedProcedure
    .input(tempSchemaId)
    .mutation(async ({ ctx, input: { date, id, temp } }) => {
      await ctx.db.update(temps).set({ id, temp, updatedAt: date });
    }),

  delete: protectedProcedure
    .input(idSchema)
    .mutation(async ({ ctx, input: { id } }) => {
      return await ctx.db.delete(temps).where(eq(temps.id, id)).returning();
    }),
});
