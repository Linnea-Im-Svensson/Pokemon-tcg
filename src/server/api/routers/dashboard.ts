import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
  getTotalUsers: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.role === "Admin") {
      const totalAmountOfUsers: number = (await ctx.db.user.findMany()).length;
      return totalAmountOfUsers;
    }
  }),
  getDashBoardData: protectedProcedure.query(async ({ ctx }) => {
    const totalAmountOfUsers: number = (await ctx.db.user.findMany()).length;
    const totalAmountOfCards: number = (await ctx.db.cardOwnedByUser.findMany())
      .length;

    const data = {
      totalAmountOfUsers,
      cardAverage: totalAmountOfCards / totalAmountOfUsers,
    };
    return data;
  }),
});
