import { Resolvers } from "@/src/gql/resolvers-types";
import { faker } from "@faker-js/faker";
import { IMocks, IMockStore } from "@graphql-tools/mock";

//This is mocked data for the graphql server
export const mocks: IMocks = {
  MongoID: () => faker.database.mongodbObjectId(),
  User: () => ({
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    nickname: faker.animal.bird(),
  }),
  Journal: () => ({
    summary: faker.book.title(),
    description: faker.lorem.paragraph(),
    start_date: faker.date.recent().toISOString(),
    last_modified: faker.date.recent().toISOString(),
  }),
};

//These are mocked resolvers for the graphql server
export const mockedResolvers: (store: IMockStore) => Partial<Resolvers> = (
  store,
) => ({});
