import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../component/message/modal/modal.component'
import { OkModalComponent } from '../component/message/ok-modal/ok-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  private dialogRef: MatDialogRef<ModalComponent> | null = null;

  constructor(private dialog: MatDialog) {}

  // gestisco modale di errore
  openModal(message: string): void {
    this.dialogRef = this.dialog.open(ModalComponent, {
      //width: '400px', // Imposta la larghezza della modale
      data: { message }, // Passa il testo dinamico come parametro
    });
  }

  // gestisco modale di successo
  openModalOk(message: string): void {
    this.dialogRef = this.dialog.open(OkModalComponent, {
      //width: '400px', // Imposta la larghezza della modale
      data: { message }, // Passa il testo dinamico come parametro
    });
  }

  closeModal(): void {
    this.dialogRef?.close();
  }
}
