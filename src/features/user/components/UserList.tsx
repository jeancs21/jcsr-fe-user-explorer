import { useNavigate } from "react-router-dom";
import type { User } from "../interface/user.interface";
import UserAvatar from "../../../components/ui/UserAvatar";
import UserInfoField from "./UserInfoField";
import UserActions from "./UserActions";
import { useGetUsers } from "../hooks";
import { AppRoutes } from "../../../router/routes.enum";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import ErrorMessage from "../../../components/ui/ErrorMessage";

const TABLE_HEADERS = [
  { label: "Usuario", className: "" },
  { label: "Empresa", className: "" },
  { label: "Ciudad", className: "" },
  { label: "Acciones", className: "text-right" },
];

interface UserListProps {
  search?: string;
  city?: string;
  company?: string;
}

const UserList = ({ search, city, company }: UserListProps) => {
  const { users, isLoading, error } = useGetUsers(search, city, company);
  const navigate = useNavigate();

  const handleShowDetails = (user: User) => {
    navigate(AppRoutes.USER_DETAILS.replace(":id", user.id.toString()));
  };

  const handleDeleteClick = (user: User) => {
    console.log("Delete user:", user);
  };

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  if (error) {
    return (
      <ErrorMessage error={error} />
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 rounded-xl p-10 text-center">
        <p className="text-zinc-500 dark:text-zinc-400">
          {search ? `No se encontraron usuarios que coincidan con "${search}".` : "No se encuentran usuarios."}
        </p>
      </div>
    );
  }

  return (
    <>
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
            {users.map((user) => (
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
                <UserInfoField label="Empresa" value={user.company} isTableColumn />
                <UserInfoField label="Ciudad" value={user.city} isTableColumn />
                <td className="px-6 py-4 text-right">
                  <UserActions
                    user={user}
                    onShowDetails={handleShowDetails}
                    onDelete={handleDeleteClick}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid md:hidden grid-cols-1 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 space-y-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <UserAvatar name={user.name} className="w-12 h-12 text-lg" />
              <div className="flex-1">
                <div className="font-bold text-lg">{user.name}</div>
                <div className="text-sm text-zinc-500">{user.email}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <UserInfoField label="Empresa" value={user.company} />
              <UserInfoField label="Ciudad" value={user.city} />
            </div>
            <UserActions
              user={user}
              onShowDetails={handleShowDetails}
              onDelete={handleDeleteClick}
              isMobile
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default UserList;