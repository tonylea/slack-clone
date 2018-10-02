import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';

import models from './models';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const PORT = 3000;
const graphqlEndpoint = '/graphql';
const graphiqlEndpoint = '/graphiql';

const app = express();
app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({ schema }));
app.use(graphiqlEndpoint, graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync(/* { force: true } */).then(() => {
  app.listen(PORT);
  console.log(`Listening on port ${PORT}`); // eslint-disable-line no-console
});
