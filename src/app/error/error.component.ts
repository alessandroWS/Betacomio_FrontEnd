import { Component } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  constructor(public hideFoot: AppRoutingModule) {}

  ngOnInit(): void {
    // Imposta hideFooter su true per nascondere il footer su questa pagina
    this.hideFoot.hideFooter = true;
  }
}
