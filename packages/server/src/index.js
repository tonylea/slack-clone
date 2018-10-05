import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

import models from './models';

require('dotenv').config();

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const port = process.env.PORT;
const graphqlEndpoint = `/${process.env.GRAPHQL_ENDPOINT}`;
const graphiqlEndpoint = `/${process.env.GRAPHIQL_ENDPOINT}`;

const app = express();
app.use(cors('*'));
app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      models,
      user: {
        id: 1
      }
    }
  })
);
app.use(graphiqlEndpoint, graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync(/* { force: true } */).then(() => {
  app.listen(port);
  console.log(`Go to http://localhost:${port}/graphiql to run queries!`); // eslint-disable-line no-console
});
