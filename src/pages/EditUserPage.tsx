import { useParams } from 'react-router-dom';
import UserForm from '../features/user/components/UserForm';
import { useGetUserById } from '../features/user/hooks';

const EditUserPage = () => {
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
      <div className="container mx-auto py-8 px-4 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <p className="text-red-600 dark:text-red-400 font-medium">{error || "Usuario no encontrado"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-300 mb-8 text-center">Editar Usuario</h1>
      <UserForm
        initialData={user}
        submitLabel="Actualizar Usuario"
      />
    </div>
  );
};

export default EditUserPage;
