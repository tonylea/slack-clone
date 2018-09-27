import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema';
import resolvers from './resolvers';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 3000;
const graphqlEndpoint = '/graphql';
const graphiqlEndpoint = '/graphiql';

const app = express();
app.use(graphqlEndpoint, bodyParser.json(), graphqlExpress({ schema }));
app.use(graphiqlEndpoint, graphiqlExpress({ endpointURL: graphqlEndpoint }));
app.listen(PORT);
console.log(`Listening on port ${PORT}`);
