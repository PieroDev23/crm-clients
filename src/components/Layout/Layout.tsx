import { Outlet, NavLink } from "react-router-dom";

const navLinkStyles = "text-2xl block mt-2 hover:text-gray-100";

const Layout = () => {
  // const location: Location = useLocation();

  return (
    <div className="md:flex md:min-h-screen">
      <aside className="md:w-2/5 lg:w-1/5 bg-blue-600 px-5 py-10">
        <h2 className="text-2xl font-black text-censer text-white text-center">
          CRM Clientes
        </h2>
        <nav className="mt-10">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              ` ${navLinkStyles} ${isActive ? "text-blue-200" : "text-white"}`
            }
            end
          >
            Clientes
          </NavLink>

          <NavLink
            to={"/clientes/nuevos"}
            className={({ isActive }) =>
              `${navLinkStyles} ${isActive ? "text-blue-200 " : "text-white"}`
            }
            end
          >
            Nuevo Cliente
          </NavLink>

          {/* <Link
            className={`${
              location.pathname === "/" ? "text-blue-200" : "text-white"
            } text-2xl block mt-2 hover:text-gray-100 text-white`}
            to={"/"}
          >
            Home
          </Link>
          <Link
            className={`${
              location.pathname === "/clientes/nuevos" ? "text-blue-200" : "text-white"
            } text-2xl block mt-2 hover:text-gray-100 text-white`}
            to={"/clientes/nuevos"}
          >
            Nuevos Clientes
          </Link> */}
        </nav>
      </aside>

      <main className="md:w-full p-10 md:h-screen overflow-scroll">
        {/* COMPONENTS */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
