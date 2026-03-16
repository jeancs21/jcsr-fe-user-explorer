import { useState } from "react";
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
      return true;
    } catch (err) {
      setError("Error deleting user.");
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
