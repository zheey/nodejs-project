'use strict';

const Model = require('../models/index')
const Year = Model.year

const create = (data, transaction = null) =>{
    return Year.create(data, transaction)
        .then((year) => {
            year = JSON.parse(JSON.stringify(year))
            if(!year.errors){
                return {...year}
            }else{
                throw year.errors
            }
        }).catch(err =>{
            return {errors: err.toString()}
        })
}

const findAll = () =>{
    return Year.findAll().then(years => {
        if(!years.errors){
            return years
        }else{
            throw years.errors
        }
    }).catch(err =>{
        return {errors: err.toString()}
    })
}

module.exports ={
    create, findAll
}