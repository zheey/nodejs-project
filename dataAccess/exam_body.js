'use strict';

const Model = require('../models/index')
const Exam_body = Model.exam_body

const create = (data, transaction = null) =>{
    return Exam_body.create(data, transaction)
        .then((exam) => {
            exam = JSON.parse(JSON.stringify(exam))
            if(!exam.errors){
                return {...exam}
            }else{
                throw exam.errors
            }
        }).catch(err =>{
            return {errors: err.toString()}
        })
}

const findAll = () =>{
    return Exam_body.findAll().then(exams => {
        if(!exams.errors){
            return exams
        }else{
            throw exams.errors
        }
    }).catch(err =>{
        return {errors: err.toString()}
    })
}

module.exports ={
    create, findAll
}