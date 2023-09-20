import { Component, Inject } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalServiceService } from '../../../service/modal-service.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-ok-modal',
  templateUrl: './ok-modal.component.html',
  styleUrls: ['./ok-modal.component.css']
})
export class OkModalComponent {

  constructor(public modalService: ModalServiceService, public dialogRef: MatDialogRef<OkModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
  ) {}

}
