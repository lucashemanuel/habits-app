import { FastifyInstance } from "fastify";
import WebPush from "web-push";
import { z } from "zod";

const privateKey = "01--dIuarJrqcDRW_zEbKPLw_5bcHUyNH9pI6TsL81M";
const publicKey =
  "BBO6o2PliiVHBLkrUYji8sO7c3xiGDl2-16C9maqd_dYXXL-vzISXXICbNf1uLNyWNFA69EKAeYNl6qkolgyUPw";

WebPush.setVapidDetails("http://localhost:3030", publicKey, privateKey);

export async function notificationRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => {
    return {
      publicKey,
    };
  });

  app.post("/push/register", (request, reply) => {
    console.log(request.body);

    return reply.status(201).send();
  });

  app.post("/push/send", (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const { subscription } = sendPushBody.parse(request.body);

    setTimeout(() => {
      WebPush.sendNotification(subscription, "Backend saying hello");
    }, 5000);
    return reply.status(201).send();
  });
}
