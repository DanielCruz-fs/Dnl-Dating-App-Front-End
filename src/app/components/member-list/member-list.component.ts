import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[] = [];
  paginationDetails: { currentPage: number, pageSize: number, totalCount: number, totalPages: number};
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadUsers(1, 5);
  }

  loadUsers(currentPage?, itemsPerPage?) {
    this.userService.getUsers(currentPage, itemsPerPage).subscribe((data: any) => { 
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

}
