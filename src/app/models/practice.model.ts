export class PracticeModel {
	_id: number;
    category_id: number;
    name: string;
    description: string;
    image: string;
    constructor(category_id:number,name:string,description:string,image:string) {
    	this._id = 0;
        this.category_id = category_id;
        this.name = name;
    	this.description = description;
    	this.image = image;
    }
}