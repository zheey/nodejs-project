'use strict';

const {ErrorResp, SuccessResponse}  = require("../global/ResponseHandlers");
const sequelize = require("../models/index").sequelize

const validateBody = (params, bodyParams) =>{
    let errorArray = []
    params.map(req_object => {
        if (!JSON.parse(JSON.stringify(bodyParams)).hasOwnProperty(req_object)) {
            errorArray.push(req_object)
        }
    });
    if (errorArray.length > 0) {
        return {isValidated: false, data: errorArray}
    }else{
        return {isValidated: true}
    }
}

const validateQuery = (req) => {
    if(Object.keys(req).length < 1){
        return {noQuery: true}
    }
    return {noQuery: false}
}

const validateToken = (res, user) =>{
    if (!user) {
        return ErrorResp(res, "invalid token", 400);
    }
}

const validateUser = (user, res, type) => {
    if (user.role !== 'admin') {
        return {isValid: false}
    }
    return {isValid: true}
}


const createTransaction = (req, res, req_array,  type, create) =>{

    //check for token
    validateToken(res, req.user)

    //check for role
   const valid =  validateUser(req.user, res, type)

    if(!valid.isValid){
        return res.status(400).json({status: false, message: `You cannot create ${type}.`})
    }

    let status;

    const bodyParams = JSON.parse(JSON.stringify(req.body))

    //check if body contains required parameters
    const validateResp = validateBody(req_array, bodyParams)
    if (!validateResp.isValidated) {
        return res.status(400).json({status: false, message: `${validateResp.data} missing. Field(s) required.`})
    }

    const func = (t) =>{
        return create(req.body, {transaction: t}).then(data => {
            if (!data.errors) {
                return data
            } else {
                status = 400;
                throw  data.errors
            }
        })
    }

    return sequelize.transaction(t => {
        return func(t)
    }).then((resp) =>{
        return SuccessResponse(res, `${type} successfully created`, resp, 200);

    }).catch(err => {
        console.log(err)
        return ErrorResp(res, err.toString(), 400);
    })
}

const createUserTransaction = (req, res, req_array,  type, create) =>{

    //check for token
    validateToken(res, req.user)

    let status;

    const bodyParams = JSON.parse(JSON.stringify(req.body))

    console.log("body", bodyParams)

    bodyParams["userId"] = req.user.id

    //check if body contains required parameters
    const validateResp = validateBody(req_array, bodyParams)
    if (!validateResp.isValidated) {
        return res.status(400).json({status: false, message: `${validateResp.data} missing. Field(s) required.`})
    }

    const func = (t) =>{
        return create(bodyParams, {transaction: t}).then(data => {
            if (!data.errors) {
                return data
            } else {
                status = 400;
                throw  data.errors
            }
        })
    }

    return sequelize.transaction(t => {
        return func(t)
    }).then((resp) =>{
        return SuccessResponse(res, `${type} successfully created`, resp, 200);

    }).catch(err => {
        console.log(err)
        return ErrorResp(res, err.toString(), 400);
    })
}


const retrieveData = (req, res, type, find, req_array) =>{

    //check for token
    validateToken(res, req.user)

    let status;

    const bodyParams = JSON.parse(JSON.stringify(req.body))

    //check if body contains required parameters
    const validateResp = validateBody(req_array, bodyParams)
    if (!validateResp.isValidated) {
        return res.status(400).json({status: false, message: `${validateResp.data} missing. Field(s) required.`})
    }


    return find(bodyParams).then(data => {
            if (!data.errors) {
                return data
            } else {
                status = 400;
                throw  data.errors
            }
        }).then((resp) =>{
            return SuccessResponse(res, `${type} successfully retrieved`, resp, 200);

        }).catch(err => {
            console.log(err)
            return ErrorResp(res, err.toString(), 400);
        })

}

const getAllData = (req, res, type, find, noToken) =>{

    //check for token
    {!noToken ?   validateToken(res, req.user) : "" }

    let status;
    let query = null
    if(req.query){
        query = req.query
    }

    return find(query).then(data => {
        if (!data.errors) {
            return data
        } else {
            status = 400;
            throw  data.errors
        }
    }).then((resp) =>{
        return SuccessResponse(res, `${type} successfully retrieved`, resp, 200);

    }).catch(err => {
        console.log(err)
        return ErrorResp(res, err.toString(), 400);
    })

}

const getAllUserData = (req, res, type, find) =>{

    //check for token
    validateToken(res, req.user)

    let status;
    let query = {}
    if(req.query){
        query = req.query
    }

    query = JSON.parse(JSON.stringify(query))
    query["userId"] = req.user.id

    return find(query).then(data => {
        if (!data.errors) {
            return data
        } else {
            status = 400;
            throw  data.errors
        }
    }).then((resp) =>{
        return SuccessResponse(res, `${type} successfully retrieved`, resp, 200);

    }).catch(err => {
        console.log(err)
        return ErrorResp(res, err.toString(), 400);
    })

}

module.exports = {
    validateBody, validateQuery, validateToken, validateUser, createTransaction, retrieveData,
    getAllData, createUserTransaction, getAllUserData
}