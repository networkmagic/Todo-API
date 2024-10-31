const {ToDoService} = require("../service/ToDoService");

class ToDoController {
    constructor() {
        this.todoService = new ToDoService();
    }

    create(body) {
        return this.todoService.create(body);
    }

    update(id, body) {
        return this.todoService.update(id, body);
    }

    delete(id) {
        return this.todoService.delete(id);
    }

    getAll() {
        return this.todoService.getAll();
    }

    getOne(id) {
        return this.todoService.getOne(id);
    }
}

module.exports = {
    ToDoController
}