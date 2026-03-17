import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '../../../components/ui/inputs/TextField';
import Button from '../../../components/ui/Button';
import { userFormSchema } from '../schemas/userFormSchema';
import type { CreateUser } from '../interface/user.interface';
import { useCreateUser } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../router/routes.enum';

interface UserFormProps {
  submitLabel?: string;
}

const UserForm: React.FC<UserFormProps> = ({ submitLabel = 'Guardar' }) => {
  const { handleCreateUser, isSubmitting, success } = useCreateUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateUser>({
    resolver: yupResolver(userFormSchema),
  });

  useEffect(() => {
    if (success) {
      reset();
      const timer = setTimeout(() => {
        navigate(AppRoutes.HOME);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, reset, navigate]);

  const onFormSubmit = async (data: CreateUser) => {
    await handleCreateUser(data);
  };


  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="flex flex-col gap-4 max-w-lg mx-auto p-6 bg-white dark:bg-zinc-900 shadow-xl rounded-xl border border-zinc-100 dark:border-zinc-800"
    >
      <TextField
        label="Nombre Completo"
        placeholder="Ej. Juan Pérez"
        {...register('name')}
        error={errors.name?.message}
        disabled={isSubmitting}
      />

      <TextField
        label="Correo Electrónico"
        placeholder="Ej. juan.perez@example.com"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        disabled={isSubmitting}
      />

      <TextField
        label="Teléfono"
        placeholder="Ej. 809-555-0101"
        {...register('phone')}
        error={errors.phone?.message}
        disabled={isSubmitting}
      />

      <TextField
        label="Empresa"
        placeholder="Ej. Tech Solutions RD"
        {...register('company')}
        error={errors.company?.message}
        disabled={isSubmitting}
      />

      <TextField
        label="Ciudad"
        placeholder="Ej. Santo Domingo"
        {...register('city')}
        error={errors.city?.message}
        disabled={isSubmitting}
      />

      <Button
        type="submit"
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Guardando...' : submitLabel}
      </Button>
    </form>
  );
};

export default UserForm;
