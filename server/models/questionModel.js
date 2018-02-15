module.exports = class QuestionModel {
    constructor(practice_id,type,title,subtitle, choices, answer) {
        // always initialize all instance properties
        this.practice_id = practice_id;
        this.type = type;
        this.title = title;
        this.subtitle = subtitle;
        this.choices = choices;
        this.answer = answer;
    }           
}