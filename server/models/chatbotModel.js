module.exports = class ChatbotModel {
    constructor(name,description,image,agent_type,agent_name,auth_info) {
        // always initialize all instance properties
        this.name = name;
        this.description = description;
        this.image = image;
        this.agent_type = agent_type;
        this.agent_name = agent_name;
        this.auth_info = auth_info;
    }          
}