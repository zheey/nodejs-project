'use strict';

const Model = require('../models/index')
const User_test = Model.user_test;
const User_test_subject = Model.user_test_subject;
const Test = Model.test;
const Test_subject = Model.test_subject;
const Subject = Model.subject;
const Exam_body = Model.exam_body;

const create = (data, transaction = null) =>{
    return User_test.create(data, transaction)
        .then((user_scholarship) => {
            user_scholarship = JSON.parse(JSON.stringify(user_scholarship))
            if(!user_scholarship.errors){
                return {...user_scholarship}
            }else{
                throw user_scholarship.errors
            }
        }).catch(err =>{
            return {errors: err.toString()}
        })
}

const createTestWithSubject = (data, transaction = null) =>{
    return User_test.create({userId: data.userId, testId: data.testId}, transaction)
        .then((user_scholarship) => {
            user_scholarship = JSON.parse(JSON.stringify(user_scholarship))
            if(!user_scholarship.errors){

                let subjectData = data.subjects.map((subject) => (
                    {userTestId: user_scholarship.id, testSubjectId: subject}

                    )
                )
                return User_test_subject.bulkCreate(subjectData, transaction).then((user_test_subject) => {
                    user_test_subject = JSON.parse(JSON.stringify(user_test_subject))
                    if(!user_test_subject.errors){
                        console.log("subject",user_scholarship, subjectData, user_test_subject)

                        return {...user_scholarship}
                    }else{
                        throw user_test_subject.errors
                    }
                }).catch(err =>{
                    return {errors: err.toString()}
                })

            }else{
                throw user_scholarship.errors
            }
        }).catch(err =>{
            return {errors: err.toString()}
        })
}

const getAll = (query = null) =>{
    let db_query;
    if (query === null) {
        db_query = User_test.findAll({
            include:[
                {model: Test, include: [{model: Exam_body }]}]});
    } else {
        db_query = User_test.findAll({
            where: query,
            include:[
                {model: Test, include: [{model: Exam_body }]}
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

const getOne = (query = null) =>{
    let db_query;
    db_query = User_test.findOne({
            where: query,
            include:[
                {model: Test}
            ]
        });


    return db_query.then(query_resp => {
        query_resp = JSON.parse(JSON.stringify(query_resp))
        console.log(query_resp)
        if (!query_resp.errors) {
           return User_test_subject.findAll({
                where: {userTestId: query.id},
                include:[
                    {model: Test_subject, include:[{model: Subject}]}
                ]}).then(subject_resp => {
                subject_resp = JSON.parse(JSON.stringify(subject_resp))
                console.log(subject_resp)
                if (!subject_resp.errors) {
                    query_resp["subjects"] = subject_resp
                    return  query_resp

                } else {
                    throw query_resp.errors;
                }
            }).catch(err => {
                console.log(err)
                return {errors: err.toString()}
            })
        } else {
            throw query_resp.errors;
        }
    }).catch(err => {
        console.log(err)
        return {errors: err.toString()}
    })
};

const updateOne = (query, transaction = null) => {
    query = JSON.parse(JSON.stringify(query))
    const id = query.userTestId
    delete query["userTestId"]
    return User_test.update(
        query ,
        { where: { id }}
        , { returning: true, plain: true }, transaction).then((user_test) => {
        user_test = JSON.parse(JSON.stringify(user_test))
        if(!user_test.errors){
            return user_test
        }else{
            return  {errors: user_test.errors.toString()}
        }
    }).catch(err => {
        return  {errors: err.toString()}
    })
};


module.exports = {
    create, createTestWithSubject, getAll, getOne, updateOne
};