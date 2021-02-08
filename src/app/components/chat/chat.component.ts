import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {


  message :string;
  element :any;


  constructor(public chatService: ChatService) { 
      this.chatService.loadMessages()
        .subscribe(()=>{
          setTimeout(()=>this.element.scrollTop = this.element.scrollHeight,20)
        })
    }
    
  ngOnInit(): void {
    this.element = document.getElementById('app-mensajes');

  }

  send_message(){
    if (this.message.length ===0) return ;

    this.chatService.addMessage(this.message)
                    .then(() => this.message='')
                    .catch((err) => console.error(err));
  }

}
