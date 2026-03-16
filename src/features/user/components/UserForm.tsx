import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '../../../components/ui/inputs/TextField';
import Button from '../../../components/ui/Button';
import { userFormSchema } from '../schemas/userFormSchema';
import type { CreateUser, UpdateUser } from '../interface/user.interface';
import { useCreateUser, useUpdateUser } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../router/routes.enum';

type UserFormData = CreateUser | UpdateUser;

interface UserFormProps {
  initialData?: UserFormData;
  onSubmit?: (data: UserFormData) => void;
  submitLabel?: string;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, submitLabel = 'Guardar' }) => {
  const { handleCreateUser, isSubmitting: isCreating, success: createSuccess } = useCreateUser();
  const { handleUpdateUser, isSubmitting: isUpdating, success: updateSuccess } = useUpdateUser();
  const navigate = useNavigate();

  const isSubmitting = isCreating || isUpdating;
  const success = createSuccess || updateSuccess;
  const isEditMode = !!initialData && 'id' in initialData;

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
      if (!isEditMode) reset();
      const timer = setTimeout(() => {
        navigate(AppRoutes.HOME);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, onSubmit, reset, navigate, isEditMode]);

  const onFormSubmit = async (data: UserFormData) => {
    if (onSubmit) {
      onSubmit(data);
      return;
    }

    if (isEditMode) {
      const updateData = data as UpdateUser;
      await handleUpdateUser(updateData.id, updateData);
    } else {
      await handleCreateUser(data as CreateUser);
    }
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
