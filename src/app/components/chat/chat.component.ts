import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {


message :String;
  constructor(private chatService: ChatService) { 
    this.chatService.loadMessages()
      .subscribe(res =>{
        console.log(res);
      });

  }
  

  ngOnInit(): void {
  }


  send_message(){
    console.log(this.message);
  }

}
