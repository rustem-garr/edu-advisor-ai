export interface User{
    _id:string, 
    email:string,
    fullname:string
}

export interface AuthData {
    accessToken:string,
    refreshToken:string,
    user: User
}

export interface StandardResponse<T> {
  success: boolean;
  data: T;
}