import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';


import { MatPaginator } from '@angular/material/paginator';

import { PageEvent } from '@angular/material/paginator';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent {

  likes: Like[] | undefined = [];
  paginator!: MatPaginator;
  filteredArray: any[] | undefined = []

defaultRecords: any = 8;


onPaginateChange(data:any) {
  this.filteredArray = this.likes?.slice(0, data.pageSize);
}
  public pageslice: Like[] | undefined = []; // Inizializza pageslice con un array vuoto

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadlikes(); // Chiamata per caricare i prodotti iniziali
    this.filteredArray = this.likes?.slice(0, this.defaultRecords);
  }

  private loadlikes(): void {
    this.http.get<responseLike>('http://localhost:5067/Likes/GetAllLike', { observe: 'response' }).subscribe(
      (response) => {
        this.likes = response.body?.data;
        console.log('Fetched likes:', this.likes);
        this.pageslice = this.likes?.slice(0, 8); // Imposta la paginazione iniziale
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      }
    );
  }

  onPageChange(event: PageEvent) {
    if (this.likes) {
      const startIndex = event.pageIndex * event.pageSize;
      let endIndex = startIndex + event.pageSize;
      if (endIndex > this.likes.length) {
        endIndex = this.likes.length;
      }
      this.pageslice = this.likes.slice(startIndex, endIndex);
    }
  }
  




}


export interface Like {
  productName: string,
  price: string,
  productId: number,
  categoryName: string
  userId: number
}

export interface responseLike {
  data: Like[],
  success: boolean,
  message: string
}
