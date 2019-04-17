import mongoose from 'mongoose';
import { GraphQLServer } from 'graphql-yoga';
import graphqlConfig from './api';

const PORT = 3000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/gql_db', { useNewUrlParser: true });

const start = 'Welcome to node-starter-kit';
console.log(start);

const options = {
  tracing: true,
  debug: true,
  port: PORT,
  endpoint: '/graphql',
  playground: '/docs'
};

const server = new GraphQLServer(graphqlConfig);
server.start(options, () => console.log('Server is running on localhost:3000'));
