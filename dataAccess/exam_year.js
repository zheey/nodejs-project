'use strict';

const Model = require('../models/index')
const ExamYear = Model.exam_year

const create = (data, transaction = null) => {
    return ExamYear.findOrCreate({
        where: {examId: data.examId, yearId: data.yearId},
        defaults: {examId: data.examId, yearId: data.yearId}
    }).then(([examYear, created]) => {
        const examYearResp = examYear.get({plain: true})
        return {...examYearResp}
    }).catch(err => {
        return {errors: err.toString()}
    })
}


module.exports = {
    create
}