export class WordModel {
	_id: number;
    text: string;
    voice: string;
    image: string;
    constructor(text:string,voice:string,image:string) {
    	this._id = 0;
    	this.text = text;
    	this.voice = voice;
    	this.image = image;
    }
}