import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

type Snippet = {
  id: string;
  text: string;
  summary: string;
};

export async function loader() {
  const apiUrl = process.env.REMIX_API_URL;
  const res = await fetch(`${apiUrl}/snippets`);
  const data = await res.json();
  return json({ snippets: data });
}

export default function SnippetsPage() {
  const { snippets } = useLoaderData<typeof loader>();

  const [foundSnippet, setFoundSnippet] = useState<Snippet | null>(null);
  const [idInput, setIdInput] = useState("");

  const handleFind = async () => {
    if (!idInput) return;
    try {
      // const res = await fetch(`${apiUrl}/snippets/${idInput}`);
      const res = await fetch(`/snippets/${idInput}`);
      if (res.ok) {
        const data = await res.json();
        setFoundSnippet(data);
      } else if (res.status === 404) {
        setFoundSnippet(null);
        alert("Snippet not found");
      } else {
        alert("Failed to fetch snippet");
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting API");
    }
  };

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-center text-2xl font-bold">Snippet by ID</h1>
      <div className="flex space-x-2">
        <input
          type="text"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
          className="flex-1 rounded border p-2"
          placeholder="Enter snippet ID"
        />
        <button onClick={handleFind} className="rounded bg-blue-600 px-4 py-2 text-white">
          Find by ID
        </button>
      </div>

      {foundSnippet && (
        <div className="rounded border bg-gray-50 p-4">
          <h2 className="font-semibold">Found Snippet</h2>
          <p><strong>Text:</strong> {foundSnippet.text}</p>
          <p><strong>Summary:</strong> {foundSnippet.summary}</p>
        </div>
      )}

      <h1 className="text-center text-2xl font-bold">All Snippets</h1>
      <div className="max-h-[500px] overflow-y-auto rounded border">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Text</th>
              <th className="p-2 text-left">Summary</th>
            </tr>
          </thead>
          <tbody>
            {snippets.map((snip: Snippet) => (
              <tr key={snip.id} className="odd:bg-white even:bg-gray-50">
                <td className="p-2">{snip.id}</td>
                <td className="p-2">{snip.text}</td>
                <td className="p-2">{snip.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
