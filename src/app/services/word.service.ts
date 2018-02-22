import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { WordModel } from '../models/word.model';
@Injectable()
export class WordService {

  constructor(private http: Http) { }
  create(model:WordModel) {
    return this.http.post('/api/word', model)
      .map(res => res.json());
  }
  update(id:number,model:WordModel) {
    return this.http.put('/api/word/'+id, model)
      .map(res => res.json());
  }

  delete(id:number) {
  	return this.http.delete('/api/word/'+id)
      .map(res => res.json());
  }

  list() {
    return this.http.get('/api/word')
      .map(res => res.json());  
  }
  search(textModel) {
    return this.http.post('/api/word/search', textModel)
      .map(res => res.json());    
  }
}
