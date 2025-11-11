import axiosInstance from "@/utils/axiosInstance";

export const getHotels = async () => {
  const response = await axiosInstance.get("/hotel");
  return response.data;
};

export const getImageHotels = async () => {
  const response = await axiosInstance.get("/hotel/image");
  return response.data;
};

export const getHotelByNameContain = async (hotelName: string) => {
  const response = await axiosInstance.get("/hotel/search", {
    params: { hotelName },
  });
  return response.data;
};

export const getHotelById = async (id: number) => {
  const response = await axiosInstance.get(`/hotel/search/${id}`, {
    params: { id },
  });
  return response.data;
}
