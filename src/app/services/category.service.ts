import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CategoryModel } from '../models/category.model';
@Injectable()
export class CategoryService {

  constructor(private http: Http) { }
  create(model:CategoryModel) {
  	console.log('start create');
  	console.log(model);
    return this.http.post('/api/category', model)
      .map(res => res.json());
  }
  update(id:number,model:CategoryModel) {
  	console.log('start update');
  	console.log(model);
    return this.http.put('/api/category/'+id, model)
      .map(res => res.json());
  }

  delete(id:number) {
  	console.log('id for delete is:' + id);
  	return this.http.delete('/api/category/'+id)
      .map(res => res.json());
  }

  list() {
    return this.http.get('/api/category')
      .map(res => res.json());  
  }
}
