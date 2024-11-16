export type UserRole = 'admin' | 'farmer' | 'distributor' | 'retailer';

export interface UserAuth {
  email: string;
  role: UserRole;
  isAuthenticated: boolean;
}