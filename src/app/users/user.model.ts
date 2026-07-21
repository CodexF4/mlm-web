export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  referralCode: string;
  sponsorId: string | null;
  createdAt: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  sponsorId: string | null;
  referralCode: string | null;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}
