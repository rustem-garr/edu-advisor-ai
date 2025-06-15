export interface User{
    _id:string, 
    email:string
}

export interface AuthResponse {
    accessToken:string,
    refreshToken:string
}