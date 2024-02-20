const Joi = require('joi')


const registerSchema = Joi.object({
    firstName: Joi.string().required().trim().messages({
        'string.empty': 'first name is required',
        'any.required': 'first name is required'
    }),
    lastName: Joi.string().required().trim().messages({
        'string.empty': 'last name is required',
        'any.required': 'last name is required'
    }),
    citizenIdentifyNumber: Joi.alternatives([
        Joi.string().pattern(/^\d{13}$/)
    ])
        .required()
        .messages({
            'alternatives.match': 'invalid citizen identify number',
            'any.required': 'citizen identify number is required'
        }),
    email: Joi.alternatives([
        Joi.string().email({ tlds: false })
    ])
        .required()
        .messages({
            'alternatives.match': 'invalid email address ',
            'any.required': 'email address '
        }),
    mobile: Joi.alternatives([
        Joi.string().pattern(/^[0-9]{10}$/)
    ])
        .required()
        .messages({
            'alternatives.match': 'invalid mobile number',
            'any.required': 'mobile number is required'
        }),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{6,}$/)
        .required()
        .messages({
            'string.empty': 'password is required',
            'string.pattern.base':
                'password must be at least 6 characters and contain only alphabet and number',
                'any.required': 'password is required'
        }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        'string.empty': 'confirm password is required',
        'any.only': 'password and confirm password did not match',
        'any.required': 'confirm password is required'
    })
    
});

const validateRegister = (req, res, next) => {
    const { value, error } = registerSchema.validate(req.body);
    if (error) {
        throw error

    }
    next()
    req.body = value
}

module.exports = validateRegister

