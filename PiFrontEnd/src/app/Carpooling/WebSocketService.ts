import { Injectable } from '@angular/core';
import { Client, Message,Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient!: Client;
  private subject = new Subject<string>();
  constructor() { }

  public async connectAndSubscribe(): Promise<void> {

    const socket = new SockJS('http://localhost:8081/api/topic');
    this.stompClient = Stomp.over(socket);
    this.stompClient.onConnect = (frame) => {
      console.log('Connected to WebSocket');
      this.subscribeToNotifications();
    };
    await this.stompClient.activate();
  }

  private subscribeToNotifications(): void {
    this.stompClient.subscribe('/topic/notification/', (message: Message) => {
      console.log("Message received:", message.body); // Consoler le message
      this.subject.next(message.body);
    });
  }
  

  getMessage(): Subject<string> {
    return this.subject;
  }
}
