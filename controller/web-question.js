'use strict'

const {create} = require("../dataAccess/web-question")
const {createTransaction}  =  require("./globalController");


const CREATETEST = (req, res, next) => {

    const req_array = ["amount", "subject", "year", "examtype"];
    createTransaction(req, res, req_array, "test", create)

}

module.exports = {
    CREATETEST
}