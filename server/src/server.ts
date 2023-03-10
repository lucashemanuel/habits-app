import Fastify from "fastify";
import cors from "@fastify/cors";
import { prisma } from "./lib/prisma";
import { appRoutes } from "./routes";
import { notificationRoutes } from "./notifications-routes";

const app = Fastify();

app.register(cors, {
  origin: true,
});
app.register(appRoutes);
app.register(notificationRoutes);

app
  .listen({
    port: 3030,
    host: "0.0.0.0",
  })
  .then((url) => {
    console.log(`Server is running on ${url}`);
  });
