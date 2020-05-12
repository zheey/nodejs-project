'use strict';

const Model = require('../models/index')
const Test = Model.test
const Scholarship = Model.scholarship
const Exam = Model.exam_body
const User = Model.user

const create = (data, transaction = null) => {
    return Scholarship.findOrCreate({
        where: {testId: data.testId},
        defaults: {testId: data.testId, userId: data.userId, quantity: data.quantity, hasPaid: data.hasPaid}
    }).then(([scholarship, created]) => {
        if(created){
            const scholarshipResp = scholarship.get({plain: true})
            return {...scholarshipResp}
        }else{
            return {errors: "Test already has a sponsor."}
        }

    }).catch(err => {
        return {errors: err.toString()}
    })
}

const getAll = (query = null) =>{
    let db_query;
    if (query === null) {
        db_query = Scholarship.findAll({
            include:[
                {model: Test, include:[{model: Exam}]},
                {model: User,  as: 'sponsor',  attributes: {
                        exclude: ["updatedAt","createdAt", "password"]
                    }}
            ]});
    } else {
        db_query = Scholarship.findAll({
            where: query,
            include:[
                {model: Test, include:[{model: Exam}]},
                {model: User,  as: 'sponsor', attributes: {
                        exclude: ["updatedAt","createdAt", "password"]
                    }}
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