'use strict';

const Model = require('../models/index')
const User = Model.user
const sendMessage = require('../sms/sendSMS')
const sendEmail = require('../email/sendEmail')

const create = (data, transaction = null) =>{

    return User.create(data, transaction).then(query_resp => {
        query_resp = JSON.parse(JSON.stringify(query_resp))
        if(!query_resp.errors){
            return {...query_resp}

        }else{
            return  {errors:query_resp.errors.toString()}
        }
    }).catch(err => {
        return  {errors: err.toString()}
    })
}

const findOne = (query) => {
    return User.findOne(query).then((user) => {
        user = JSON.parse(JSON.stringify(user))
        if(user !== null ){
            if(!user.errors){
                return {...user}
            }else{
                return  {errors: user.errors.toString()}
            }
        }else{
            return  {}
        }
    }).catch(err => {
        return  {errors: err.toString()}
    })
}

const updateOne = (query, transaction = null) => {
    query = JSON.parse(JSON.stringify(query))
    const id = query.user_id

    console.log("user", query, id)

    return User.update(
        query.data ,
        { where: { id }}
        , { returning: true, plain: true }, transaction).then((user) => {
        user = JSON.parse(JSON.stringify(user))
            if(!user.errors){
                return user
            }else{
                return  {errors: user.errors.toString()}
            }
    }).catch(err => {
        return  {errors: err.toString()}
    })
};

module.exports ={
    create, findOne, updateOne
}

