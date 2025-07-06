import { NavLink } from "@remix-run/react";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="mx-auto flex max-w-4xl space-x-6">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "font-bold underline"
                : "hover:underline"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/snippets"
            className={({ isActive }) =>
              isActive
                ? "font-bold underline"
                : "hover:underline"
            }
          >
            Snippets
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
