import { describe, expect, test } from "bun:test";

import Home from "./page";

describe("Home Page", () => {
  test("should export default component", () => {
    expect(Home).toBeDefined();
    expect(typeof Home).toBe("function");
  });
});
