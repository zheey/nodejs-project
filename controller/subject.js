'use strict'

const {create, findAll} = require("../dataAccess/subject")

const { createTransaction, getAllData}  =  require("./globalController");

const CREATESUBJECT = (req, res, next) =>{

    const req_array = ["name"];
    createTransaction(req, res, req_array, "subject", create)

}

const RETRIEVESUBJECTS = (req, res, next) =>{

    getAllData(req, res, "subjects", findAll)

}

module.exports = {
    CREATESUBJECT, RETRIEVESUBJECTS
}