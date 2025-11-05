import { LoginRequest, RegisterRequest } from "@/interfaces/auth.interface";
import axiosInstance from "@/utils/axiosInstance";

export const register = async (request: RegisterRequest) => {
  try {
    const response = await axiosInstance.post("/auth/register", request);
    return response.data; // { success: true, data: JWTResponse }
  } catch (error: any) {
    // Bắt lỗi từ backend
    if (error.response?.data?.errors) {
      throw error.response.data; // { errors: { email: "...", phone: "..." } }
    }
    throw error.response?.data || { message: "Đã có lỗi xảy ra" };
  }
};

export const login = async (request: LoginRequest) => {
  try {
    const response = await axiosInstance.post("/auth/login", request);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Sai email hoặc mật khẩu" };
  }
};
