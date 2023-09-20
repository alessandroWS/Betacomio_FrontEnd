import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import {AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {register} from 'swiper/element/bundle';
import { AuthService } from '../../../service/auth.service';

import { Pagination, Autoplay } from 'swiper/modules'
import SwiperCore from 'swiper'

SwiperCore.use([Autoplay]);

import { Product, Like, responseLike, responseProduct} from '../../../model/models';


@Component({
  selector: 'app-singlepage',
  templateUrl: './singlepage.component.html',
  styleUrls: ['./singlepage.component.css']
})
export class SinglepageComponent implements AfterViewInit, OnInit {
  product: Product | any;

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


