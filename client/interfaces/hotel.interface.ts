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
  owner: {
    id: number;
    fullName: string;
    email: string;
  };
  status: HotelStatus;
  createdAt: string;
}
