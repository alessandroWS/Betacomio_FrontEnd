import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

import { User, RequestAdmin, responseRequestAdmin } from '../../../model/models'; // Assicurati di utilizzare il percorso corretto

@Component({
  selector: 'app-zonarevisione',
  templateUrl: './zonarevisione.component.html',
  styleUrls: ['./zonarevisione.component.css'],
})
export class ZonarevisioneComponent implements OnInit {
  requestAdmins: RequestAdmin[] | undefined;
  isAdmin: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdminUser();

    if (!this.isAdmin) {
      alert('NON SEI ADMIN');
      console.log('NON SEI ADMIN');
      this.router.navigate(['/home']);
    } else {
      this.loadRequestAdmin();
    }
  }

  private loadRequestAdmin(): void {
    this.http
      .get<responseRequestAdmin>('http://localhost:5067/AdminRequest/GetAll', {
        observe: 'response',
      })
      .subscribe(
        (response) => {
          this.requestAdmins = response.body?.data;
        },
        (error) => {
          console.error('Errore nel recupero dei dati:', error);
        }
      );
  }

  acceptRequest(idRequest: number, isAccepted: boolean, idUser: number): void {
    const requestId = idRequest;
    const status = isAccepted;
    const userId = idUser;

    // Chiamata HTTP per accettare la richiesta
    this.updateRequestStatus(requestId, status, userId);
  }

  rejectRequest(idrequest: number, isaccepted: boolean, userid: number): void {
    const idRequest = idrequest;
    const isAccepted = isaccepted;
    const userId = userid;

    console.log(idRequest);

    // Chiamata HTTP per accettare la richiesta
    this.updateRequestStatus(idRequest, isAccepted, userId);
  }

  private updateRequestStatus(
    idRequest: number,
    isAccepted: boolean,
    userId: number
  ): void {
    const PutReqDto = {
      idRequest: idRequest,
      isAccepted: isAccepted,
      userId: userId,
    };

    console.log(PutReqDto);

    this.http
      .put<any>('http://localhost:5067/AdminRequest/' + idRequest, PutReqDto)
      .subscribe(
        (response) => {
          console.log('welaa');
          this.loadRequestAdmin();
        },
        (error) => {
          console.error('Errore durante la richiesta:', error);
        }
      );
  }
}
