import { LoginRequest, RegisterRequest } from "@/interfaces/auth.interface";
import axiosInstance from "@/utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const loginAPI = async (request: LoginRequest) => {
  try {
    const response = await axiosInstance.post("/auth/login", request);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Sai email hoặc mật khẩu" };
  }
};

export const getAllUser = async () => {
  const response = await axiosInstance.get("/auth");
  return response.data;
}

export const getUserProfile = async () => {
  const token = await AsyncStorage.getItem("ACCESS_TOKEN");
  if (!token) throw new Error("Không tìm thấy token");

  const res = await axiosInstance.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};