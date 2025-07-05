import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import SnippetsPage from "../snippets/index";

vi.mock("@remix-run/react", async () => {
  const actual = await import("@remix-run/react");
  return {
    ...actual,
    useLoaderData: () => ({
      snippets: [
        { _id: "abc123", text: "Example text", summary: "Example summary" },
        { _id: "def456", text: "Another", summary: "Another summary" }
      ],
      apiUrl: "http://mockapi"
    })
  };
});

describe("SnippetsPage", () => {
  it("renders table with snippets", () => {
    render(<SnippetsPage />);
    expect(screen.getByText(/Example text/)).toBeInTheDocument();
    expect(screen.getByText(/Another summary/)).toBeInTheDocument();
  });

  it("finds snippet by id", async () => {
    // Mock fetch for handleFind
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        _id: "abc123",
        text: "Example text",
        summary: "Example summary"
      })
    });

    render(<SnippetsPage />);

    const input = screen.getByPlaceholderText(/enter snippet id/i);
    const button = screen.getByRole("button", { name: /find/i });

    fireEvent.change(input, { target: { value: "abc123" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Example text/)).toBeInTheDocument();
      expect(screen.getByText(/Example summary/)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith("/snippets/abc123");
  });
});
