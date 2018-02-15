export class QuestionModel {
	_id: number;
    practice_id: number;
    type: string;
    title: string;
    subtitle: string;
    choices: any;
    answer: string;

    constructor(practice_id:number,type:string,title:string,subtitle:string,choices:any,answer:string) {
    	this._id = 0;
        this.practice_id = practice_id;
        this.type = type;
    	this.title = title;
    	this.subtitle = subtitle;
        this.choices = choices;
        this.answer = answer;
    }
}
 