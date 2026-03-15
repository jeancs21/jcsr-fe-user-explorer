import * as yup from 'yup';

export const userFormSchema = yup.object({
  name: yup.string().required('El nombre es obligatorio').min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: yup.string().required('El correo es obligatorio').email('Ingresa un correo válido'),
  phone: yup.string().required('El teléfono es obligatorio'),
  company: yup.number().typeError('La empresa es obligatoria').required('La empresa es obligatoria'),
  city: yup.number().typeError('La ciudad es obligatoria').required('La ciudad es obligatoria'),
}).required();
