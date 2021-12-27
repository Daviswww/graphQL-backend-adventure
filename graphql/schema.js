import { join } from 'path';
import { readdirSync, readFileSync } from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers';
import { gql } from 'apollo-server-core';

const gqlFiles = readdirSync(join(__dirname, './typedefs'));

let typeDefsString = '';

gqlFiles.forEach((file) => {
  typeDefsString += readFileSync(join(__dirname, './typedefs', file), {
    encoding: 'utf8',
  });
});

const typeDefs = gql(typeDefsString);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;