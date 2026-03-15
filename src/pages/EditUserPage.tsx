import UserForm from '../features/user/components/UserForm';
import type { UserFormData } from '../features/user/schemas/userFormSchema';

const EditUserPage = () => {
  
  const mockUserData: UserFormData = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '809-555-0101',
    company: 'Tech Solutions RD',
    city: 'Santo Domingo',
  };

  const handleEditUser = (data: UserFormData) => {
    console.log('Editando usuario con nuevos datos:', data);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-300 mb-8 text-center">Editar Usuario</h1>
      <UserForm
        initialData={mockUserData}
        onSubmit={handleEditUser}
        submitLabel="Actualizar Usuario"
      />
    </div>
  );
};

export default EditUserPage;
