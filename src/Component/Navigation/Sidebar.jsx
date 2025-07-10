import { Link } from "react-router-dom";

const navLinks = [
  { label: "Banner", path: "/addbanner" },
  { label: "Innovate", path: "/innovate" },
  { label: "Services", path: "/services" },
  { label: "About us", path: "/about" },
  { label: "Our Team", path: "/team" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Contact", path: "/contact" },
];

const Sidebar = () => (
  <nav className="fixed top-0 left-0 h-full w-48 bg-white shadow-lg z-50 p-6">
    <h1 className="text-2xl font-bold mb-10">Create</h1>
    <ul className="space-y-6">
      {navLinks.map((link, index) => (
        <li key={index}>
          <Link
            to={link.path}
            className="text-gray-700 hover:text-blue-500 block cursor-pointer"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Sidebar;
