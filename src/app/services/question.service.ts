import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { QuestionModel } from '../models/question.model';
@Injectable()
export class QuestionService {

  constructor(private http: Http) { }
  create(model:QuestionModel) {
    return this.http.post('/api/question', model)
      .map(res => res.json());
  }
  update(id:number,model:QuestionModel) {

    return this.http.put('/api/question/'+id, model)
      .map(res => res.json());
  }

  delete(id:number) {
  	return this.http.delete('/api/question/'+id)
      .map(res => res.json());
  }

  list() {
    return this.http.get('/api/question')
      .map(res => res.json());  
  }
  details(id) {
    return this.http.get('/api/question/' + id)
      .map(res => res.json());    
  }
}
