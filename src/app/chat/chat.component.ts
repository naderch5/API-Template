import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../user/register.service';
import { Subscription, interval, switchMap } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  recentMessages:any[]
  currentChat: any[]
  newMessageContent:""
  newConnections: any[]
  recipientId: number
  currentUser= JSON.parse(localStorage.getItem('currentUser')).userId;
  intervalSubscription: Subscription;

  constructor(private cs :RegisterService) { }

  ngOnInit(): void {
    this.getCoversations();
    this.startInterval();

    interval(2000)
    .pipe(
      switchMap(() => this.cs.getMessages())
    )
    .subscribe(data => {
      const filteredMessages = data.filter(message =>
        (message.sender.userId !== this.currentUser) || !data.some(otherMessage =>
          otherMessage.sender.userId === message.recipient.userId
        )
      );

      const latestMessages = Object.values(filteredMessages.reduce((acc, message) => {
        if (!acc[message.sender.userId] || acc[message.sender.userId].createdAt < message.createdAt) {
          acc[message.sender.userId] = message;
        }
        return acc;
      }, {}));

      this.recentMessages = latestMessages;
    });
    this.cs.getNewConnections(this.currentUser).subscribe(data=>{
      this.newConnections=data
    })
  }
  private getCoversations(): void {
    this.cs.getMessages().subscribe(data=>{
      const filteredMessages = data.filter(message =>
        (message.sender.userId !== this.currentUser) || !data.some(otherMessage =>
          otherMessage.sender.userId === message.recipient.userId
        )
      );

      const latestMessages = Object.values(filteredMessages.reduce((acc, message) => {
        if (!acc[message.sender.userId] || acc[message.sender.userId].createdAt < message.createdAt) {
          acc[message.sender.userId] = message;
        }
        return acc;
      }, {}));

      this.recentMessages = latestMessages;
    });
  }
  private startInterval(): void {
    this.intervalSubscription = interval(2000)
      .pipe(
        switchMap(() => this.cs.getChat(this.recipientId))
      )
      .subscribe(data => {
        this.currentChat = data;
      });
  }

  private stopInterval(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  setCurrentChat(id: number) {
    this.stopInterval(); // Stop previous interval subscription
    this.recipientId = id;
    this.cs.getChat(id).subscribe(data => {
      this.currentChat = data;
    });
    this.startInterval(); // Start new interval subscription
  }
  sendMessage() {
    // Implement logic to send message using this.newMessageContent
    // For example:
    this.cs.sendMessage({senderId: this.currentUser,recipientId: this.recipientId,content:this.newMessageContent}).subscribe(response => {
        this.setCurrentChat(this.recipientId);
        this.cs.getNewConnections(this.currentUser).subscribe(data=>{
          this.newConnections=data
        })
    });
    // Clear the input field after sending message
    this.newMessageContent = '';
  }

}
