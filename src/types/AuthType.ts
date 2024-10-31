export type User = {
  error: unknown; 
  path?: undefined; 
  token?: undefined;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | 'other'; 
  image: string;
  accessToken: string; // JWT access token
  refreshToken: string; // Refresh token
};

export type AuthResponse = 
  | { token: string | number;
     path: string;
      error?: undefined
     }
  | { error: unknown; 
    path?: undefined; 
    token?: undefined }
  | undefined;