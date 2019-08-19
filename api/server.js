const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const projectRouter = require('../project/project-router.js');

const restricted = require('../auth/restricted-middleware.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', projectRouter);

module.exports = server;
