'use strict'

const {create, findAll} = require("../dataAccess/exam_body")

const { createTransaction, getAllData}  =  require("./globalController");

const CREATEEXAM = (req, res, next) =>{

    const req_array = ["name"];
    createTransaction(req, res, req_array, "exam body", create)

}

const RETRIEVEEXAMS = (req, res, next) =>{

    getAllData(req, res, "exam body", findAll)

}

module.exports = {
    CREATEEXAM, RETRIEVEEXAMS
}