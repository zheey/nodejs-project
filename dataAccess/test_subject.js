'use strict';

const Model = require('../models/index')
const ExamSubject = Model.test_subject
const Subject = Model.subject

const create = (data) => {
    return ExamSubject.findOrCreate({
        where: {examBodyId: data.examBodyId, subjectId: data.subjectId},
        defaults: {examBodyId: data.examBodyId, subjectId: data.subjectId, cutoff: data.cutoff,
            isCompulsory: data.isCompulsory, questionSize: data.questionSize}
    }).then(([examSubject, created]) => {
        const examSubjectResp = examSubject.get({plain: true})
        return {...examSubjectResp}
    }).catch(err => {
        return {errors: err.toString()}
    })
}

const getAll = (query = null) =>{
    let db_query;
    if (query === null) {
        db_query = ExamSubject.findAll({
            include:[
                {model: Subject}
            ]});
    } else {
        db_query = ExamSubject.findAll({
            where: query,
            include:[
                {model: Subject}
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