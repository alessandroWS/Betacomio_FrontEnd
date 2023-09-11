import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {register} from 'swiper/element/bundle';
import { AuthService } from 'src/app/login/auth.service';

import { Pagination, Autoplay } from 'swiper/modules'
import SwiperCore from 'swiper'

SwiperCore.use([Autoplay]);


@Component({
  selector: 'app-singlepage',
  templateUrl: './singlepage.component.html',
  styleUrls: ['./singlepage.component.css']
})
export class SinglepageComponent implements AfterViewInit, OnInit {
  product: Product | undefined;

  productId: number | null = null;

  constructor(private route: ActivatedRoute, private http:HttpClient, public BasicAuth: AuthService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productIdParam = params.get('productId');
      if (productIdParam !== null) {
        this.productId = +productIdParam;
        console.log(this.productId);
      } else {
      }
    });
    this.loadProducts();
  }

  private loadProducts(): void {
    this.http.get<responseProduct>('http://localhost:5067/api/Product/'+this.productId, { observe: 'response' }).subscribe(
      (response) => {
        this.product = response.body?.data;
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      }
    );
  }




  ngAfterViewInit(): void {
    register();
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
  data: Product,
  success: boolean,
  message: string
}
