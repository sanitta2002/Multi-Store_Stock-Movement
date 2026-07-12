import { AxiosError } from "axios";
import { AxiosInstance } from "../axios/axios";
import { API_ROUTES } from "../constants/api";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface loginPayload {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterPayload) => {
  const response = await AxiosInstance.post(API_ROUTES.REGISTER, data);
  return response.data;
};

export const LoginUser = async (data: loginPayload) => {
  try {
    const response = await AxiosInstance.post(API_ROUTES.LOGIN, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error( error.response?.data.message ,{ cause: error });
    }
  }
};