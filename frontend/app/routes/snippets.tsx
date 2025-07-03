import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

type Snippet = {
  id: string;
  text: string;
  summary: string;
};

export async function loader({ }: LoaderFunctionArgs) {
  const apiUrl = process.env.REMIX_API_URL;
  const res = await fetch(`${apiUrl}/snippets`);
  if (!res.ok) {
    throw new Response("Failed to load snippets", { status: res.status });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}

export default function SnippetsPage() {
  const snippets = useLoaderData<Snippet[]>();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">All Snippets</h1>
      {snippets.length === 0 ? (
        <p className="text-center mt-20 text-gray-500">No snippets found.</p>
      ) : (
        <div className="max-h-[600px] overflow-y-auto border rounded shadow-sm">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Text</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">Summary</th>
              </tr>
            </thead>
            <tbody>
              {snippets.map((snippet) => (
                <tr key={snippet.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800 border-b">{snippet.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-800 border-b">{snippet.text}</td>
                  <td className="px-4 py-2 text-sm text-gray-800 border-b">{snippet.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
