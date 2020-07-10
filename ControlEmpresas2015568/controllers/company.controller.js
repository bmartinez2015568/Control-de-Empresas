'use strict'

var Company = require('../models/company.model');

function saveCompany(req, res){

    var company = new Company();
    var params = req.body;

    if(params.name &&
        params.address &&
        params.phone &&
        params.email){
            Company.findOne({$or:[{name: params.name}, {email: params.email}]}, (err, companyOk) =>{
            if(err){
                res.status(500).send({message: 'Error', err});
            }if(companyOk){
                res.send({message: 'Nombre o correo ya en uso'});
            }else{
                company.name = params.name;
                company.address = params.address;
                company.phone = params.phone;
                company.email = params.email
    
    
                company.save((err, companySaved)=>{
                        if(err){
                            res.status(500).send({message: 'Error'});
                        }else if(companySaved){
                            res.send({message: 'Compañia creada', company: companySaved});
                        }else{
                            res.status(418).send({message: 'Compañia no guardado'});
                        }
                    })

                }
            })
            }else{
                res.send({message: 'Ingrese todos los campos necesarios.'});
            }
        }

        function updateCompany(req, res){
            let companyId = req.params.id;
            var update = req.body;

            Company.findByIdAndUpdate (companyId, update, {new: true}, (err, companyUpdated)=>{
            if(err){
                res.status(500).send({message: 'Error', err});

            }else if(companyUpdated){
                res.send({message: 'Actualizacion exitosa', company: companyUpdated});
            }else{
                res.status(404).send({message: 'Compañia no actualizada'})
            }
        })
    }

        function removeCompany(req, res){
            let companyId = req.params.if;

            Company.findByIdAndRemove(companyId, (err, companyRemoved)=>{
                if(err){
                    res.status(500).send({message: 'error', err});

                }else if(companyRemoved){
                    res.send({message: 'Compañia Eliminada', company: companyRemoved})
                }else{
                    res.status(404).send({message: 'Error al eliminar', company: companyRemoved});
                }
            })
        }

            module.exports ={
                saveCompany,
                updateCompany,
                removeCompany
            }