import { useState } from "react";
import { Link } from "react-router-dom";
import { MOCK_USERS } from "../features/user/services/mockUsers";
import type { User } from "../features/user/interface/user.interface";
import UserDetailModal from "../features/user/components/UserDetailModal";
import { AppRoutes } from "../router/routes.enum";
import Button from "../components/ui/Button";
import UserAvatar from "../components/ui/UserAvatar";
import UserInfoField from "../features/user/components/UserInfoField";

const TABLE_HEADERS = [
  { label: "User", className: "" },
  { label: "Company", className: "" },
  { label: "City", className: "" },
  { label: "Actions", className: "text-right" },
];

const UserListPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowDetails = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
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

      <div className="hidden md:block overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
        <table className="w-full text-left border-collapse">
          
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header.label}
                  className={`px-6 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-300 ${header.className}`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {MOCK_USERS.map((user) => (
              <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <UserAvatar name={user.name} className="w-10 h-10" />
                    <div>
                      <div className="text-sm font-bold">{user.name}</div>
                      <div className="text-xs text-zinc-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                  {user.company}
                </td>
                
                <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                  {user.city}
                </td>
                
                <td className="flex justify-end px-6 py-4 text-right space-x-2">
                  <Button
                    type="button"
                    onClick={() => handleShowDetails(user)}
                    className="p-2 text-zinc-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </Button>
                  <Link
                    to={AppRoutes.EDIT_USER.replace(":id", user.id.toString())}
                    className="inline-block p-2 text-zinc-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                    title="Edit user"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Link>
                  <Button
                    type="button"
                    className="p-2 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:hidden grid-cols-1 gap-4">
        {MOCK_USERS.map((user) => (
          <div key={user.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 space-y-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <UserAvatar name={user.name} className="w-12 h-12 text-lg" />
              <div className="flex-1">
                <div className="font-bold text-lg">{user.name}</div>
                <div className="text-sm text-zinc-500">{user.email}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <UserInfoField label="Company" value={user.company} />
              <UserInfoField label="City" value={user.city} />
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex justify-between gap-2">
              <Button
                type="button"
                onClick={() => handleShowDetails(user)}
                className="flex-1 px-3 py-2 text-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-sm font-medium transition-colors"
              >
                View
              </Button>
              <Link
                to={AppRoutes.EDIT_USER.replace(":id", user.id.toString())}
                className="flex-1 flex items-center justify-center px-3 py-2 text-amber-600 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg text-sm font-medium transition-colors"
              >
                Edit
              </Link>
              <Button
                type="button"
                className="flex-1 px-3 py-2 text-red-600 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-sm font-medium transition-colors"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <UserDetailModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default UserListPage;
