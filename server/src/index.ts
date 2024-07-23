import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { User } from "./models/User";
import { sequelize } from "./models";

const port = 4000;

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    updateUser(id: ID!, name: String, email: String): User!
    deleteUser(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    users: () => User.findAll(),
    user: (_: any, { id }: { id: number }) => User.findByPk(id),
  },
  Mutation: {
    createUser: (_: any, { name, email }: { name: string; email?: string }) =>
      User.create({ name, email }),
    updateUser: async (
      _: any,
      { id, name, email }: { id: number; name?: string; email?: string }
    ) => {
      const user = await User.findByPk(id);
      if (!user) throw new Error("User not found");
      if (name !== undefined) user.name = name;
      if (email !== undefined) user.email = email;
      await user.save();
      return user;
    },
    deleteUser: async (_: any, { id }: { id: number }) => {
      const user = await User.findByPk(id);
      if (!user) throw new Error("User not found");
      await user.destroy();
      return true;
    },
  },
};

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  const app = express() as any;

  server.applyMiddleware({
    app,
    path: "/api",
  });

  app.listen(port, async () => {
    console.log(
      `Server is running http://localhost:${port}${server?.graphqlPath}`
    );
    await sequelize.sync({ force: true });
    console.log("Database synced");
  });
}

startApolloServer();
