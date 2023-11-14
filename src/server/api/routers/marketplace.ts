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
      orderBy: {
        createdAt: "desc",
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
  getItem: publicProcedure
    .input(z.object({ itemId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.marketPlaceItem.findUnique({
        where: { id: input.itemId },
        include: { pokemonCard: true },
      });
    }),
  buyMarketItem: protectedProcedure
    .input(
      z.object({
        itemId: z.string(),
        cost: z.number(),
        sellerId: z.string(),
        cardId: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.$transaction([
        //create notification
        ctx.db.marketNotification.create({
          data: {
            cost: input.cost,
            cardId: input.cardId,
            sellingUserId: input.sellerId,
          },
        }),
        //remove coins from buyer
        ctx.db.user.update({
          where: { id: ctx.session.user.id },
          data: { pokeCoins: { decrement: input.cost } },
        }),
        //add coins to seller
        ctx.db.user.update({
          where: { id: input.sellerId },
          data: { pokeCoins: { increment: input.cost } },
        }),
        //remove marketItem
        ctx.db.marketPlaceItem.delete({ where: { id: input.itemId } }),
        //add cardOwnedByUser to buyer
        ctx.db.cardOwnedByUser.create({
          data: { userId: ctx.session.user.id, cardId: input.cardId },
        }),
      ]);
    }),
  getSearchedItems: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.marketPlaceItem.findMany({
        where: {
          pokemonCard: {
            name: {
              contains: input.name,
              mode: "insensitive",
            },
          },
        },
        include: {
          pokemonCard: true,
          seller: true,
        },
      });
    }),
});
