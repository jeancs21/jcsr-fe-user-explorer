import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '../../../components/ui/inputs/TextField';
import Button from '../../../components/ui/Button';
import { userFormSchema } from '../schemas/userFormSchema';
import type { CreateUser, UpdateUser } from '../interface/user.interface';
import { useCreateUser } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../router/routes.enum';

type UserFormData = CreateUser | UpdateUser;

interface UserFormProps {
  initialData?: UserFormData;
  onSubmit?: (data: UserFormData) => void;
  submitLabel?: string;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, submitLabel = 'Guardar' }) => {
  const { handleCreateUser, isSubmitting, error, success } = useCreateUser();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (success && !onSubmit) {
      reset();
      const timer = setTimeout(() => {
        navigate(AppRoutes.HOME);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, onSubmit, reset, navigate]);

  const onFormSubmit = async (data: UserFormData) => {
    if (onSubmit) {
      onSubmit(data);
      return;
    }

    if (!initialData) {
      await handleCreateUser(data as CreateUser);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-4 max-w-lg mx-auto p-6 bg-white dark:bg-zinc-900 shadow-xl rounded-xl border border-zinc-100 dark:border-zinc-800">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {success && !onSubmit && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-sm text-green-600 dark:text-green-400">
          Usuario creado exitosamente. Redirigiendo...
        </div>
      )}

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
