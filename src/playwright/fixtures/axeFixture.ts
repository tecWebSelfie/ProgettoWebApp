import { test as base } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

type AxeFixture = {
  a11y: () => AxeBuilder;
};

// Extend base test by providing "makeAxeBuilder"
//
// This new "test" can be used in multiple test files, and each of them will get
// a consistently configured AxeBuilder instance.
export const testA11y = base.extend<AxeFixture>({
  a11y: async ({ page }, use, testInfo) => {
    const makeAxeBuilder = () => {
      return (
        new AxeBuilder({ page })
          //these are accessibility standards that axe will check validity with
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          //DOM elements tagged with these ids and/or classes will be skipped during a11y testing
          .exclude("#commonly-reused-element-with-known-issue")
      );
    };
    await use(makeAxeBuilder);
  },
});
