'use strict'

const {create, getAll} = require("../dataAccess/user_answer")

const { createUserTransaction, getAllUserData}  =  require("./globalController");

const CREATESUBJECTANSWERS = (req, res, next) =>{

    const req_array = ["userTestSubjectId", "content"];
    createUserTransaction(req, res, req_array, "User answer", create)

}

const GETALLSUBJECTANSWERS = (req, res, next) =>{
    getAllUserData(req, res, "User answer", getAll)
}

module.exports = {
    CREATESUBJECTANSWERS, GETALLSUBJECTANSWERS
}