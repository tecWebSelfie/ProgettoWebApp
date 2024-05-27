import { mergeTests } from "@playwright/test";
import { testA11y } from "./axeFixture";

//merge fixtures in one test fixture
export const test = mergeTests(testA11y);

//proxied so that this file can be the only import for playwright api
export { expect } from "@playwright/test";
