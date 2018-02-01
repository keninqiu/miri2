export class QuestionModel {
	_id: number;
    practice_id: number;
    type: string;
    topic: string;
    text: string;
    voice: string;
    image: string;
    choice: any;
    answer: string;

    constructor(practice_id:number,type:string,topic:string,text:string,voice:string,image:string,choice:any,answer:string) {
    	this._id = 0;
        this.practice_id = practice_id;
        this.type = type;
    	this.topic = topic;
    	this.text = text;
        this.voice = voice;
        this.image = image;
        this.choice = choice;
        this.answer = answer;
    }
}
 