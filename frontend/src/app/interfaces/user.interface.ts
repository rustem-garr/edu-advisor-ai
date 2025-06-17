export interface User{
    _id:string, 
    email:string
}

export interface AuthData {
    accessToken:string,
    refreshToken:string
}

export interface StandardResponse<T> {
  success: boolean;
  data: T;
}