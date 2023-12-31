import express from 'express';
import cookieParser from 'cookie-parser';
import { consola } from 'consola';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import typeDefs from './graphql/typedefs.mjs';
import resolvers from './graphql/resolvers.mjs';
import 'dotenv/config';
import connectDB from './config/db.mjs';
import protect from './middleware/protect.mjs';
import formattedErrors from './graphql/formattedErrors.mjs';
import imageRouter from './routes/imageRouter.mjs';
import schedules from './schedule/schedules.mjs';

const PORT = process.env.PORT || 5000;

const app = express();

const httpServer = http.createServer(app);

// connect DB
connectDB();

// schedules
schedules();

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: formattedErrors,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

const corsOptions = {
  origin: process.env.FE_DOMAIN,
  credentials: true,
};
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/api/v1/images', imageRouter);
app.use(
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => ({
      user: await protect(req, res),
      req,
      res,
    }),
  }),
);

// trunk-ignore(eslint/no-promise-executor-return)
await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve)).then(
  () => consola.success({ badge: true, message: `Listening on port: ${PORT}` }),
);
