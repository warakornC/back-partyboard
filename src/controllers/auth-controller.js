const catchError = require('../utils/catch-error')
const userServices = require('../services/user-servies')
const createError = require('../utils/create-error')
const hashService = require('../services/hash-services')
const jwtService = require('../services/jwt-services')


exports.register = catchError( async (req,res,next) => {
    const existUser = await userServices.findUserByEmail(req.body.email)
    const existCitizen = await userServices.findUserByCitizenIdentifyNumber(req.body.citizenIdentifyNumber)
    if (existUser || existCitizen) {
        createError('email or citizenIdentifyNumber is already in use',400)
    }
    req.body.password = await hashService.hash(req.body.password)
    delete req.body.confirmPassword
    const newUser = await userServices.createUser(req.body);
    const payload = {userId : newUser.id};
    const accessToken = jwtService.sign(payload);

    res.status(201).json({accessToken})
});
