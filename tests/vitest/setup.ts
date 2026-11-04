import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import failOnConsole from "vitest-fail-on-console";
import { db } from "~/client/db";

// Server actions run on the server and pull in the Node-only `postgres`
// driver, which cannot load in the browser test environment.
vi.mock("~/server/actions", () => ({
  ping: vi.fn().mockResolvedValue({ buddiesCount: 0 }),
}));

failOnConsole({
  shouldFailOnWarn: true,
  shouldFailOnError: true,
  shouldFailOnAssert: true,
});

beforeEach(async () => {
  await db.timer.clear();

  // tell vitest we use mocked time
  vi.useFakeTimers();

  cleanup();
});

afterEach(() => {
  // restoring date after each test run
  vi.useRealTimers();
});
