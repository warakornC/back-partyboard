const { rateLimit } = require('express-rate-limit')

module.exports  = rateLimit({
    windowMs: 1000*60*60*24,
    limit :200 ,
    message: {message : 'too many request'}
})