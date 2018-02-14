import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CategoryModel } from '../models/category.model';
@Injectable()
export class CategoryService {

  constructor(private http: Http) { }
  create(model:CategoryModel) {
    return this.http.post('/api/category', model)
      .map(res => res.json());
  }
  update(id:number,model:CategoryModel) {
    return this.http.put('/api/category/'+id, model)
      .map(res => res.json());
  }

  delete(id:number) {
  	return this.http.delete('/api/category/'+id)
      .map(res => res.json());
  }

  list() {
    return this.http.get('/api/category')
      .map(res => res.json());  
  }
}
