import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { LoadingPage } from "~/client/components/loading-page";

describe("LoadingPage", () => {
  test("should render", () => {
    render(<LoadingPage />);
    expect(screen.getByTestId("loading-page")).toBeDefined();
  });
});
