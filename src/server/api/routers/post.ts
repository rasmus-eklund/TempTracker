import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { temps } from "~/server/db/schema";

export const postRouter = createTRPCRouter({

  create: protectedProcedure
    .input(z.object({ temp: z.number().positive() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(temps).values({
        temp: input.temp,
        createdById: ctx.session.user.id,
      });
    }),

});
