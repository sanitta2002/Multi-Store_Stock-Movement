import { useMutation } from "@tanstack/react-query";
import { LoginUser, registerUser } from "../services/authService";

export const useUserSignUp = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: LoginUser,
  });
};
