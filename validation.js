const joi = require("@hapi/joi");


// register validation
const registerValidation = data => {
    const schema = {
    name: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required()
    }
    return joi.validate(data, schema)
    
}
//login vallidation 
const loginValidation = (data) => {
    const schema =joi.object({
    name: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required()
    });
    return joi.validate(data, schema);
    
};


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
