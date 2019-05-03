import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DatingAppFront';
  values: any[] = [];
  constructor(private http: HttpClient) {
    this.http.get('https://localhost:44340/api/values').subscribe((resp: any) => {
      this.values = resp;
      console.log(resp);
    });
  } 
}
