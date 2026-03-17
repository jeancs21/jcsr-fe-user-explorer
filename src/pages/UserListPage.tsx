import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import UserList from "../features/user/components/UserList";
import UserSearchBar from "../features/user/components/UserSearchBar";
import { useGetUsers } from "../features/user/hooks";
import { AppRoutes } from "../router/routes.enum";

const UserListPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | undefined>();
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>();

  const { users: allUsers } = useGetUsers();

  const cities = useMemo(() => {
    const uniqueCities = Array.from(new Set(allUsers.map((u) => u.city))).sort();
    return uniqueCities;
  }, [allUsers]);

  const companies = useMemo(() => {
    const uniqueCompanies = Array.from(new Set(allUsers.map((u) => u.company))).sort();
    return uniqueCompanies;
  }, [allUsers]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(prev => prev === city ? undefined : city);
  };

  const handleCompanyChange = (company: string) => {
    setSelectedCompany(prev => prev === company ? undefined : company);
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
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">Cities</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {cities.map(city => (
                  <label key={city} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800"
                      checked={selectedCity === city}
                      onChange={() => handleCityChange(city)}
                    />
                    <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                      {city}
                    </span>
                  </label>
                ))}
                {cities.length === 0 && <p className="text-xs text-zinc-400 italic">No cities found</p>}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">Companies</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {companies.map(company => (
                  <label key={company} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800"
                      checked={selectedCompany === company}
                      onChange={() => handleCompanyChange(company)}
                    />
                    <span className="text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                      {company}
                    </span>
                  </label>
                ))}
                {companies.length === 0 && <p className="text-xs text-zinc-400 italic">No companies found</p>}
              </div>
            </div>

            {(selectedCity || selectedCompany) && (
              <button
                onClick={() => { setSelectedCity(undefined); setSelectedCompany(undefined); }}
                className="w-full py-2 text-xs font-semibold text-zinc-500 hover:text-blue-600 transition-colors flex items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-blue-200"
              >
                Clear Filters
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
