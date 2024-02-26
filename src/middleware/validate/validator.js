const validate = schema => (req, res, next) => {
    const { value, error } = schema.validate(req.body);
    if (error) {
        throw error
        
    }
    next()
    req.body = value
}
module.exports = validate