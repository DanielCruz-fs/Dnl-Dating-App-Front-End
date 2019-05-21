import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[] = [];
  paginationDetails: { currentPage: number, pageSize: number, totalCount: number, totalPages: number};
  genderList = [ { value: 'male', display: 'Males' }, { value: 'female', display: 'Females'} ];
  userParams: any = {};
  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userParamsUrl();
    this.loadUsers(1, 5);
  }

  loadUsers(currentPage?, itemsPerPage?) {
    this.userService.getUsers(currentPage, itemsPerPage, this.userParams).subscribe((data: any) => { 
      console.log(data);
      this.users = data.users;
      this.paginationDetails = { currentPage: data.currentPage, pageSize: data.pageSize, 
                                 totalCount: data.totalCount, totalPages: data.totalPages };
    }, error => console.log(error));
  }

  // pagination
  pageChanged(event: any): void {
    this.paginationDetails.currentPage = event.page;
    //console.log(this.paginationDetails.currentPage);
    this.loadUsers(this.paginationDetails.currentPage, this.paginationDetails.pageSize);
  }

  userParamsUrl() {
    this.userParams.gender = this.authService.currentUser.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99; 
  }

  resetFilters() {
    this.userParamsUrl();
    this.loadUsers(1, 5);
  }

}
