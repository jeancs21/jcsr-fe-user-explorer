import { useState } from "react";
import { Link } from "react-router-dom";
import UserList from "../features/user/components/UserList";
import UserSearchBar from "../features/user/components/UserSearchBar";
import { AppRoutes } from "../router/routes.enum";

const UserListPage = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-zinc-500 dark:text-zinc-400">View, manage and explore your user base.</p>
        </div>
        <Link
          to={AppRoutes.CREATE_USER}
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-md shadow-blue-500/20 group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New User
        </Link>
      </div>

      <div className="flex justify-between items-center bg-white dark:bg-zinc-900/50 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
        <UserSearchBar onSearch={handleSearch} />
      </div>

      <UserList search={search} />
    </div>
  );
};

export default UserListPage;
