import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[] = [];
  paginationDetails: { currentPage: number, pageSize: number, totalCount: number, totalPages: number};
  likesParam: string;
  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.likesParam = 'Likers'
    this.loadUsers(1, 5);
  }

  loadUsers(currentPage?, itemsPerPage?) {
    //console.log(this.likesParam);
    this.userService.getUsers(currentPage, itemsPerPage, null, this.likesParam).subscribe((data: any) => { 
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
