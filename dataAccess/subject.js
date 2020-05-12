'use strict';

const Model = require('../models/index')
const Subject = Model.subject

const create = (data, transaction = null) =>{
    return Subject.create(data, transaction)
        .then((subject) => {
            subject= JSON.parse(JSON.stringify(subject))
            if(!subject.errors){
                return {...subject}
            }else{
                throw subject.errors
            }
        }).catch(err =>{
            return {errors: err.toString()}
        })
}

const findAll = () =>{
    return Subject.findAll().then(subjects => {
        if(!subjects.errors){
            return subjects
        }else{
            throw subjects.errors
        }
    }).catch(err =>{
        return {errors: err.toString()}
    })
}

module.exports ={
    create, findAll
}