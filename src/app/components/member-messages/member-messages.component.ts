import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'src/app/interfaces/Message';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[] = [];
  newMessage: any = {};
  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = this.authService.currentUser.id;
    this.userService.getMessageThread(this.authService.currentUser.id, this.recipientId)
                    .pipe(
                      tap((messages: Message[]) => {
                        for (let i = 0; i < messages.length; i++) {
                          if (messages[i].isRead === false && messages[i].recipientId === currentUserId)
                          this.userService.markAsRead(currentUserId, messages[i].id);
                          //console.log('message read');
                        }
                      })
                    )
                    .subscribe( (resp: any) => {
                      this.messages = resp;
                      console.log(resp);
                    }, error => console.log(error));
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.currentUser.id, this.newMessage).subscribe( (resp: Message) => {
      this.messages.unshift(resp);
      this.newMessage.content = '';
      console.log(resp);
    }, error => console.log(error));
  }

}
