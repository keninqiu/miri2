import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PracticeModel } from '../models/practice.model';
@Injectable()
export class PracticeService {

  constructor(private http: Http) { }
  create(model:PracticeModel) {
    return this.http.post('/api/practice', model)
      .map(res => res.json());
  }
  update(id:number,model:PracticeModel) {

    return this.http.put('/api/practice/'+id, model)
      .map(res => res.json());
  }

  delete(id:number) {
  	console.log('id for delete is:' + id);
  	return this.http.delete('/api/practice/'+id)
      .map(res => res.json());
  }

  list() {
    return this.http.get('/api/practice')
      .map(res => res.json());  
  }
  details(id) {
    return this.http.get('/api/practice/' + id)
      .map(res => res.json());    
  }
}
