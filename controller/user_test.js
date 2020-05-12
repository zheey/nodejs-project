'use strict';

const {ErrorResp, SuccessResponse}  = require("../global/ResponseHandlers");

const {create, createTestWithSubject,  getAll, getOne, updateOne} = require("../dataAccess/user_test");

const { createUserTransaction, getAllUserData, getAllData}  =  require("./globalController");

const sequelize = require("../models/index").sequelize;

const CREATEUSERSCHOLARSHIP = (req, res, next) =>{

    const req_array = ["testId"];
    createUserTransaction(req, res, req_array, "User test", create)

}

const GETALLUSERTEST = (req, res, next) =>{
    getAllUserData(req, res, "User test", getAll)
}

const GETUSERTESTWITHSUBJECT = (req, res, next) =>{
    getAllData(req, res, "User test", getOne)
}

const CREATEUSERSCHOLARSHIPWITHSUBJECT = (req, res, next) =>{

    const req_array = ["testId", "subjects"];
    createUserTransaction(req, res, req_array, "User test and subject", createTestWithSubject)

};

const UpdateUserTest = (req, res, status) => {

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
        return SuccessResponse(res, "User test has been updated.", resp, 200);
    }).catch(err => {
        return ErrorResp(res, err.toString(), 400);
    });
};

module.exports = {
    CREATEUSERSCHOLARSHIP, CREATEUSERSCHOLARSHIPWITHSUBJECT, GETALLUSERTEST, GETUSERTESTWITHSUBJECT, UpdateUserTest
}