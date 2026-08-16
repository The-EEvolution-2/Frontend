export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  bio: string;
  avatarUrl?: string;
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
