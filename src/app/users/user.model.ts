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
  referralCode: string | null;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
  user: User;
}
