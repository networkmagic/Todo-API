// Require modules
const {DatabaseSync} = require('node:sqlite');
const {randomUUID} = require("crypto");

// Import database
const database = new DatabaseSync("./database/todo.sqlite");

class ToDoService {
    create({user_id, group_id, todo_text, expire_at}) {
        try {
            // Generate new UUID
            const todoUUID = randomUUID();

            // Prepare todos insert
            const todo = database.prepare("INSERT INTO todos (todo_id, group_id, todo_text, expire_at) VALUES (?, ?, ?, ?)");

            // Prepare group insert
            const group = database.prepare("INSERT INTO user_todos (user_id, todo_id) VALUES (?, ?)")

            // Run todos statement
            todo.run(todoUUID, group_id, todo_text, expire_at);

            // Run group statement
            group.run(user_id, todoUUID);

            // Return value
            return {
                response: 'ToDo created successfully'
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
                response: 'ToDo updated successfully'
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
                response: 'ToDo deleted successfully'
            };
        } catch (error) {
            // Return with error
            return error;
        }
    }

    getAll() {
        try {
            // Get all record from database
            const query = database.prepare('SELECT todo_id, group_id, todo_text, created_at, expire_at FROM todos');

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
            const query = database.prepare('SELECT todo_id, group_id, todo_text, created_at, expire_at FROM todos WHERE todo_id = ?');

            // Return with query
            return query.all(id);
        } catch (error) {
            // Return with error
            return error;
        }
    }
}

module.exports = {
    ToDoService
}