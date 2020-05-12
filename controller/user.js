'use strict';

const {SuccessResponse, ErrorResp}  = require("../global/ResponseHandlers");
const {validateBody, validateQuery, validateToken}  =  require("./globalController");

const auth_key = process.env.auth || require("../auth/auth_key")();
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const sequelize = require("../models/index").sequelize;
const bcrypt = require("bcrypt");
const {create, findOne, updateOne} = require("../dataAccess/user")

const sendMessage = require('../sms/sendSMS')
const sendEmail = require('../email/sendEmail')



const LOGIN = (req, res, next) => {
    let userObj = JSON.parse(JSON.stringify(req.user))
    if(!userObj.errors) {
        delete userObj["password"]
        let user = {
            ...userObj
        };

        let response = {
            token: jwt.sign({user}, auth_key, {expiresIn: "24 hours"}),
            user: user
        };
        return SuccessResponse(res, "login successful", response, 200);
    }else{
        return ErrorResp(res, userObj.errors, 400);
    }
};
/*
const generatePassword = (length) => {
    const chars = "abcdefghijklmnopqrstuvwxyz!@#$ABCDEFGHIJKLMNOP1234567890";
    let pass = "";
    for (let x = 0; x < length; x++) {
        const i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
};*/

const REGISTERUSER = (req, res, next) => {

    // validate accessKey
    if((req.header("accessKey") !== process.env.ACCESSKEY)){
        return res.status(401).json({status: false, message: `Unauthorized`})
    }

    const req_array = ["first_name", "last_name", "phone_number"];
    let status;
    const bodyParams = JSON.parse(JSON.stringify(req.body))

    //check if body contains required parameters
    const validateResp = validateBody(req_array, bodyParams)
    if (!validateResp.isValidated) {
        return res.status(400).json({status: false, message: `${validateResp.data} missing. Field(s) required.`})
    }

    if((bodyParams.role && bodyParams.role === "admin") || (bodyParams.role && bodyParams.role === "super-admin")){
        return res.status(401).json({status: false, message: `You can not create this role.`})
    }


    /*//generate random password
    const randomPassword = generatePassword(10)
    console.log("random", randomPassword)
*/
    /***
     * create user
     */
    if(bodyParams.password && bodyParams.password.length > 0) {
        return bcrypt.hash(bodyParams.password, 10).then(password_ => {
            req.body.password = password_;

            return sequelize.transaction(t => {

                return create(req.body, {transaction: t}).then(user => {

                    let userObj = JSON.parse(JSON.stringify(user))
                    delete userObj["password"]

                    if (!user.errors) {
                        return  {
                            token: jwt.sign({user: userObj}, auth_key, {
                                expiresIn: "24 hours"
                            }),
                            user: userObj
                        }
                    } else {
                        status = 400;
                        throw  user.errors
                    }
                });
            }).then((resp) =>{

                return SuccessResponse(res, "User successfully enrolled.", resp, 200);

            }).catch(err => {
                if (err.toString().includes("SequelizeValidationError")) {
                    return ErrorResp(res, err.toString(), 400);
                } else if (err.toString().includes("SequelizeUniqueConstraintError")) {
                    return ErrorResp(res, "Phone number already exist", 400);
                }

                return ErrorResp(res, err.toString(), 400);
            });
        }).catch(err => {
            console.log(err.toString())
    return next(createError(status || 500, err.errors || err.toString()));
});
    }else {

        return sequelize.transaction(t => {

            return create(req.body, {transaction: t}).then(user => {

                let userObj = JSON.parse(JSON.stringify(user))
                delete userObj["password"]

                if (!user.errors) {
                    return {
                        token: jwt.sign({user: userObj}, auth_key, {
                            expiresIn: "24 hours"
                        }),
                        user: userObj
                    }
                } else {
                    status = 400;
                    throw  user.errors
                }
            });
        }).then((resp) => {

            return SuccessResponse(res, "User successfully enrolled.", resp, 200);

        }).catch(err => {
            if (err.toString().includes("SequelizeValidationError")) {
                return ErrorResp(res, err.toString(), 400);
            } else if (err.toString().includes("SequelizeUniqueConstraintError")) {
                return ErrorResp(res, "Phone number already exist", 400);
            }

            return ErrorResp(res, err.toString(), 400);
        });
    }
}

const FINDONE = (req, res, next) =>{
    const validateResp = validateQuery(req.query)
    let status;

    //validate query
    if(validateResp.noQuery){
        return res.status(400).json({status: false, message: `Query missing`})
    }

    // validate accessKey
    if((req.header("accessKey") !== process.env.ACCESSKEY)){
        return res.status(401).json({status: false, message: `Unauthorized`})
    }

    return findOne({where: req.query}).then((user) =>{
        if (!user.errors) {
            if(Object.keys(user).length > 0) {
                let userObj = JSON.parse(JSON.stringify(user))
                delete userObj["password"]
                return {
                    token: jwt.sign({user: userObj}, auth_key, {
                        expiresIn: "24 hours"
                    }),
                    user: userObj
                }
            }else{
               return {user}
            }
        } else {
            status = 400;
            throw  user.errors
        }
    }).then((resp) =>{
       return SuccessResponse(res, "User successfully retrieved.", resp, 200);
    }).catch(err => {
        return ErrorResp(res, err.toString(), 400);
    });

}

const RESETPASSWORD = (req, res, next) =>{
    let status;


    //check for token
    validateToken(res, req.user)

    return findOne({where: {phone_number: req.user.phone_number}}).then((user) =>{
        if (!user.errors) {
            if(Object.keys(user).length > 0) {
                let userObj = JSON.parse(JSON.stringify(user))
                delete userObj["password"]
                const token = jwt.sign({user: userObj}, auth_key, {
                    expiresIn: "24 hours"
                })
                return {

                    link: `${req.body.link}${token}`
                }
            }else{
                return {user}
            }
        } else {
            status = 400;
            throw  user.errors
        }
    }).then((resp) =>{
        return SuccessResponse(res, "Password update link generated.", resp, 200);
    }).catch(err => {
        return ErrorResp(res, err.toString(), 400);
    });

}

const UPDATEUSER = (req, res, next) => {

    //check for token
    validateToken(res, req.user)
    let status;

    /***
     * create user
     */

    if(req.body.data.password) {
        const password = req.body.data.password
        return bcrypt.hash(password, 10).then(password_ => {
            req.body.data.password = password_;
            updateUser(req, res, status)

        }).catch(err => {
            return next(createError(status || 500, err.errors || err.toString()));
        });
    }else{
        updateUser(req, res, status)
    }
}

const updateUser = (req, res, status) => {

    req.body.user_id  = req.user.id

    if(req.body.hasOwnProperty("role")){
        return ErrorResp(res, "You cannot update user role.", 400);
    }

    return sequelize.transaction(t => {

        return updateOne(req.body, {transaction: t}).then(user => {

            let userObj = JSON.parse(JSON.stringify(user))
            delete userObj["password"]

            if (!user.errors) {
                return  userObj
            } else {
                status = 400;
                throw  user.errors
            }
        });
    }).then((resp) => {
        return SuccessResponse(res, "User has been updated.", resp, 200);
    }).catch(err => {
        if (err.toString().includes("SequelizeValidationError")) {
            return ErrorResp(res, err.toString(), 400);
        } else if (err.toString().includes("SequelizeUniqueConstraintError")) {
            return ErrorResp(res, "Phone number already exist", 400);
        }

        return ErrorResp(res, err.toString(), 400);
    });
}
module.exports = {
    LOGIN, REGISTERUSER, FINDONE, RESETPASSWORD, UPDATEUSER
}