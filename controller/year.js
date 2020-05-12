'use strict'

const {create, findAll} = require("../dataAccess/year")

const {createTransaction, getAllData}  =  require("./globalController");

const CREATEYEAR = (req, res, next) =>{

const req_array = ["name"]
    createTransaction(req, res, req_array, "year", create)
}

const RETRIEVEYEARS = (req, res, next) =>{

    getAllData(req, res, "years", findAll)

}

module.exports = {
    CREATEYEAR, RETRIEVEYEARS
}