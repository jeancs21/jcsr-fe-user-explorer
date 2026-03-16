import { useState } from "react";
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
      return true;
    } catch (err) {
      setError("Error creating user. Please check your data.");
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
