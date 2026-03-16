import { useState, useEffect, useCallback } from "react";
import type { User } from "../interface/user.interface";
import { getUserById } from "../services/user.services";

export const useGetUserById = (id: number | null) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async (userId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUserById(userId);
      setUser(data);
    } catch (err) {
      setError("Error fetching user details.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id !== null) {
      fetchUser(id);
    }
  }, [id, fetchUser]);

  return { user, isLoading, error, refetch: () => id && fetchUser(id) };
};
