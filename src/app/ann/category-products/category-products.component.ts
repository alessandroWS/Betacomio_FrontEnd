import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent {
  products: Product[] | undefined = [];
  productCategoryId: number | null = null;



  constructor(private route: ActivatedRoute, private http:HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productIdParam = params.get('productCategoryId');
      if (productIdParam !== null) {
        this.productCategoryId = +productIdParam;
        console.log(this.productCategoryId);
      } else {
      }
    });
    this.loadProducts();
  }


  private loadProducts(): void {
    this.http.get<responseProduct>('http://localhost:5067/api/Product/category/'+this.productCategoryId, { observe: 'response' }).subscribe(
      (response) => {
        this.products = response.body?.data;
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      }
    );
  }

  like(productName: string, price: string, userId: number, productNumber: number, categoryName: string) : void {

    const addlikedto = {
      productName : productName,
      price : price,
      productNumber : productNumber,
      userId : userId,
      categoryName: categoryName

    }


    this.http.post<Response>('http://localhost:5067/Likes', addlikedto, { observe: "response"}).subscribe(
      (response) => {
        console.log(response);

      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      }
    );
  }



}



export interface Product {
  productId: number;
  name: string;
  standardCost: number;
  ProductNumber: string;
  Color:string;
  ListPrice:number;
  Size:string;
  Weight: string;
  ProductCategoryID:number;
  ProductModelID:number;
  SellStartDate: Date;
  SellEndDate: Date;
  DiscontinuedDate: Date;
  ThumbNailPhoto: string;
  ThumbnailPhotoFileName: string;
  modifiedDate: Date;
  productCategory: ProductCategory
}

export interface ProductCategory {
  productCategoryId : number;
  name : string;
}

export interface responseProduct {
  data: Product[],
  success: boolean,
  message: string
}
