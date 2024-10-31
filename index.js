// Import Swagger UI
const {setup, serve} = require('swagger-ui-express');

// Import YAML parser
const {parse} = require('yaml');

// Import body parser
const {json} = require("body-parser");

// Import readFileSync
const {readFileSync} = require("node:fs");

// Require ToDoController
const {ToDoController} = require("./controller/ToDoController");

// Require UserController
const {UserController} = require("./controller/UserController");

// Require GroupController
const {GroupController} = require("./controller/GroupController");

// Require Express.js
const express = require('express');

// Create new Express app
const app = express();

// Load the YAML file
const yamlDocument = readFileSync("./swagger/swagger.yaml", {encoding: "utf8"});

// Server config
const config = {
    port: 8080,
    host: 'localhost',
}

// Swagger UI middleware
app.use('/api-docs', serve);

// Body parser middleware
app.use(json());

// Setup and serve Swagger UI
app.get('/api-docs', setup(parse(yamlDocument)));

// Get todos by id
app.get('/api/todo/:id', (req, res) => {
    // Get URL parameters
    const {id} = req.params;

    // Create new ToDoController
    const todoController = new ToDoController();

    // Return with response
    res.json(todoController.getOne(id));
});

// Get user by id
app.get('/api/user/:id', (req, res) => {
    // Get URL parameters
    const {id} = req.params;

    // Create new UserController
    const userController = new UserController();

    // Return with response
    res.json(userController.getOne(id));
});

// Get group by id
app.get('/api/group/:id', (req, res) => {
    // Get URL parameters
    const {id} = req.params;

    // Create new GroupController
    const groupController = new GroupController();

    // Return with response
    res.json(groupController.getOne(id));
});

// List all todos
app.get('/api/todo', (req, res) => {
    // Create new ToDoController
    const todoController = new ToDoController();

    // Return with response
    res.json(todoController.getAll());
});

// List all groups
app.get('/api/group', (req, res) => {
    // Create new GroupController
    const groupController = new GroupController();

    // Return with response
    res.json(groupController.getAll());
});

// List all list
app.get('/api/user', (req, res) => {
    // Create new GroupController
    const userController = new UserController();

    // Return with response
    res.json(userController.getAll());
});

// Create new todos
app.post('/api/todo', (req, res) => {
    // Get request body
    const {body} = req;

    // Create new ToDoController
    const todoController = new ToDoController();

    // Return with response
    res.json(todoController.create(body));
});

// Create new group
app.post('/api/group', (req, res) => {
    // Get request body
    const {body} = req;

    // Create new GroupController
    const groupController = new GroupController();

    // Return with response
    res.json(groupController.create(body));
});

// Create new user
app.post('/api/user', (req, res) => {
    // Get request body
    const {body} = req;

    // Create new UserController
    const userController = new UserController();

    // Return with response
    res.json(userController.create(body));
});

// Update todos by id
app.put('/api/todo/:id', (req, res) => {
    // Get URL parameters
    const {id} = req.params;

    // Get request body
    const {body} = req;

    // Create new ToDoController
    const todoController = new ToDoController();

    // Return with response
    res.json(todoController.update(id, body));
});

// Update user by id
app.put('/api/user/:id', (req, res) => {
    // Get URL parameters
    const {id} = req.params;

    // Get request body
    const {body} = req;

    // Create new UserController
    const userController = new UserController();

    // Return with response
    res.json(userController.update(id, body));
});

// Update group by id
app.put('/api/group/:id', (req, res) => {
    // Get URL parameters
    const {id} = req.params;

    // Get request body
    const {body} = req;

    // Create new GroupController
    const groupController = new GroupController();

    // Return with response
    res.json(groupController.update(id, body));
});

// Delete todos by id
app.delete('/api/todo/:id', (req, res) => {
    // Get URL parameters
    const {id} = req.params;

    // Create new ToDoController
    const toDoController = new ToDoController();

    // Return with response
    res.json(toDoController.delete(id));
});

// Update user by id
app.delete('/api/user/:id', (req, res) => {
    // Get URL parameters
    const {id} = req.params;

    // Create new UserController
    const userController = new UserController();

    // Return with response
    res.json(userController.delete(id));
});

// Update group by id
app.delete('/api/group/:id', (req, res) => {
    // Get URL parameters
    const {id} = req.params;

    // Create new GroupController
    const groupController = new GroupController();

    // Return with response
    res.json(groupController.delete(id));
});

// Listen for requests
app.listen(config, () => {
    // Listen port message
    console.log(`Server is running on port ${config.port}`);

    // Swagger UI message
    console.log(`Swagger UI available at http://${config.host}:${config.port}/api-docs`);
});