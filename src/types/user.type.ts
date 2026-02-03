export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: "CUSTOMER" | "ADMIN" | "SELLER";
  phone: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface IUpdateProfile {
  name?: string;
  phone?: string;
}
