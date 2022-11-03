const joi = require('@hapi/joi')


// register validation
const registerValidation = (data) => {
    const schema = {
    name:joi.string().required(),
    email:joi.string().required(),
    password: joi.string().required()
    }
    return joi.validate(data, schema)
    
}
//login vallidation 
const loginValidation = (data) => {
    const schema = {
   email:joi.string().required(),
    password: joi.string().required()
    }
    return joi.validate(data, schema)
    
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
