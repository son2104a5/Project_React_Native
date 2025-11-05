export enum UserGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BANNED = "BANNED",
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  HOTEL_OWNER = "HOTEL_OWNER",
}

export interface User {
  id: number;
  fullName?: string;
  email: string;
  phone?: string;
  passwordHash?: string;
  dateOfBirth?: string;
  gender?: UserGender;
  avatarUrl?: string;
  status: UserStatus;
  createdAt: string;
  updatedAt?: string;
  role?: {
    id: number;
    name: UserRole;
  };
}

