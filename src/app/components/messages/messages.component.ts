import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/Message';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  paginationDetails: { currentPage: number, pageSize: number, totalCount: number, totalPages: number};
  messages: Message[] = [];
  messageContainer = 'Unread';
  constructor(private userService: UserService, private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.loadMessages(1, 5);
  }

  loadMessages(currentPage?, itemsPerPage?) {
    //console.log(this.likesParam);
    this.userService.getMessages(this.authService.currentUser.id, currentPage, itemsPerPage, this.messageContainer)
                    .subscribe((data: any) => { 
                      console.log(data);
                      this.messages = data.messages;
                      this.paginationDetails = { currentPage: data.currentPage, pageSize: data.pageSize, 
                                                totalCount: data.totalCount, totalPages: data.totalPages };
                    }, error => console.log(error));
  }

  // pagination
  pageChanged(event: any): void {
    this.paginationDetails.currentPage = event.page;
    //console.log(this.paginationDetails.currentPage);
    this.loadMessages(this.paginationDetails.currentPage, this.paginationDetails.pageSize);
  }

  deleteMessage(id: number) {
    this.alertifyService.confirm('Are you sure?', () => {
      this.userService.deleteMessage(id, this.authService.currentUser.id).subscribe( () => {
        this.messages.splice(this.messages.findIndex(m => m.id == id), 1);
        this.alertifyService.success('Message added.');
      }, error => console.log(error));
    });
  }
}
