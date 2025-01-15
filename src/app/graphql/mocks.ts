import { faker } from "@faker-js/faker";

//This is mocked data for the graphql server
export const mocks = {
  MongoID: () => faker.database.mongodbObjectId(),
  User: () => ({
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    nickname: faker.animal.bird(),
  }),
  Journal: () => ({
    summary: "journal summary",
    description: "journal description",
    start_date: faker.date.recent().toISOString(),
    last_modified: faker.date.recent().toISOString(),
  }),
};

//These are mocked resolvers for the graphql server
export const mockedResolvers = {};
