export class ChatbotModel {
	_id: number;
    name: string;
    description: string;
    image: string;
    agent_type: string;
    agent_name: string;
    auth_info: string;
    constructor(name:string,description:string,image:string,agent_type: string,agent_name:string,auth_info: string) {
    	this._id = 0;
    	this.name = name;
        this.description = description;
    	this.image = image;
        this.agent_type = agent_type;
        this.agent_name = agent_name;
        this.auth_info = auth_info;
    }
}