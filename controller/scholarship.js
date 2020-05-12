'use strict'

const {create, getAll} = require("../dataAccess/scholarship")

const { createUserTransaction, getAllData}  =  require("./globalController");
const {ErrorResp}  = require("../global/ResponseHandlers");

const CREATEUSERSPONSOR = (req, res, next) =>{

    if(req.user.role !== "sponsor"){
        return ErrorResp(res, "You can not create a scholarship", 400);
    }
    const req_array = ["testId", "quantity", "hasPaid"];
    createUserTransaction(req, res, req_array, "Scholarship", create)

}

const GETALLSPONSOR = (req, res, next) =>{
    getAllData(req, res, "Scholarship", getAll, true)
}


module.exports = {
    CREATEUSERSPONSOR, GETALLSPONSOR
}