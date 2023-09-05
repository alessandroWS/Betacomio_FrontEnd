import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component'

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  private dialogRef: MatDialogRef<ModalComponent> | null = null;

  constructor(private dialog: MatDialog) {}

  openModal(message: string): void {
    this.dialogRef = this.dialog.open(ModalComponent, {
      //width: '400px', // Imposta la larghezza della modale
      data: { message }, // Passa il testo dinamico come parametro
    });
  }
}