import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  model: any = {};
  constructor(public authService: AuthService, private alertifyService: AlertifyService,
              private route: Router) { }

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(res => {
      this.alertifyService.success('logged in');
    }, error => {
      this.alertifyService.error('Failed to login, check credentials.');
    }, () => this.route.navigate(['/members']));
  }

  loggedIn() {
    //**here we can see how chain detection works for app to in sync with data flow */
    // console.log('chain detection active');
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    
    this.alertifyService.warning('log out');
    this.route.navigate(['/home']);
  }

}
