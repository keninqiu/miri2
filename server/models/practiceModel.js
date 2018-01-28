module.exports = class CategoryModel {
    constructor(category_id,name,description,image) {
        // always initialize all instance properties
        this.category_id = category_id;
        this.name = name;
        this.description = description;
        this.image = image;
    }          
}