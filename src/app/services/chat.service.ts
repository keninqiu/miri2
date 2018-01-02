import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class Message {
  constructor(public content: string, public sentBy: string) {}
}

@Injectable()
export class ChatService {
  conversation = new BehaviorSubject<Message[]>([]);
  
  constructor() { }

  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);
    /*
    return this.client.textRequest(msg)
               .then(res => {
                  const speech = res.result.fulfillment.speech;
                  const botMessage = new Message(speech, 'bot');
                  this.update(botMessage);
               });
    */
  }
  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

}
