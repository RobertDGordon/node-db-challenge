const express = require('express');

const ProjectRouter = require('./projects/router.js');
const ResourceRouter = require('./resources/router.js');
const TaskRouter = require('./tasks/router.js');

const server = express();

server.use(express.json());

server.use('/api/projects', ProjectRouter);
server.use('/api/resources', ResourceRouter);
server.use('/api/tasks', TaskRouter);


server.get('/', (req, res) => {
    res.send('<h3>Server online.</h3>');
  });
  
  server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
      message: 'Something went wrong'
    })
  })

module.exports = server;