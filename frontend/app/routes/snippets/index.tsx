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
  return json({ snippets: data, apiUrl });
}

export default function SnippetsPage() {
  const { snippets, apiUrl } = useLoaderData<typeof loader>();

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
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Snippet by ID</h1>
      <div className="flex space-x-2">
        <input
          type="text"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
          className="border rounded p-2 flex-1"
          placeholder="Enter snippet ID"
        />
        <button onClick={handleFind} className="bg-blue-600 text-white px-4 py-2 rounded">
          Find by ID
        </button>
      </div>

      {foundSnippet && (
        <div className="border p-4 rounded bg-gray-50">
          <h2 className="font-semibold">Found Snippet</h2>
          <p><strong>Text:</strong> {foundSnippet.text}</p>
          <p><strong>Summary:</strong> {foundSnippet.summary}</p>
        </div>
      )}

      <h1 className="text-2xl font-bold text-center">All Snippets</h1>
      <div className="overflow-y-auto max-h-[500px] border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 sticky top-0">
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
