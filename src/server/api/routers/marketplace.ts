import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const marketplaceRouter = createTRPCRouter({
  getAllItems: publicProcedure.query(({ ctx }) => {
    return ctx.db.marketPlaceItem.findMany({
      include: {
        seller: true,
        pokemonCard: true,
      },
    });
  }),
  getItemsSoldByUser: protectedProcedure.query(({ ctx }) => {
    return ctx.db.marketPlaceItem.findMany({
      where: {
        sellerId: ctx.session.user.id,
      },
      include: {
        pokemonCard: true,
      },
    });
  }),
  putUpCardForSale: protectedProcedure
    .input(
      z.object({
        cardId: z.number(),
        cost: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const cardToBeSold = await ctx.db.cardOwnedByUser.findFirst({
        where: {
          cardId: input.cardId,
          userId: ctx.session.user.id,
        },
      });
      return ctx.db.$transaction([
        ctx.db.cardOwnedByUser.delete({
          where: {
            id: cardToBeSold?.id,
          },
        }),
        ctx.db.marketPlaceItem.create({
          data: {
            cardId: input.cardId,
            cost: input.cost,
            sellerId: ctx.session.user.id,
          },
        }),
      ]);
    }),
});
