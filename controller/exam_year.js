'use strict'

const {create} = require("../dataAccess/exam_year")

const { createTransaction}  =  require("./globalController");

const CREATEEXAMYEAR = (req, res, next) =>{

    const req_array = ["examId", "yearId"];
    createTransaction(req, res, req_array, "exam year", create)

}

module.exports = {
    CREATEEXAMYEAR
}