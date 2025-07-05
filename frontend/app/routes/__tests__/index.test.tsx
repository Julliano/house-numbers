import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import * as RemixReact from "@remix-run/react";

import Index from "../_index";

vi.mock("@remix-run/react", async () => {
  const actual = await vi.importActual<typeof RemixReact>("@remix-run/react");
  return {
    ...actual,
    useActionData: vi.fn(() => undefined),
    Form: ({ children }: { children: React.ReactNode }) => <form>{children}</form>,
  };
});

describe("IndexPage", () => {
  it("renders form", () => {
    render(<Index />);
    expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});
