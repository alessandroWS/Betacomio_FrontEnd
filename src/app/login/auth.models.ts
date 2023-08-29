// auth.models.ts
export interface UserRegisterDto {
    username: string;
    password: string;
  }
  
  export interface UserLoginDto {
    username: string;
    password: string;
  }
  
  export interface ServiceResponse<T> {
    data?: T;
    success: boolean;
    message: string;
  }