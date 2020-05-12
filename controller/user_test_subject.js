'use strict'

const {create, bulkCreate, getAll, updateOne, getOne} = require("../dataAccess/user_test_subject")

const { createUserTransaction, getAllData}  =  require("./globalController");
const {ErrorResp, SuccessResponse}  = require("../global/ResponseHandlers");


const sequelize = require("../models/index").sequelize;

const CREATEUSERSCHOLARSHIPEXAM = (req, res, next) =>{

    const req_array = ["userTestId", "testSubjectId"];
    createUserTransaction(req, res, req_array, "User scholarship exam subject", create)

}

const CREATEBULKUSERSCHOLARSHIPEXAM = (req, res, next) =>{

    const req_array = ["userTestId", "subjects"];
    createUserTransaction(req, res, req_array, "User scholarship exams subject", bulkCreate)

}

const GETALLSUBJECTFORATEST = (req, res, next) =>{
    getAllData(req, res, "Registered subjects for a test ", getAll)
};

const GETUSERTESTSUBJECT = (req, res, next) =>{
    getAllData(req, res, "User test subject", getOne)
}

const UpdateUserTestSubject = (req, res, status) => {

    return sequelize.transaction(t => {

        return updateOne(req.body, {transaction: t}).then(user_test => {

            let userTestObj = JSON.parse(JSON.stringify(user_test))

            if (!userTestObj.errors) {
                return  userTestObj
            } else {
                status = 400;
                throw  userTestObj.errors
            }
        });
    }).then((resp) => {
        return SuccessResponse(res, "User test subject has been updated.", resp, 200);
    }).catch(err => {
        return ErrorResp(res, err.toString(), 400);
    });
};

module.exports = {
    CREATEUSERSCHOLARSHIPEXAM, CREATEBULKUSERSCHOLARSHIPEXAM, GETALLSUBJECTFORATEST,UpdateUserTestSubject, GETUSERTESTSUBJECT
}