import { Link, Outlet } from "react-router-dom";
import { AppRoutes } from "../../../router/routes.enum";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-4 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">User Explorer</h1>
          <nav>
            <ul className="flex space-x-6 text-sm font-medium">
              <li>
                <Link to={AppRoutes.HOME} className="hover:text-blue-500 transition-colors">
                  Usuarios
                </Link>
              </li>
              <li>
                <Link to={AppRoutes.CREATE_USER} className="hover:text-blue-500 transition-colors">
                  Agregar usuario
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} User Explorer Admin</p>
      </footer>
    </div>
  );
};

export default MainLayout;
