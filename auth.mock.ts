import { fn } from "@storybook/test";
import * as actual from "./auth";

export * from "./auth";
export const auth = fn(actual.auth).mockName("auth");
