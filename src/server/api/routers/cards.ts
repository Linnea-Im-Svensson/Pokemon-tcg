import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const cardRouter = createTRPCRouter({
  getAllCards: publicProcedure.query(({ ctx }) => {
    return ctx.db.pokemonCard.findMany({
      orderBy: { id: "asc" },
    });
  }),
  getCard: publicProcedure
    .input(z.object({ cardId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.pokemonCard.findUnique({ where: { id: input.cardId } });
    }),
  getUserCardsFromCollection: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        cardCollection: true,
      },
    });
  }),
  getCardAmount: protectedProcedure
    .input(z.object({ cardId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.cardOwnedByUser.findMany({
        where: { cardId: input.cardId, userId: ctx.session.user.id },
      });
    }),
  getCardInfo: protectedProcedure
    .input(z.object({ cardId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.cardOwnedByUser.findMany({
        where: {
          userId: ctx.session.user.id,
          cardId: input.cardId,
        },
      });
    }),
  sellOneCard: protectedProcedure
    .input(z.object({ cardId: z.number(), cardValue: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const cardToBeDeletedId = await ctx.db.cardOwnedByUser.findFirst({
        where: { cardId: input.cardId, userId: ctx.session.user.id },
        select: { id: true },
      });

      if (cardToBeDeletedId) {
        return await ctx.db.$transaction([
          ctx.db.cardOwnedByUser.delete({
            where: { id: cardToBeDeletedId?.id },
          }),
          ctx.db.user.update({
            where: {
              id: ctx.session.user.id,
            },
            data: {
              pokeCoins: {
                increment: input.cardValue,
              },
            },
          }),
        ]);
      }
    }),
  sellDuplicateCards: protectedProcedure
    .input(
      z.object({
        totalAmount: z.number(),
        cardValue: z.number(),
        cardId: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const amountOfDuplicates = ctx.db.cardOwnedByUser.findMany({
        where: {
          cardId: input.cardId,
          userId: ctx.session.user.id,
        },
      });
      return ctx.db.$transaction([
        ctx.db.cardOwnedByUser.deleteMany({
          where: { cardId: input.cardId, userId: ctx.session.user.id },
        }),
        ctx.db.cardOwnedByUser.create({
          data: { cardId: input.cardId, userId: ctx.session.user.id },
        }),
        ctx.db.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            pokeCoins: {
              increment: input.totalAmount * input.cardValue,
            },
          },
        }),
      ]);
    }),
  sellAllDuplicateCards: protectedProcedure.query(({ ctx }) => {}),
  getPaginationCards: publicProcedure
    .input(z.object({ page: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.pokemonCard.findMany({
        skip: (input.page - 1) * 12,
        take: 12,
      });
    }),
});
