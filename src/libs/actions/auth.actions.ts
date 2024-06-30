import { api } from "@/libs/utils/api";
import { toFormData } from "@/libs/utils/formData";

// Interfaces
import { AuthSigIn } from "@/libs/interfaces";

const signInAction = async ({ email, password }: AuthSigIn) => {
  const formData = toFormData({ username: email, password });

  const response = await api.post(`/auth/sign-in`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status !== 200) return null;
  return response.data;
};

const logOutAction = async () => {
  const response = await api.delete(`/api/logout`);
  if (response.status !== 200) return null;
  return response.data;
};

export { signInAction, logOutAction };
