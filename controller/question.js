'use strict'

const {create, getRandomQuestions, bulkCreateWithOption} = require("../dataAccess/question")

const { createTransaction, retrieveData}  =  require("./globalController");

const CREATEONEQUESTION = (req, res, next) =>{

    const req_array = ["testSubjectId", "yearId", "content"];
    createTransaction(req, res, req_array, "Question", create)

}

const CREATEONEQUESTIONWITHOPTION = (req, res, next) =>{

    const req_array = ["testSubjectId", "yearId", "content", "options"];
    createTransaction(req, res, req_array, "Question", create)

}

const CREATEBULKQUESTIONWITHOPTION = (req, res, next) =>{

    const req_array = ["testSubjectId", "yearId", "questions"];
    createTransaction(req, res, req_array, "question", bulkCreateWithOption)

}

const RETRIEVEQUESTIONS = (req, res, next) =>{

    const req_array = ["limit", "testSubjectId"];

   retrieveData(req, res, "questions", getRandomQuestions, req_array)

}

module.exports = {
    CREATEONEQUESTION, CREATEONEQUESTIONWITHOPTION, RETRIEVEQUESTIONS, CREATEBULKQUESTIONWITHOPTION
}