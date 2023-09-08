import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as jQuery from 'jquery';
import { Injectable, Optional } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt'; // Assicurati di importare JwtHelperService
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalServiceService } from '../modal-service.service';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from '../login/auth.service';


@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  form: FormGroup; // Dichiarazione del Reactive Form


  nameUser: string | undefined;




  constructor(private formBuilder: FormBuilder, private jwtHelper: JwtHelperService, private route: ActivatedRoute, private http: HttpClient, @Optional() public modalService: ModalServiceService, public BasicAuth: AuthService) {
    this.form = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Valore iniziale vuoto
      quantity: ['1', [Validators.min(0), Validators.max(10)]],
      price: ['', [Validators.required]],
      productName: ['',[Validators.required]],
      address: ['', [Validators.required]],
      city: ['',[Validators.required, Validators.pattern(/^[A-Za-z]+$/u)]],
      firstName: ['',[Validators.required, Validators.pattern(/^[A-Za-z]+$/u)]],
      surname: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/u)]],
      cap: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
    });

    const token = localStorage.getItem('jwtToken');


    if (token !== null) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.nameUser = decodedToken.unique_name; // Assegna il valore a nameid


      // Accedi ai dati dal token
      console.log(decodedToken.nameid); // Stampa il campo 'nameid'
      console.log(decodedToken.unique_name); // Stampa il campo 'unique_name'
      console.log(decodedToken.IsAdmin); // Stampa il campo 'IsAdmin'
    } else {
      console.error('Il token non è presente nel localStorage.');
    }
  }

  errorMessage: string = "";

  okMessage: string = "";

  ngOnInit() {
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
  product: Product | undefined;

  productId: number | null = null;

  private loadProducts(): void {
    this.http.get<responseProduct>('http://localhost:5067/api/Product/' + this.productId, { observe: 'response' }).subscribe(
      (response) => {
        this.product = response.body?.data;
        this.form.patchValue({
          price: this.product?.standardCost.toString() || '', // Utilizza un valore predefinito in caso di null
          productName: this.product?.name || '', // Utilizza un valore predefinito in caso di null
        });
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      }
    );
  }

  submitForm() {
    if (this.form.valid && this.form.get('quantity')?.value > 0) {
      const quantity = this.form.get('quantity')?.value;
      const pricePerUnit = this.form.get('price')?.value;
      const totalPrice = quantity * pricePerUnit; // Calcola il prezzo totale
  
      this.form.patchValue({
        price: totalPrice.toString(), // Aggiorna il campo "price" nel Reactive Form
      });
  
      this.buyComponent();
      this.form.reset();
      this.okMessage = 'Articolo acquistato correttamente!';
      this.modalService.openModalOk(this.okMessage);
    } else if (this.form.get('quantity')?.value <= 0) {
      this.errorMessage = 'Numero pezzi non valido.';
      this.modalService.openModal(this.errorMessage);
    } else {
      this.errorMessage = 'Valorizza tutti i campi richiesti';
      this.modalService.openModal(this.errorMessage);
    }
  }
  



  buyComponent() {
    this.http.post<Response>('http://localhost:5067/api/Order', this.form.value).subscribe(
      (response) => {
        
        console.log(this.form);

      },
      (error: HttpErrorResponse) => {
        console.error('Errore nel recupero dei dati:', error);
        console.log(this.form);

      }
    )
  };



  nameDestinatario: string | undefined;
  nameInput(event: Event) {
    this.nameDestinatario = (<HTMLInputElement>event.target).value

  }

  surnameDestinatario: string | undefined;
  surnameInput(event: Event) {
    this.surnameDestinatario = (<HTMLInputElement>event.target).value
  }


  addressDestinatario: string | undefined;
  isAddressEmpty: boolean = true;
  hasUserInteracted: boolean = false;

  addressInput(event: Event) {
    this.addressDestinatario = (<HTMLInputElement>event.target).value;
    this.hasUserInteracted = true; // Imposta hasUserInteracted su true quando l'utente inizia a scrivere
    this.isAddressEmpty = this.addressDestinatario.trim() === '' || !/^\D+$/.test(this.addressDestinatario);
  }

  cityDestinatario: string | undefined;
  cityInput(event: Event) {
    this.cityDestinatario = (<HTMLInputElement>event.target).value
  }

  CAPDestinatario: string | undefined;
  CAPInput(event: Event) {
    this.CAPDestinatario = (<HTMLInputElement>event.target).value
  }
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
  modifiedDate: Date;
  productCategory: ProductCategory
}

export interface ProductCategory {
  productCategoryId: number;
  name: string;
}

export interface responseProduct {
  data: Product,
  success: boolean,
  message: string
}

