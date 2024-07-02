import { gql } from "apollo-server";

export const userTypeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
    phone: String!
    role: Role!
    createdAt: String!
    updatedAt: String!
  }

  enum Role {
    USER
    ADMIN
  }

  type Query {
    me: User!
    allUsers: [User]!
    getUser(id: String!): User!
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      phone: String!
      role: Role!
    ): User!
    updateUser(
      id: String!
      name: String
      email: String
      phone: String
      role: Role
    ): User!
    deleteUser(id: String!): User!
  }
`;
