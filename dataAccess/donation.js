'use strict';

const Model = require('../models/index')
const Donation = Model.donation
const Scholarship = Model.scholarship

const create = (data, transaction = null) =>{
    return Donation.create(data, transaction)
        .then((donation) => {
            donation = JSON.parse(JSON.stringify(donation))
            if(!donation.errors){
                return {...donation}
            }else{
                throw donation.errors
            }
        }).catch(err =>{
            return {errors: err.toString()}
        })
}

const getAll = (query = null) =>{
    let db_query;
    if (query === null) {
        db_query = Donation.findAll({
            include:[
                {model: Scholarship}
            ]});
    } else {
        db_query = Donation.findAll({
            where: query,
            include:[
                {model: Scholarship}
            ]
        });
    }

    return db_query.then(query_resp => {
        query_resp = JSON.parse(JSON.stringify(query_resp))
        if (!query_resp.errors) {
            return  query_resp
        } else {
            throw query_resp.errors;
        }
    }).catch(err => {
        return {errors: err.toString()}
    })
}


module.exports ={
    create, getAll
}