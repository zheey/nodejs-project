'use strict';

const rp =  require('request-promise')
const Model = require('../models/index')
const Exam = Model.exam_body
const ExamYear = Model.exam_year
const Option = Model.option
const Question = Model.question
const Subject = Model.subject
const TestSubject = Model.test_subject
const Year = Model.year

/*{
  "subject": "chemistry",
  "status": 200,
  "data": {
    "id": 262,
    "question": "Calculate the percentage by mass of nitrogen in calcium trioxonitrate (V)   {Ca = 40, N = 14, O = 16}",
    "option": {
      "a": "13.10%",
      "b": "17.10%",
      "c": "27.60%",
      "d": "8.5"
    },
    "section": "",
    "image": "",
    "answer": "d",
    "solution": "",
    "examtype": "utme",
    "examyear": "2010"
  }
}*/

const create = (data, transaction = null) =>{
    const options = {
        method: 'GET',
        uri: `https://questions.aloc.ng/api/q/${data.amount}?subject=${data.subject}&year=${data.year}&type=${data.examtype}`,
        qs: {
        },
        json: true,
    };

    return rp(options)
        .then(function (parsedBody) {
            const queryArray = JSON.parse(JSON.stringify(parsedBody.data))

            let dataArray = []


            //find or create the exam
            return Exam.findOrCreate({
                where: {name: data.examtype},
                defaults: {name: data.examtype, description: data.examtype}
            }).then(([exam, created]) => {
                    const examResp = exam.get({plain: true})
                //find or create the year
                 return Year.findOrCreate({
                    where: {name: data.year},
                    defaults: {name: data.year}
                }).then(([year, created]) => {
                    const yearResp = year.get({plain: true})

                     //find or create the exam year
                     return ExamYear.findOrCreate({
                        where: {examBodyId: examResp.id, yearId: yearResp.id},
                        defaults: {examBodyId: examResp.id, yearId: yearResp.id}
                    }).then(([examYear, created]) => {
                        const examYearResp = examYear.get({plain: true})

                         //find or create the subject
                         return Subject.findOrCreate({
                            where: {name: data.subject},
                            defaults: {name: data.subject}
                        }).then(([subject, created]) => {
                            const subjectResp = subject.get({plain: true})
                             console.log(subjectResp)
                             return TestSubject.findOrCreate({
                                 where: {examBodyId: examResp.id, subjectId: subjectResp.id},
                                 defaults: {examBodyId: examResp.id, subjectId: subjectResp.id, questionSize: 40}
                             }).then(([testSubject, created]) => {
                                 const testSubjectResp = testSubject.get({plain: true})
                                 for (let queryObj of queryArray) {

                                     ///recreate the options array
                                     let optionKeys = Object.keys(queryObj.option)
                                     let newOptions = []
                                     for (let tag of optionKeys) {
                                         newOptions.push({
                                             content: queryObj.option[tag],
                                             isAnswer: queryObj.answer === tag
                                         })
                                     }


                                     dataArray.push({
                                         externalId: queryObj.id,
                                         content: queryObj.question,
                                         image: queryObj.image,
                                         solution: queryObj.solution,
                                         meta: {examYearId: examYearResp.id},
                                         testSubjectId: testSubjectResp.id,
                                         options: newOptions
                                     })
                                 }
                                 //find or create the Question
                                 return Question.bulkCreate(dataArray,
                                     {
                                         updateOnDuplicate: ["externalId"]
                                     }).then((question) => {
                                     const questionResp = JSON.parse(JSON.stringify(question))
                                     if (!questionResp.errors) {
                                         return questionResp
                                     } else {
                                         return {errors: questionResp.errors};
                                     }
                                 }).catch(err => {
                                     return {errors: err.toString()}
                                 })
                             }).catch(err =>{
                                 return {errors: err.toString()}
                             })
                        }).catch(err =>{
                            return {errors: err.toString()}
                        })
                    }).catch(err =>{
                        return {errors: err.toString()}
                    })
                }).catch(err =>{
                    return {errors: err.toString()}
                })
            }).catch(err =>{
                return {errors: err.toString()}
            })
        }).catch(err =>{
            return {errors: err.toString()}
        })
}

module.exports ={
    create
}
/*https://questions.aloc.ng/api/q?subject=chemistry&year=2010&type=utme*/