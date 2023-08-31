import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatPaginator } from '@angular/material/paginator';

import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  products: Product[] | undefined = [];
  paginator!: MatPaginator;
  filteredArray: any[] | undefined = []

defaultRecords: any = 8;


onPaginateChange(data:any) {
  this.filteredArray = this.products?.slice(0, data.pageSize);
}
  public pageslice: Product[] | undefined = []; // Inizializza pageslice con un array vuoto

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadProducts(); // Chiamata per caricare i prodotti iniziali
    this.filteredArray = this.products?.slice(0, this.defaultRecords);

  }

  private loadProducts(): void {
    this.http.get<responseProduct>('http://localhost:5067/api/Product/GetAll', { observe: 'response' }).subscribe(
      (response) => {
        this.products = response.body?.data;
        console.log('Fetched products:', this.products);
        this.pageslice = this.products?.slice(0, 8); // Imposta la paginazione iniziale
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      }
    );
  }

  onPageChange(event: PageEvent) {
    if (this.products) {
      const startIndex = event.pageIndex * event.pageSize;
      let endIndex = startIndex + event.pageSize;
      if (endIndex > this.products.length) {
        endIndex = this.products.length;
      }
      this.pageslice = this.products.slice(startIndex, endIndex);
    }
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



export interface ProductCategory {
  productCategoryId : number;
  name : string;
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
  ModifiedDate: Date;
  productCategory: ProductCategory
}

export interface responseProduct {
  data: Product[],
  success: boolean,
  message: string
}
