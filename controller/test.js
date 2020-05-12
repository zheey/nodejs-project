'use strict'

const {create, getAll, getOne} = require("../dataAccess/test")
const auth_key = process.env.auth || require("../auth/auth_key")();
const jwt = require("jsonwebtoken");
const {SuccessResponse}  = require("../global/ResponseHandlers");


const { createTransaction, validateToken, validateBody, getAllData}  =  require("./globalController");

const CREATESCHOLARSHIP = (req, res, next) =>{

    const req_array = ["label", "subject_quantity", "scoring_type", "deadline", "price", "examBodyId"];
    createTransaction(req, res, req_array, "test", create)

}

const SCHOLASHIPLINK = (req, res, next) => {

    //check for token
    validateToken(res, req.user)

    const req_array = ["userTestId", "link"];
    const bodyParams = JSON.parse(JSON.stringify(req.body))

    //check if body contains required parameters
    const validateResp = validateBody(req_array, bodyParams)
    if (!validateResp.isValidated) {
        return res.status(400).json({status: false, message: `${validateResp.data} missing. Field(s) required.`})
    }

    const token = jwt.sign({user: req.user, userTestId: bodyParams.userTestId}, auth_key, {expiresIn: "24 hours"})
    const response = bodyParams.link+"?user="+token

    return SuccessResponse(res, "link generated.",{link:response} , 200);
}

const VERIFYSCHOLARSHIP = (req, res, next) => {
    console.log(JSON.parse(JSON.stringify(req)))
};

const GETALLSCHOLARSHIPS = (req, res, next) =>{
    getAllData(req, res, "scholarships", getAll)
}

const GETONESCHOLARSHIP = (req, res, next) =>{
    getAllData(req, res, "scholarships", getOne)
}

module.exports = {
    CREATESCHOLARSHIP, SCHOLASHIPLINK, VERIFYSCHOLARSHIP, GETALLSCHOLARSHIPS, GETONESCHOLARSHIP
}