import { useState } from "react";
import { toast } from "react-toastify";
import { deleteUser } from "../services/user.services";

export const useDeleteUser = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDeleteUser = async (id: number) => {
    setIsDeleting(true);
    setError(null);
    setSuccess(false);
    try {
      await deleteUser(id);
      setSuccess(true);
      toast.success("¡Usuario eliminado exitosamente!");
      return true;
    } catch (err) {
      const errorMessage = "Error al intentar eliminar el usuario.";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    handleDeleteUser,
    isDeleting,
    error,
    success
  };
};
