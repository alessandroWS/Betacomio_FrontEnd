import { Component } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.css']
})
export class SessionExpiredComponent {

  constructor(public hideFoot: AppRoutingModule) {}

  ngOnInit(): void {
    // Imposta hideFooter su true per nascondere il footer su questa pagina
    this.hideFoot.hideFooter = true;
  }

}
