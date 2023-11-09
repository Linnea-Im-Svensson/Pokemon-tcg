import { Rarity } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
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
  updateCard: protectedProcedure
    .input(
      z.object({
        cardId: z.number(),
        name: z.string().min(1).max(15),
        sellValue: z.number().min(1),
        rarity: z.nativeEnum(Rarity),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.pokemonCard.update({
        where: {
          id: input.cardId,
        },
        data: {
          name: input.name,
          sellValue: input.sellValue,
          rarity: input.rarity,
        },
      });
    }),
});
