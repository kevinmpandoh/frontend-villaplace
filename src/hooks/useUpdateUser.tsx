// hooks/useUpdateUser.ts
import { useState } from "react";
import { updateUser } from "../services/userService";
import { User } from "../types/User";

export const useUpdateUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleUpdateUser = async (id: string, data: Omit<User, "_id">) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updateUser(id, data);
      setSuccess(true);

      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // const handleUploadProfilePicture = async (id: string, file: File) => {
  //   setLoading(true);
  //   setError(null);
  //   setSuccess(false);

  //   try {
  //     const result = await uploadProfilePicture(id, file);
  //     setSuccess(true);

  //     return result;
  //   } catch (err: any) {
  //     setError(err);
  //     throw err;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return { handleUpdateUser, loading, error, success };
};
