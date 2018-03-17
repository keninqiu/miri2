import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ChatbotModel } from '../models/chatbot.model';
@Injectable()
export class ChatbotService {

  constructor(private http: Http) { }
  create(model:ChatbotModel) {
    return this.http.post('/api/chatbot', model)
      .map(res => res.json());
  }
  update(id:number,model:ChatbotModel) {
    return this.http.put('/api/chatbot/'+id, model)
      .map(res => res.json());
  }

  delete(id:number) {
  	return this.http.delete('/api/chatbot/'+id)
      .map(res => res.json());
  }

  list() {
    return this.http.get('/api/chatbot')
      .map(res => res.json());  
  }

  details(id) {
    return this.http.get('/api/chatbot/' + id)
      .map(res => res.json());    
  }  
}
