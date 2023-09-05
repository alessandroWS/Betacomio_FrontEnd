import { Component, Inject } from '@angular/core';
import { ModalServiceService } from '../modal-service.service';
import { BuyComponent } from '../buy/buy.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  

  // openError(): void {
    
  //   this.modalService.openErrorModal(this.buyCom.errorMessage);
  // }
  
}
