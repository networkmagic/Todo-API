const {GroupService} = require("../service/GroupService");

class GroupController {
    constructor() {
        this.groupService = new GroupService();
    }

    create(body) {
        return this.groupService.create(body);
    }

    update(id, body) {
        return this.groupService.update(id, body);
    }

    delete(id) {
        return this.groupService.delete(id);
    }

    getAll() {
        return this.groupService.getAll()
    }

    getOne(id) {
        return this.groupService.getOne(id);
    }
}

module.exports = {
    GroupController
};