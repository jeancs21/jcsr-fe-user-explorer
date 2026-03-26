import { useParams, Link } from "react-router-dom";
import { useGetUserById } from "../hooks";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import ErrorMessage from "../../../components/ui/ErrorMessage";
import GoBackLink from "../../../components/ui/GoBackLink";
import UserAvatar from "../../../components/ui/UserAvatar";
import UserInfoField from "./UserInfoField";
import { AppRoutes } from "../../../router/routes.enum";

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id) : null;
  const { user, isLoading, error } = useGetUserById(userId);
  
  const editUrl = AppRoutes.EDIT_USER.replace(":id", id || "");


  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !user) {
    return (
      <div className="flex flex-col justify-center items-center gap-6">
        <ErrorMessage error={error || "User not found"} />
        <GoBackLink className="w-64">Volver al listado</GoBackLink>
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
            <p className="text-zinc-500 text-sm font-medium">
              User ID: #{user.id}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <GoBackLink>Volver al listado</GoBackLink>
          <Link
            to={editUrl}
            className="flex-1 flex items-center justify-center px-6 py-3 text-white bg-amber-700 hover:bg-amber-800 rounded-lg text-base font-medium transition-colors shadow-lg shadow-amber-500/20"
          >
            Editar
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Correo electrónico", value: user.email },
          { label: "Teléfono", value: user.phone },
          { label: "Empresa", value: user.company },
          { label: "Ciudad", value: user.city },
        ].map((field) => (
          <UserInfoField
            key={field.label}
            label={field.label}
            value={field.value}
          />
        ))}
      </div>
    </div>
  );
};

export default UserDetail;
