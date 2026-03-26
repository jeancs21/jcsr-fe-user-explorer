import { useParams } from 'react-router-dom';
import UserForm from '../features/user/components/UserForm';
import { useGetUserById } from '../features/user/hooks';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import GoBackLink from '../components/ui/GoBackLink';

const EditUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id, 10) : null;
  const { user, isLoading, error } = useGetUserById(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-lg mx-auto mt-10">
        <ErrorMessage error={error || 'Usuario no encontrado'} />
        <div className="mt-4">
          <GoBackLink>Volver al listado</GoBackLink>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <GoBackLink>Volver al listado</GoBackLink>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Editar Usuario</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Actualiza la información del usuario {user.name}
        </p>
      </div>

      <UserForm
        submitLabel="Actualizar Usuario"
        initialData={user}
        userId={user.id}
      />
    </div>
  );
};

export default EditUserPage;
