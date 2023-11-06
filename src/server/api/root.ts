import { createTRPCRouter } from "~/server/api/trpc";
import { cardRouter } from "./routers/cards";
import { marketplaceRouter } from "./routers/marketplace";
import { packRouter } from "./routers/pack";
import { userRouter } from "./routers/user";
import { dashboardRouter } from "./routers/dashboard";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  cards: cardRouter,
  pack: packRouter,
  user: userRouter,
  marketplace: marketplaceRouter,
  dashboard: dashboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
