import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { map } from "rxjs/operators"; 

import { Message } from "../interface/message.interface";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Message>;
  chats: Message[] = [];
  user : any = {};

  constructor(private afs: AngularFirestore,
              public auth: AngularFireAuth) {
    
    this.auth.authState.subscribe(user =>{
      if(!user) return;

      this.user.nombre = user.displayName;
      this.user.uid    = user.uid;
      console.log(this.user)
    });
  }


  loadMessages(){
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date','desc').limit(5));
    return this.itemsCollection.valueChanges()
                                .pipe(map( messages =>{
                                  this.chats = messages;
                                  this.chats.reverse();
                                }))
  }

  addMessage(text: string){
    let message : Message = {
      name: "DEMO",
      message: text,
      date: new Date().getTime()
    }

    return this.itemsCollection.add(message);
  }

  login(type : string){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }
}
