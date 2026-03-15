import UserForm from '../features/user/components/UserForm';
import type { CreateUser, UpdateUser } from '../features/user/interface/user.interface';

const CreateUserPage = () => {
  
  const handleCreateUser = (data: CreateUser | UpdateUser) => {
    console.log('Creando nuevo usuario:', data);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-300 mb-8 text-center">Crear Nuevo Usuario</h1>
      <UserForm onSubmit={handleCreateUser} submitLabel="Crear Usuario" />
    </div>
  );
};

export default CreateUserPage;
