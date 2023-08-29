
export interface GetOrderDto {
    id: number;
    productName: string;
    quantity: number;
    price: number;
    dateOrder: Date;
    phone: number;
  }
  
  export interface AddOrderDto {
    productName: string;
    quantity: number;
    price: number;
    phone: number;
  }
  
  export interface UpdateOrderDto {
    id: number;
    productName: string;
    quantity: number;
    price: number;
    dateOrder: Date;
    phone: number;
  }
  
  export interface ServiceResponse<T> {
    data?: T;
    success: boolean;
    message: string;
  }
  