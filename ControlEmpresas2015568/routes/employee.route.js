'use strict'

var express = require('express');
var employeeController = require('../controllers/employee.controller');
var api = express.Router();


//Employee Routes
api.post('/saveEmployee', employeeController.saveEmployee);
api.put('/updateEmployee/:id', employeeController.updateEmployee);
api.delete('/removeEmployee/:id', employeeController.removeEmployee);

module.exports = api;