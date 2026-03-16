import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '../../../components/ui/inputs/TextField';
import Button from '../../../components/ui/Button';
import { userFormSchema } from '../schemas/userFormSchema';
import type { CreateUser, UpdateUser } from '../interface/user.interface';

type UserFormData = CreateUser | UpdateUser;

interface UserFormProps {
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => void;
  submitLabel?: string;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, submitLabel = 'Guardar' }) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-lg mx-auto p-6 bg-black dark:bg-zinc-900 shadow-xl rounded-xl border border-zinc-100 dark:border-zinc-800">
      <TextField
        label="Nombre Completo"
        placeholder="Ej. Juan Pérez"
        {...register('name')}
        error={errors.name?.message}
      />

      <TextField
        label="Correo Electrónico"
        placeholder="Ej. juan.perez@example.com"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <TextField
        label="Teléfono"
        placeholder="Ej. 809-555-0101"
        {...register('phone')}
        error={errors.phone?.message}
      />

      <TextField
        label="Empresa"
        placeholder="Ej. Tech Solutions RD"
        {...register('company')}
        error={errors.company?.message}
      />

      <TextField
        label="Ciudad"
        placeholder="Ej. Santo Domingo"
        {...register('city')}
        error={errors.city?.message}
      />

      <Button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
        {submitLabel}
      </Button>
    </form>
  );
};

export default UserForm;
