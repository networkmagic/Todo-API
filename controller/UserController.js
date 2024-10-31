const {UserService} = require("../service/UserService");

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    create(body) {
        return this.userService.create(body);
    }

    update(id, body) {
        return this.userService.update(id, body);
    }

    delete(id) {
        return this.userService.delete(id);
    }

    getAll() {
        return this.userService.getAll();
    }

    getOne(id) {
        return this.userService.getOne(id);
    }
}

module.exports = {
    UserController
};