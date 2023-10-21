const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    orders: [Order]
  }

  type Order {
    id: ID!
    date: String!
    amount: Float!
    user: User!
  }

  input UserInput {
    name: String!
    email: String!
  }

  input OrderInput {
    date: String!
    amount: Float!
    userId: ID!
  }

  type Query {
    user(id: ID!): User
    orders(userId: ID!): [Order]
  }

  type Mutation {
    createUser(input: UserInput!): User
    createOrder(input: OrderInput!): Order
  }
`);

module.exports = schema;
