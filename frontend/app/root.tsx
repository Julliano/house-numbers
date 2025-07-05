import { Links, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import Navbar from "./components/Navbar";
import './tailwind.css';

export default function App() {
  return (
    <html lang="en">
      <head>
        <title>AI Snippet Service</title>
        <Links />
      </head>
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
