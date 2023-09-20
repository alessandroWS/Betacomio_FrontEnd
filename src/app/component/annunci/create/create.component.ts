import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalServiceService } from '../../../service/modal-service.service';
import { Injectable, Optional } from '@angular/core';

import { Category, responseCategory } from '../../../model/models';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {



  annuncioForm: FormGroup;

  errorMessage: string = "";

  okMessage: string = "";





  categories: Category[] | undefined = [];

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, @Optional() public modalService: ModalServiceService) {
    this.annuncioForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      standardCost: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9@#$%^&+=!*()-_€.,]*$/)]],
      productNumber: [generateRandomProductNumber()],
      productCategoryName: ['', Validators.required],
      productCategoryId: [null],  // Aggiungi questa riga per l'ID della categoria
      description: ['', [Validators.required, Validators.minLength(8)]],
    });
    function generateRandomProductNumber(): string {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return result;
    }
  }
  ngOnInit(): void {
    this.loadCategories();

  }

  private loadCategories(): void {
    this.http.get<responseCategory>('http://localhost:5067/api/ProductCategory/GetAll', { observe: "response" }).subscribe(
      (response) => {
        this.categories = response.body?.data;
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      });
  }

  submitForm() {

    if (this.annuncioForm.valid) {

      this.createComponent();
      this.annuncioForm.reset();
      this.okMessage = 'Articolo Inserito correttamente!';
      this.modalService.openModalOk(this.okMessage);
    } else {
      this.errorMessage = 'Valorizza tutti i campi richiesti';
      this.modalService.openModal(this.errorMessage);
    }


  }

  createComponent() {
    this.http.post<Response>('http://localhost:5067/api/Product/Add', this.annuncioForm.value).subscribe(
      (response) => {

        console.log(this.annuncioForm);

        //window.location.reload();
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
        console.log(this.annuncioForm);

      }
    );
  }

  onCategoryChange(event: any) {
    const selectedCategoryName = event.target.value;
    const selectedCategory = this.categories?.find(category => category.name === selectedCategoryName);

    if (selectedCategory) {
      this.annuncioForm.patchValue({
        productCategoryId: selectedCategory.productCategoryId
      });
    }
  }


}

