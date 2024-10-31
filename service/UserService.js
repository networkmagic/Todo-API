// Require modules
const {DatabaseSync} = require('node:sqlite');
const {randomUUID} = require("crypto");

// Import database
const database = new DatabaseSync("./database/todo.sqlite");

class UserService {
    create({username, password, email}) {
        try {
            // Generate new UUID
            const userUUID = randomUUID();

            // Prepare todos insert
            const user = database.prepare("INSERT INTO users (user_id, username, password, email) VALUES (?, ?, ?, ?)");

            // Run todos statement
            user.run(userUUID, username, password, email);

            // Return value
            return {
                response: 'User created successfully'
            };
        } catch (error) {
            // Return with error
            return error;
        }
    }

    update(todo_id, {todo_text, expire_at}) {
        try {
            // Update statement
            const query = database.prepare("UPDATE todos SET todo_text = ?, expire_at= ? WHERE todo_id = ? ");

            // Execute query
            query.run(todo_text, expire_at, todo_id);

            // Return value
            return {
                response: 'User updated successfully'
            };
        } catch (error) {
            // Return with error
            return error;
        }
    }

    delete(id) {
        try {
            // Delete query
            const query = database.prepare("DELETE FROM todos WHERE todo_id = ?");

            // Execute query
            query.run(id);

            // Return value
            return {
                response: 'User deleted successfully'
            };
        } catch (error) {
            // Return with error
            return error;
        }
    }

    getAll() {
        try {
            // Get all record from database
            const query = database.prepare('SELECT user_id, username, email FROM users');

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
            const query = database.prepare('SELECT user_id, username, email FROM users WHERE user_id = ?');

            // Return with query
            return query.all(id);
        } catch (error) {
            // Return with error
            return error;
        }
    }
}

module.exports = {
    UserService
};