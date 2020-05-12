'use strict';
const Model = require('../models/index')

const CreateDAO = (model, data, transaction = null) => {
    return Model[model].create(data, transaction).then(query_resp => {
        query_resp = JSON.parse(JSON.stringify(query_resp))
        return query_resp
    }).catch(err => {
        return  err.toString()
    })
};

module.exports = {
    CreateDAO
}

