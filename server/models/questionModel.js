module.exports = class QuestionModel {
    constructor(practice_id,type,topic,text,word, voice, image, choices, answer) {
        // always initialize all instance properties
        this.practice_id = practice_id;
        this.type = type;
        this.topic = topic;
        this.text = text;
        this.word = word;
        this.voice = voice;
        this.image = image;
        this.choices = choices;
        this.answer = answer;
    }           
}