import { Injectable } from '@angular/core';

export class Message {
  constructor(public content: string, public sentBy: string) {}
}

@Injectable()
export class ChatService {

  constructor() { }

}
