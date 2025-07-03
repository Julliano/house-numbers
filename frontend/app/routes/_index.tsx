import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const text = formData.get("text");

  if (!text || typeof text !== "string" || text.trim() === "") {
    return new Response(JSON.stringify({ error: "Text is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
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
      return new Response(JSON.stringify({ error: data.error || "API error" }), {
        status: res.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = await res.json();
    return redirect(`/snippets/${data.id}`);
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to contact API" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export default function Index() {
  const actionData = useActionData<typeof action>();

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">AI Snippet Service</h1>

      <Form method="post" className="space-y-4">
        <textarea
          name="text"
          rows={4}
          className="w-full border rounded p-2"
          placeholder="Enter text to summarize..."
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </Form>

      {actionData?.error && (
        <p className="text-red-600 mt-2">{actionData.error}</p>
      )}
    </main>
  );
}
