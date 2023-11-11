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
  addCoins: protectedProcedure
    .input(z.object({ amountOfCoins: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          pokeCoins: {
            increment: input.amountOfCoins,
          },
        },
      });
    }),
});
