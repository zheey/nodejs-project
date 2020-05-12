'use strict';

const Model = require('../models/index')
const User_answer = Model.user_answer;
const Test = Model.test;

const create = (data, transaction = null) =>{
    return User_answer.create(data, transaction)
        .then((user_answer) => {
            user_answer = JSON.parse(JSON.stringify(user_answer))
            if(!user_answer.errors){
                return {...user_answer}
            }else{
                throw user_answer.errors
            }
        }).catch(err =>{
            return {errors: err.toString()}
        })
}

const getAll = (query = null) =>{
    let db_query;
    if (query === null) {
        db_query = User_answer.findAll({
            include:[
                {model: Test}]});
    } else {
        db_query = User_answer.findAll({
            where: query,
            include:[
                {model: Test}
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
}

module.exports = {
    create, getAll
}