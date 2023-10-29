import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getPokeCoins: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        pokeCoins: true,
      },
    });
  }),
  getTotalUsers: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.role === "Admin") {
      const totalAmountOfUsers: number = (await ctx.db.user.findMany()).length;
      return totalAmountOfUsers;
    }
  }),
});
