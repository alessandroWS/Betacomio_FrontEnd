import { Component, Inject } from '@angular/core';
import { ModalServiceService } from '../../../service/modal-service.service';
import { BuyComponent } from '../../action/buy/buy.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(public modalService: ModalServiceService, public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
  ) {}




  // openError(): void {

  //   this.modalService.openErrorModal(this.buyCom.errorMessage);
  // }

}
