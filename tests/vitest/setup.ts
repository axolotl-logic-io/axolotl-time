import { db } from "~/client/db";

import failOnConsole from "vitest-fail-on-console";
import { afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

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
