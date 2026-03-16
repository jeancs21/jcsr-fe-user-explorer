import { useParams, Link } from "react-router-dom";
import { useGetUserById } from "../features/user/hooks";
import UserAvatar from "../components/ui/UserAvatar";
import UserInfoField from "../features/user/components/UserInfoField";
import { AppRoutes } from "../router/routes.enum";
import GoBackLink from "../components/ui/GoBackLink";

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id) : null;
  const { user, isLoading, error } = useGetUserById(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
          <p className="text-red-600 dark:text-red-400 font-medium mb-6">{error || "User not found"}</p>
            <GoBackLink>Back to list</GoBackLink>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="text-lg font-semibold">User Details</h3>
          <Link
            to={AppRoutes.HOME}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex flex-col items-center mb-6">
            <UserAvatar name={user.name} className="w-24 h-24 text-3xl mb-4" />
            <h4 className="text-2xl font-bold text-zinc-900 dark:text-white">{user.name}</h4>
            <p className="text-zinc-500 text-sm">ID: #{user.id}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
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

        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 flex justify-end border-t border-zinc-100 dark:border-zinc-800">
          <GoBackLink>Back to list</GoBackLink>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;