'use strict'

var express = require('express');
var companyController = require ('../controllers/company.controller');
var api = express.Router();

//Company routes
api.post('/saveCompany', companyController.saveCompany);
api.put('/updateCompany/:id', companyController.updateCompany);
api.delete('/removeCompany/:id', companyController.removeCompany);



module.exports = api;