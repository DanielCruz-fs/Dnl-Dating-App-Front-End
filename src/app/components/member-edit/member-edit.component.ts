import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm') editForm: NgForm;
  constructor(private authService: AuthService, private userService: UserService,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.userService.getUser(this.authService.decodedToken.nameid).subscribe(resp => {
      console.log(resp);
      this.user = resp;
    });
  }

  updateUser() {
    //console.log(this.user);
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe( resp => {
      this.alertifyService.success(`User: ${this.user.username} updated.`);
      this.editForm.reset(this.user);
    }, error => console.log(error));
  }

}
