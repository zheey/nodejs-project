'use strict';

const Model = require('../models/index')
const Sequelize = require('../models').sequelize;
const ExamYear = Model.exam_year
const Question = Model.question
const Option = Model.option
const TestSubject = Model.test_subject
const Test = Model.test
const ExamBody = Model.exam_body

const create = (data, transaction=null) =>{
    return TestSubject.findOne({where: {id: data.testSubjectId}, include: [{model: ExamBody}]}).then((testSubject)=>{
        testSubject = JSON.parse(JSON.stringify(testSubject))
        if(testSubject) {
            if(!testSubject.errors) {
                return ExamYear.findOrCreate({
                    where: {examBodyId: testSubject.exam_body.id, yearId: data.yearId},
                    defaults: {examBodyId: data.examBodyId, yearId: data.yearId}
                }).then(([examYear, created]) => {
                    const examYearResp = examYear.get({plain: true})
                    data["meta"] = {examYear: examYearResp.id}
                    return Question.create(data, transaction).then((question) => {

                        question = JSON.parse(JSON.stringify(question))
                        if (!question.errors) {
                            return {...question}
                        } else {
                            throw question.errors
                        }
                    }).catch(err => {
                        return {errors: err.toString()}
                    })
                }).catch(err => {
                    return {errors: err.toString()}
                })
            }else{
                throw testSubject.errors
            }

        }else{
            return {errors: "Test subject does not exist"}
        }
    }).catch(err => {
        return {errors: err.toString()}
    })
}

/*const createWithOption = (data, transaction=null) =>{
    return ExamYear.findOrCreate({
        where: {examId: data.examId, yearId: data.yearId},
        defaults: {examId: data.examId, yearId: data.yearId}
    }).then(([examYear, created]) => {
        const examYearResp = examYear.get({plain: true})
        data["examYearId"] = examYearResp.id
        return Question.create(data, transaction).then((question) => {

            question = JSON.parse(JSON.stringify(question))
            if(!question.errors){
                return {...question}
            }else{
                throw question.errors
            }
        }).catch(err => {
            return {errors: err.toString()}
        })

    }).catch(err => {
        return {errors: err.toString()}
    })
}*/

const bulkCreateWithOption = (data, transaction=null) =>{
    return TestSubject.findOne({where: {id: data.testSubjectId}, include: [{model: ExamBody}]}).then((testSubject)=>{
        testSubject = JSON.parse(JSON.stringify(testSubject))
        if(testSubject) {
            if(!testSubject.errors) {
                return ExamYear.findOrCreate({
                    where: {examBodyId: testSubject.exam_body.id, yearId: data.yearId},
                            defaults: {examBodyId: data.examBodyId, yearId: data.yearId}
                        }).then(([examYear, created]) => {
                            const examYearResp = examYear.get({plain: true})

                            let questionArray = data.questions
                            for(let questionObj of questionArray){
                                questionObj["meta"] = {examYear: examYearResp.id}
                                questionObj["testSubjectId"] = data.testSubjectId
                            }

                            return Question.bulkCreate(questionArray, transaction).then((question) => {

                                question = JSON.parse(JSON.stringify(question))
                                if(!question.errors){
                                    return question
                                }else{
                                    throw question.errors
                                }
                            }).catch(err => {
                                return {errors: err.toString()}
                            })
                }).catch(err => {
                    return {errors: err.toString()}
                })
                }else{
                    throw testSubject.errors
                }

            }else{
                return {errors: "Test subject does not exist"}
            }

    }).catch(err => {
        return {errors: err.toString()}
    })
}


const getRandomQuestions = (data) => {
    let query = null
    let queryData;

    if(data.examYearId){
        queryData = Question.findAll({where: {testSubjectId: data.testSubjectId, meta: {examYear: data.examYearId}},
            order: Sequelize.fn( 'RANDOM' ), limit: data.limit})
    }else{
       queryData =  Question.findAll({where: {testSubjectId: data.testSubjectId},
            order: Sequelize.fn( 'RANDOM' ), limit: data.limit})
    }
    return queryData.then((questions) => {
            if(!questions.errors){
               return  questions
            }else{
                throw questions.errors
            }
    }).catch(err =>{
        return {errors: err.toString()}
        })
}

module.exports = {
    create, getRandomQuestions, bulkCreateWithOption
}