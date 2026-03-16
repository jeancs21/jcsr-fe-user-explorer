import { useState } from "react";
import { toast } from "react-toastify";
import type { UpdateUser } from "../interface/user.interface";
import { updateUser } from "../services/user.services";

export const useUpdateUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpdateUser = async (id: number, userData: UpdateUser) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      await updateUser(id, userData);
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
