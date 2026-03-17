import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import UserList from "../features/user/components/UserList";
import UserSearchBar from "../features/user/components/UserSearchBar";
import { useGetUsers } from "../features/user/hooks";
import { AppRoutes } from "../router/routes.enum";

type FilterType = "city" | "company" | "none";

const UserListPage = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("none");
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>();

  const { users: allUsers } = useGetUsers();

  const cities = useMemo(() => {
    return Array.from(new Set(allUsers.map((u) => u.city))).sort();
  }, [allUsers]);

  const companies = useMemo(() => {
    return Array.from(new Set(allUsers.map((u) => u.company))).sort();
  }, [allUsers]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleFilterTypeChange = (type: FilterType) => {
    setFilterType(type);
    setSelectedCity(undefined);
    setSelectedCompany(undefined);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || undefined;
    if (filterType === "city") {
      setSelectedCity(value);
    } else if (filterType === "company") {
      setSelectedCompany(value);
    }
  };

  const options = filterType === "city" ? cities : companies;
  const selectedValue = filterType === "city" ? selectedCity : selectedCompany;

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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Filtrar por:</h3>
              
              <div className="flex flex-col space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="filterType"
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800"
                    checked={filterType === "city"}
                    onChange={() => handleFilterTypeChange("city")}
                  />
                  <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                    Ciudad
                  </span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="filterType"
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800"
                    checked={filterType === "company"}
                    onChange={() => handleFilterTypeChange("company")}
                  />
                  <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                    Empresa
                  </span>
                </label>
              </div>
            </div>

            {filterType !== "none" && (
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <label htmlFor="filter-select" className="text-xs font-semibold text-zinc-400 block uppercase">
                  Seleccione {filterType === "city" ? "una Ciudad" : "una Empresa"}:
                </label>
                <select
                  id="filter-select"
                  value={selectedValue || ""}
                  onChange={handleSelectChange}
                  className="w-full p-2 text-sm bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">Todos</option>
                  {options.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {filterType !== "none" && (
              <button
                onClick={() => handleFilterTypeChange("none")}
                className="w-full py-2 text-xs font-semibold text-zinc-500 hover:text-blue-600 transition-colors flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-blue-200"
              >
                Limpiar Filtros
              </button>
            )}
          </div>
        </aside>

        <div className="lg:col-span-3 space-y-6">
          <UserSearchBar onSearch={handleSearch} />
          <UserList search={search} city={selectedCity} company={selectedCompany} />
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
