import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import models from './models';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const PORT = 3000;
const graphqlEndpoint = '/graphql';
const graphiqlEndpoint = '/graphiql';

const app = express();
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
  app.listen(PORT);
  console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
});
