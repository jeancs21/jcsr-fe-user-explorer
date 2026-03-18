import { useParams } from "react-router-dom";
import { useGetUserById } from "../features/user/hooks";
import UserAvatar from "../components/ui/UserAvatar";
import UserInfoField from "../features/user/components/UserInfoField";
import GoBackLink from "../components/ui/GoBackLink";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id) : null;
  const { user, isLoading, error } = useGetUserById(userId);

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  if (error || !user) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
        <p className="text-red-600 dark:text-red-400 font-medium mb-6">{error || "User not found"}</p>
        <GoBackLink>Volver al listado</GoBackLink>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
        <div className="flex items-center space-x-4">
          <UserAvatar name={user.name} className="w-16 h-16 text-2xl" />
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{user.name}</h2>
            <p className="text-zinc-500 text-sm font-medium">User ID: #{user.id}</p>
          </div>
        </div>
        <GoBackLink>Volver al listado</GoBackLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Email", value: user.email },
          { label: "Phone", value: user.phone },
          { label: "Company", value: user.company },
          { label: "City", value: user.city },
        ].map((field) => (
          <UserInfoField key={field.label} label={field.label} value={field.value} />
        ))}
      </div>
    </div>
  );
};

export default UserDetailPage;