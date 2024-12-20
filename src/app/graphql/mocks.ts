import { faker } from "@faker-js/faker";

//This is mocked data for the graphql server
export const mocks = {
  MongoID: () => faker.database.mongodbObjectId(),
};

//These are mocked resolvers for the graphql server
export const mockedResolvers = {};
