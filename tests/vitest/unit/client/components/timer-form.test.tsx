import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { TimerForm } from "~/client/components/timer-form";

function submittedStartTime(button: HTMLElement) {
  const form = screen.getByRole<HTMLFormElement>("form");
  let startTime: FormDataEntryValue | null = null;
  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      startTime = new FormData(form, event.submitter).get("startTime");
    },
    { once: true },
  );
  fireEvent.click(button);
  return startTime;
}

describe("TimerForm", () => {
  test("should render a form ", () => {
    render(<TimerForm />);
    expect(screen.getByRole("form")).toBeDefined();
  });

  test("should no longer show the sync checkbox", () => {
    render(<TimerForm />);
    expect(screen.queryByText(/Sync with universe/)).toBeNull();
    expect(screen.queryByRole("checkbox")).toBeNull();
  });

  test("should start a private timer from now with Start", () => {
    render(<TimerForm />);
    const before = Date.now();
    const startTime = Number(
      submittedStartTime(screen.getByRole("button", { name: "Start" })),
    );
    expect(startTime).toBeGreaterThanOrEqual(before);
    expect(startTime).toBeLessThanOrEqual(Date.now());
  });

  test("should join the global room with SCP-2317", () => {
    render(<TimerForm />);
    expect(
      submittedStartTime(screen.getByRole("button", { name: "SCP-2317" })),
    ).toBe("0");
  });
});
