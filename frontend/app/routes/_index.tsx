import { Form, useActionData } from "@remix-run/react";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const text = formData.get("text");

  if (!text || typeof text !== "string" || text.trim() === "") {
    return { error: "Text is required" };
  }

  try {
    const apiUrl = process.env.REMIX_API_URL;
    const res = await fetch(`${apiUrl}/snippets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!res.ok) {
      const data = await res.json();
      return { error: data.error || "API error" };
    }

    const data = await res.json();
    return { snippet: data }; // return snippet info instead of redirect
  } catch (err) {
    console.error(err);
    return { error: "Failed to contact API" };
  }
}

export default function Index() {
  const actionData = useActionData<typeof action>();

  return (
    <main className="mx-auto max-w-lg p-6">
      <h1 className="mb-4 text-2xl font-bold">AI Snippet Service</h1>

      <Form method="post" className="space-y-4">
        <textarea
          name="text"
          rows={4}
          className="w-full rounded border p-2"
          placeholder="Enter text to summarize..."
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Submit
        </button>
      </Form>

      {actionData?.error && (
        <p className="mt-2 text-red-600">{actionData.error}</p>
      )}

      {actionData?.snippet && (
        <div className="mt-4 rounded border border-green-500 bg-green-100 p-4 text-green-900">
          <p>Snippet created successfully!</p>
          <p>
            <strong>ID:</strong> {actionData.snippet.id}
          </p>
          <p>
            <strong>Summary:</strong> {actionData.snippet.summary}
          </p>
        </div>
      )}
    </main>
  );
}
