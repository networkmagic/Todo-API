// Require modules
const {DatabaseSync} = require('node:sqlite');
const {randomUUID} = require("crypto");

// Import database
const database = new DatabaseSync("./database/todo.sqlite");

class GroupService {
    create({user_id, group_name, description}) {
        try {
            // Generate new UUID
            const groupUUID = randomUUID();

            // Prepare group insert
            const group = database.prepare("INSERT INTO groups (group_id, group_name, description) VALUES (?, ?, ?)");

            // Prepare user group insert
            const user = database.prepare("INSERT INTO user_groups (user_id, group_id, read_access, write_access, modify_access) VALUES (?, ?, ?, ?, ?)")

            // Run group statement
            group.run(groupUUID, group_name, description);

            // Run user statement
            user.run(user_id, groupUUID, 1, 1, 1);

            // Return value
            return {
                response: 'Group created successfully'
            };
        } catch (error) {
            // Return with error
            return error;
        }
    }

    update(group_id, {group_name, description}) {
        try {
            // Update statement
            const query = database.prepare("UPDATE groups SET group_name = ?, description= ? WHERE group_id = ? ");

            // Execute query
            query.run(group_name, description, group_id);

            // Return value
            return {
                response: 'Group updated successfully'
            };
        } catch (error) {
            // Return with error
            return error;
        }
    }

    delete(id) {
        try {
            // Delete query
            const query = database.prepare("DELETE FROM groups WHERE group_id = ?");

            // Execute query
            query.run(id);

            // Return value
            return {
                response: 'Group deleted successfully'
            };
        } catch (error) {
            // Return with error
            return error;
        }
    }

    getAll() {
        try {
            // Get all record from database
            const query = database.prepare('SELECT group_id, group_name, description FROM groups');

            // Return with query
            return query.all();
        } catch (error) {
            // Return with error
            return error;
        }
    }

    getOne(id) {
        try {
            // Get all record from database
            const query = database.prepare('SELECT group_name, description FROM groups WHERE group_id = ?');

            // Return with query
            return query.all(id);
        } catch (error) {
            // Return with error
            return error;
        }
    }
}

module.exports = {
    GroupService
};