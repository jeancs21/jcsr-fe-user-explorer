import { useState } from "react";
import { toast } from "react-toastify";
import type { User } from "../interface/user.interface";

export const useUpdateUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpdateUser = async (id: number, userData: Omit<User, 'id'>) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      console.log(`Updating user ${id} with data:`, userData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      toast.success("¡Usuario actualizado exitosamente!");
      return true;
    } catch (err) {
      const errorMessage = "Error al actualizar el usuario. Por favor verifica los datos.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetState = () => {
    setSuccess(false);
    setError(null);
  };

  return {
    handleUpdateUser,
    isSubmitting,
    error,
    success,
    resetState
  };
};
