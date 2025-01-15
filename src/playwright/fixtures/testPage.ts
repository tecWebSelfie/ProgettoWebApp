/**
 * Represents a page in the Playwright testing framework.
 */
abstract class mPage {
  /**
   * The relative URL path for the page.
   */
  private readonly urlPath = "/";

  constructor(private readonly page: any) {}

  /**
   * Opens the page and waits for the network to be idle.
   */
  async open() {
    await this.page.goto(this.urlPath, { waitUntil: "networkidle0" });
  }

  /**
   * Navigates the page to the specified URL and waits for the network to be idle.
   *
   * @param url - The URL to navigate to.
   * @returns A promise that resolves when the page has navigated to the specified URL and the network is idle.
   */
  async goto(url: string) {
    await this.page.goto(url, { waitUntil: "networkidle0" });
  }
}
