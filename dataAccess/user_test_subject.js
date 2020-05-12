'use strict';

const Model = require('../models/index');
const User_test_subject = Model.user_test_subject;
const Test_subject = Model.test_subject;
const Subject = Model.subject;
const User_Scholarship = Model.user_test;
const Test = Model.test;

const create = (data, transaction = null) =>{
    return User_Scholarship.findOne({
        where: {id: data.userTestId}})
        .then((scholarship) =>{
        scholarship = JSON.parse(JSON.stringify(scholarship))
            if(scholarship) {
                if(!scholarship.errors) {
                    return User_test_subject.create(data, transaction)
                    .then((user_scholarship) => {
                        user_scholarship = JSON.parse(JSON.stringify(user_scholarship))
                        if (!user_scholarship.errors) {
                            return {...user_scholarship}
                        } else {
                            throw user_scholarship.errors
                        }
                    }).catch(err => {
                        return {errors: err.toString()}
                    })
                }else{
                    throw scholarship.errors
                }
            }else{
                return {errors: "User exam does not exist"}
            }
    })

}

const bulkCreate = (data, transaction = null) =>{
    return User_Scholarship.findOne({
        where: {id: data.userTestId}})
        .then((scholarship) =>{
            scholarship = JSON.parse(JSON.stringify(scholarship))
            if(scholarship) {
                if (!scholarship.errors) {
                    scholarship = JSON.parse(JSON.stringify(scholarship))
                    let examArray = data.subjects
                    for (let exam of examArray) {
                        exam["userTestId"] = scholarship.id
                    }

                    return User_test_subject.bulkCreate(examArray, transaction)
                        .then((user_scholarship) => {
                            user_scholarship = JSON.parse(JSON.stringify(user_scholarship))
                            if (!user_scholarship.errors) {
                                return user_scholarship
                            } else {
                                throw user_scholarship.errors
                            }
                        }).catch(err => {
                            return {errors: err.toString()}
                        })
                }else{
                    throw scholarship.errors
                }
            }else{
                return {errors: "User exam does not exist"}
            }
        })

}

const getAll = (query = null) =>{
    let db_query;
    if (query === null) {
        db_query = User_test_subject.findAll({
            include:[
                {model: User_Scholarship}]});
    } else {
        db_query = User_test_subject.findAll({
            where: query,
            include:[
                {model: Test_subject, include:[{model: Subject}]}
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

const getAllTestForUser = (query = null) =>{
    let db_query;
    db_query = User_test_subject.findAll({
        where: query,
            include:[{model: User_Scholarship, where: query, include:[{model: Subject}]},
                {model: Test_subject, include:[{model: Subject}]}
            ]
    });

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

const updateOne = (query, transaction = null) => {
    query = JSON.parse(JSON.stringify(query))
    const id = query.userTestSubjectId
    delete query["userTestSubjectId"]
console.log("id", id, query)
    return User_test_subject.update(
        query,
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

const getOne = (query = null) =>{
    let db_query;
        db_query = User_test_subject.findOne({
            where: query,
            include:[{model: User_Scholarship, include: [{model: Test}]},
                {model: Test_subject, include:[{model: Subject}]}
            ]
        });


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

module.exports = {
    create, bulkCreate, getAll, updateOne, getOne
}