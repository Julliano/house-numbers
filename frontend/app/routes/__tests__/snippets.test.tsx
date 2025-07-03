import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as remixReact from "@remix-run/react";
import { vi } from "vitest";

import SnippetsPage from "../snippets";

describe("SnippetsPage", () => {
  it("renders table rows", () => {
    const mockSnippets = [
      { id: "1", text: "Sample text 1", summary: "Summary 1" },
      { id: "2", text: "Sample text 2", summary: "Summary 2" },
    ];

    vi.spyOn(remixReact, "useLoaderData").mockReturnValue(mockSnippets);

    render(
      <MemoryRouter>
        <SnippetsPage />
      </MemoryRouter>
    );

    // Verify table renders data
    expect(screen.getByText("Sample text 1")).toBeInTheDocument();
    expect(screen.getByText("Summary 1")).toBeInTheDocument();
    expect(screen.getByText("Sample text 2")).toBeInTheDocument();
    expect(screen.getByText("Summary 2")).toBeInTheDocument();
  });
});
