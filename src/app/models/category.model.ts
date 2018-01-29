export class CategoryModel {
	_id: number;
    language: string;
    name: string;
    image: string;
    constructor(language:string,name:string,image:string) {
    	this._id = 0;
    	this.language = language;
    	this.name = name;
    	this.image = image;
    }
}