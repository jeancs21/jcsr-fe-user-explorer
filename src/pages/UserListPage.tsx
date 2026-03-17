import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import UserList from "../features/user/components/UserList";
import UserSearchBar from "../features/user/components/UserSearchBar";
import UserFilterTypeSelector from "../features/user/components/UserFilterTypeSelector";
import UserFilterValueSelector from "../features/user/components/UserFilterValueSelector";
import { useGetUsers } from "../features/user/hooks";
import { AppRoutes } from "../router/routes.enum";
import type { UserFilterType } from "../features/user/interface/user.interface";

const UserListPage = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<UserFilterType>("none");
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

  const handleFilterTypeChange = (type: UserFilterType) => {
    setFilterType(type);
    setSelectedCity(undefined);
    setSelectedCompany(undefined);
  };

  const handleValueChange = (value: string | undefined) => {
    if (filterType === "city") {
      setSelectedCity(value);
    } else if (filterType === "company") {
      setSelectedCompany(value);
    }
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-6">
          <UserFilterTypeSelector
            currentType={filterType}
            onTypeChange={handleFilterTypeChange}
          />

          <UserFilterValueSelector
            filterType={filterType}
            selectedValue={filterType === "city" ? selectedCity : selectedCompany}
            cities={cities}
            companies={companies}
            onValueChange={handleValueChange}
          />

          {filterType !== "none" && (
            <button
              onClick={() => handleFilterTypeChange("none")}
              className="w-full py-2 text-xs font-semibold text-zinc-500 hover:text-blue-600 transition-colors flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-blue-200"
            >
              Limpiar Filtros
            </button>
          )}
        </div>

        <div className="lg:col-span-3 space-y-6">
          <UserSearchBar onSearch={handleSearch} />
          <UserList search={search} city={selectedCity} company={selectedCompany} />
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
