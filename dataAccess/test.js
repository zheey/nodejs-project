'use strict';

const Model = require('../models/index')
const Test = Model.test
const Exam = Model.exam_body

const create = (data, transaction = null) =>{
    return Test.create(data, transaction)
        .then((test) => {
            test = JSON.parse(JSON.stringify(test))
            if(!test.errors){
                return {...test}
            }else{
                throw test.errors
            }
        }).catch(err =>{
            return {errors: err.toString()}
        })
}

const getAll = (query = null) =>{
    let db_query;
    if (query === null) {
        db_query = Test.findAll({
            include:[
                {model: Exam}
            ]});
    } else {
        db_query = Test.findAll({
            where: query,
            include:[
                {model: Exam}
            ]
        });
    }

    return db_query.then(query_resp => {
        query_resp = JSON.parse(JSON.stringify(query_resp))
        if (!query_resp.errors) {
            return  query_resp
        } else {
            throw query_resp.errors;
        }
    }).catch(err => {
        return {errors: err.toString()}
    })
};

const getOne = (query = null) =>{

    return Test.findOne({
        where: query,
        include:[
            {model: Exam}
        ]
    }).then(query_resp => {
        query_resp = JSON.parse(JSON.stringify(query_resp))
        if (!query_resp.errors) {
            return  query_resp
        } else {
            throw query_resp.errors;
        }
    }).catch(err => {
        return {errors: err.toString()}
    })
};

module.exports = {
    create, getAll, getOne
}