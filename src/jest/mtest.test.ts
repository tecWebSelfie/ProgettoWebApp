import { useRouter } from "next/router";

jest.mock("next/router", () => {
  return {
    useRouter: jest.fn(() => 5),
  };
});

test("test di prova", () => {
  expect(useRouter()).toBe(5);
});
