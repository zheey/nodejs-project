'use strict'

const {create, getAll} = require("../dataAccess/donation")

const { createTransaction, getAllData}  =  require("./globalController");

const CREATEDONATION = (req, res, next) =>{

    const req_array = ["name", "price", "scholarshipId"];
    createTransaction(req, res, req_array, "donation", create)

}

const RETRIEVEDONATIONS = (req, res, next) =>{

    getAllData(req, res, "donations", getAll())

}

module.exports = {
    CREATEDONATION, RETRIEVEDONATIONS
}