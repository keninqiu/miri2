module.exports = class QuestionModel {
    constructor(type,topic,text, voice, image, choice, answer) {
        // always initialize all instance properties
        this.type = type;
        this.topic = topic;
        this.text = text;
        this.voice = voice;
        this.image = image;
        this.choice = choice;
        this.answer = answer;
    }           
}