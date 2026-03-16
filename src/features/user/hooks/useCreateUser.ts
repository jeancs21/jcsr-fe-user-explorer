import { useState } from "react";
import { toast } from "react-toastify";
import type { CreateUser } from "../interface/user.interface";
import { createUser } from "../services/user.services";

export const useCreateUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleCreateUser = async (userData: CreateUser) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      await createUser(userData);
      setSuccess(true);
      toast.success("¡Usuario creado exitosamente!");
      return true;
    } catch (err) {
      const errorMessage = "Error al crear el usuario. Por favor verifica los datos.";
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
    handleCreateUser, 
    isSubmitting, 
    error, 
    success,
    resetState
  };
};
