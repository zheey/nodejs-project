/**
 * Function to parse error
 * */
const pe = require('parse-error');

/**
 * Function for returning a promise
 * */
 const To = (promise) => {
    return promise
        .then(data => {
            return [null, data];
        }).catch(err =>
            [pe(err)]
        );
};

/**
 * Function for throwing error
 * */
const ThrowError = (err_message, log) => {
    if(log === true){
        console.error(err_message);
    }

    throw new Error(err_message);
};

/**
 * Function for handling error web
 * responses
 * */
const ErrorResp = (res, err, code) => { // Error Web Response
    if(typeof err === 'object' && typeof err.message !== 'undefined'){
        err = err.message;
    }

    if(typeof code !== 'undefined') res.statusCode = code;

    return res.json({success:false, error: err});
};


/**
 *
 * @param res
 * @param message
 * @param data
 * @param code
 * @returns {*}
 * @constructor
 * Function for handling success web
 * responses
 */
const SuccessResponse = (res, message, data, code=200) => { // Success Web Response
    let send_data = {
        success:true, message
    };

    if(typeof data === 'object'){
        send_data = Object.assign({data}, send_data);//merge the objects
    }
    return res.status(code).json(send_data)
};

/**
 * Function to handle all the uncaught
 * promise rejections
 * */
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
});

module.exports = {
    SuccessResponse, ErrorResp, ThrowError, To
}