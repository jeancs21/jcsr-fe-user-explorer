import UserForm from '../features/user/components/UserForm';

const CreateUserPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-300 mb-8 text-center">Crear Nuevo Usuario</h1>
      <UserForm submitLabel="Crear Usuario" />
    </div>
  );
};

export default CreateUserPage;
