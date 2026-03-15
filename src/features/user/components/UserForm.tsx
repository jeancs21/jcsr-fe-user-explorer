import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '../../../components/ui/inputs/TextField';
import Select from '../../../components/ui/inputs/Select';
import Button from '../../../components/ui/Button';
import { userFormSchema, type UserFormData } from '../schemas/userFormSchema';
import { COMPANY_OPTIONS } from '../services/mockCompanies';
import { CITY_OPTIONS } from '../services/mockCities';

interface UserFormProps {
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => void;
  submitLabel?: string;
}

const UserForm = ({ initialData, onSubmit, submitLabel = 'Guardar' }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-lg mx-auto p-6 bg-white dark:bg-zinc-900 shadow-xl rounded-xl border border-zinc-100 dark:border-zinc-800">
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

      <Select
        label="Empresa"
        options={COMPANY_OPTIONS}
        {...register('company')}
        error={errors.company?.message}
      />

      <Select
        label="Ciudad"
        options={CITY_OPTIONS}
        {...register('city')}
        error={errors.city?.message}
      />

      <Button type="submit" className="mt-4 bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors">
        {submitLabel}
      </Button>
    </form>
  );
};

export default UserForm;
