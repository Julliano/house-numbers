import { json } from "@remix-run/node";

export async function loader({ params }: { params: { id: string } }) {
  const apiUrl = process.env.REMIX_API_URL;
  const res = await fetch(`${apiUrl}/snippets/${params.id}`);
  const data = await res.json();
  return json(data, { status: res.status });
}
