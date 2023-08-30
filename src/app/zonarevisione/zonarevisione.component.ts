import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zonarevisione',
  templateUrl: './zonarevisione.component.html',
  styleUrls: ['./zonarevisione.component.css']
})
export class ZonarevisioneComponent implements OnInit {

  requestAdmins: RequestAdmin[] | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadRequestAdmin();
  }

  private loadRequestAdmin(): void {
    this.http.get<responseRequestAdmin>('http://localhost:5067/AdminRequest/GetAll', { observe: "response"}).subscribe(
      (response) => {
        this.requestAdmins = response.body?.data;
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      });
  }

  acceptRequest(idRequest:number, isAccepted:boolean, idUser:number): void {
    const requestId = idRequest;
    const status = isAccepted;
    const userId = idUser;

    // Chiamata HTTP per accettare la richiesta
    this.updateRequestStatus(requestId, status, userId);
  }

  rejectRequest(idRequest:number, isAccepted:boolean, idUser:number): void {
    const requestId = idRequest;
    const status = isAccepted;
    const userId = idUser;

    // Chiamata HTTP per accettare la richiesta
    this.updateRequestStatus(requestId, status, userId);
  }

  private updateRequestStatus(
    requestId: number,
    status: boolean,
    userId: number
  ): void {
    this.http.get<responseRequestAdmin>('http://localhost:5067/AdminRequest?id=' + requestId, { observe: "response"}).subscribe(
      (response) => {
        this.requestAdmins = response.body?.data;
      },
      (error) => {
        console.error('Errore nel recupero dei dati:', error);
      });
  }


}


export interface RequestAdmin{
  userId:number,
  idRequest:number,
  date: Date,
  user: User
}

export interface User{
 username: string
}


export interface responseRequestAdmin {
  data:  RequestAdmin[],
  success: boolean,
  message: string
}

