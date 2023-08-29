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

}


export interface RequestAdmin{
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
