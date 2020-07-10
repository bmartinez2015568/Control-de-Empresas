'use strict'

var Employee = require('../models/employee.model');

function saveEmployee(req, res){
    var employee = new Employee();
    var params = req.body;


    if(params.name && params.lastname &&
        params.role && params.departament &&
        params.phone && params.email){


            Employee.findOne({$or: [{email:params.email},{phone: params.phone}]}, (err, employeeOk)=>{
                if(err){
                        res.status(500).send({message: 'Error', err});
                }else if (employeeOk){
                        res.send({message: 'Correo o telefono en uso'});
                }else{
                        employee.name = params.name;
                        employee.lastname = params.lastname;
                        employee.role = params.role;
                        employee.departament = params.departament;
                        employee.phone = params.phone;
                        employee.email = params.email;

                        employee.save((err, employeeSaved)=>{
                            if(err){
                                res.status(500).send({message: 'Error', err});
                        }else if (employeeSaved){
                                res.send({message: 'Empleado guardado', employee: employeeSaved});
                        }else{
                            res.status(418).send({message: 'Error al guardar', err});
                        }
                })
            }
        })
}
}

function updateEmployee(req, res){
    let employeeId = req.params.id;
    var update = req.body;

    Employee.findByIdAndUpdate (employeedId, update, {new: true}, (err, employeeUpdated)=>{
    if(err){
        res.status(500).send({message: 'Error', err});

    }else if(employeeUpdated){
        res.send({message: 'Actualizacion exitosa', employee: employeeUpdated});
    }else{
        res.status(404).send({message: 'Empleado no actualizado'})
    }
})
}

function removeEmployee(req, res){
    let employeeId = req.params.if;

    Employee.findByIdAndRemove(employeeId, (err, employeeRemoved)=>{
        if(err){
            res.status(500).send({message: 'error', err});

        }else if(employeeRemoved){
            res.send({message: 'Empleado Eliminado', employee: employeeRemoved})
        }else{
            res.status(404).send({message: 'Error al eliminar', employee: employeeRemoved});
        }
    })
}

module.exports = {
    removeEmployee,
    updateEmployee,
    saveEmployee
}