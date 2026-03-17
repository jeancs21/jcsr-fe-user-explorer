import { useState, useEffect, useCallback } from "react";
import type { User } from "../interface/user.interface";
import { getUsers } from "../services/user.services";

export const useGetUsers = (search?: string, city?: string, company?: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUsers(search, city, company);
      setUsers(data);
    } catch (err) {
      setError("Error fetching users. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [search, city, company]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, isLoading, error, refetch: fetchUsers };
};
