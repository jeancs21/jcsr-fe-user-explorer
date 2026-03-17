import * as yup from 'yup';

export const userFormSchema = yup.object({
  name: yup.string().required('El nombre es obligatorio').min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: yup.string().required('El correo es obligatorio').email('Ingresa un correo válido'),
  phone: yup.string()
    .required('El teléfono es obligatorio')
    .matches(/^[0-9]+$/, 'El teléfono solo debe contener números')
    .max(15, 'El teléfono debe tener máximo 15 caracteres'),
  company: yup.string().required('La empresa es obligatoria'),
  city: yup.string().required('La ciudad es obligatoria'),
}).required();
