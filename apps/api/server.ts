import Fastify from "fastify";

const server = Fastify();

server.get("/captcha/validate", async (request, reply) => {
  return { success: true };
});

server.listen({ port: 3000 }, () => {
  console.log("Server running on http://localhost:3000");
});
