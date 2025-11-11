export enum HotelStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
}

export interface Hotel {
  id: number;
  name: string;
  description?: string;
  address: string;
  city: string;
  country: string;
  starRating?: number;
  image: string[];
  reviews: number;
  price: number;
  owner: {
    id: number;
    fullName: string;
    email: string;
  };
  status: HotelStatus;
  createdAt: string;
}

export interface HotelImage {
  imageId: number;
  imageUrl: string;
  hotel: Hotel;
}
