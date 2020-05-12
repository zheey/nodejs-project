'use strict'

const {create, getAll} = require("../dataAccess/test_subject")

const { createTransaction, getAllData}  =  require("./globalController");

const CREATEEXAMSUBJECT = (req, res, next) =>{

    const req_array = ["examBodyId", "subjectId", "cutoff", "isCompulsory", "questionSize"];
    createTransaction(req, res, req_array, "Test subject", create)

}

const GETALLEXAMSUBJECT = (req, res, next) =>{
    getAllData(req, res, "Test subjects", getAll)
}

module.exports = {
    CREATEEXAMSUBJECT, GETALLEXAMSUBJECT
}