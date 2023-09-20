export interface Category {
  productCategoryId: number;
  name: string;
  img: string;
}

export interface ProductCategory {
  productCategoryId: number;
  name: string;
}

export interface Product {
  productId: number;
  name: string;
  standardCost: number;
  ProductNumber: string;
  Color: string;
  ListPrice: number;
  Size: string;
  Weight: string;
  ProductCategoryID: number;
  ProductModelID: number;
  SellStartDate: Date;
  SellEndDate: Date;
  DiscontinuedDate: Date;
  ThumbNailPhoto: string;
  ThumbnailPhotoFileName: string;
  productCategory: ProductCategory;
}

export interface responseProduct {
  data: Product[];
  success: boolean;
  message: string;
}

export interface responseCategory {
  data: Category[];
  success: boolean;
  message: string;
}



export interface responseLike {
  data: Like[];
  success: boolean;
  message: string;
}

export interface GetOrderDto {
  id: number;
  productName: string;
  quantity: number;
  price: number;
  dateOrder: Date;
  phone: number;
}

export interface OldOders {
  customerID: 0;
  emailAddress: string;
  salesOrderID: 0;
  salesOrderDetailID: 0;
  orderDate: Date;
  orderQty: number;
  productID: number;
  name: string;
  price: number;
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

export interface RequestAdmin {
  userId: number;
  idRequest: number;
  date: Date;
  user: User;
}

export interface User {
  username: string;
}

export interface responseRequestAdmin {
  data: RequestAdmin[];
  success: boolean;
  message: string;
}

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


export interface responseProductCategory {
  data: ProductCategory;
  success: boolean;
  message: string;
}

export interface Like {
  IdLike: number,
  productName: string,
  price: string,
  productId: number,
  categoryName: string
  userId: number
}

export interface responseRequestAdminCount {
  data: number;
  success: boolean;
  message: string;
}
