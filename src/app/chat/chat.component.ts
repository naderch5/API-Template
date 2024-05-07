import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../user/register.service';

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

  constructor(private cs :RegisterService) { }

  ngOnInit(): void {
    this.cs.getMessages().subscribe(data=>{
      this.recentMessages=data
    });
    this.cs.getNewConnections(this.currentUser).subscribe(data=>{
      this.newConnections=data
    })
  }
  setCurrentChat(id: number){
    this.recipientId=id;
    this.cs.getChat(id).subscribe(data=>{
      this.currentChat=data;
    })
  }
  sendMessage() {
    // Implement logic to send message using this.newMessageContent
    // For example:
    this.cs.sendMessage({senderId: this.currentUser,recipientId: this.recipientId,content:this.newMessageContent}).subscribe(response => {
        this.setCurrentChat(this.recipientId);
    });
    // Clear the input field after sending message
    this.newMessageContent = '';
  }

}
