import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const notificationRouter = createTRPCRouter({
  getNotification: protectedProcedure.query(({ ctx }) => {
    return ctx.db.marketNotification.findMany({
      where: {
        sellingUserId: ctx.session.user.id,
      },
      include: {
        card: true,
      },
    });
  }),
  markAsRead: protectedProcedure
    .input(z.object({ notificationId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.marketNotification.update({
        where: {
          id: input.notificationId,
        },
        data: {
          read: true,
        },
      });
    }),
});
