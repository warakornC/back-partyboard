const catchError = require('../utils/catch-error')
const userServices = require('../services/user-services')
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

exports.login = catchError(async (req, res, next) => {
    const existsUser = await userServices.findUserByEmail(
      req.body.email
    );
  
    if (!existsUser) {
      createError('invalid credentials', 400);
    }
  
    const isMatch = await hashService.compare(
      req.body.password,
      existsUser.password
    );
  
    if (!isMatch) {
      createError('invalid credentials', 400);
    }
  
    const payload = { userId: existsUser.id };
    const accessToken = jwtService.sign(payload);
    delete existsUser.password;
  
    res.status(200).json({ accessToken, user: existsUser });
  });
  
  exports.getMe = (req, res, next) => {
    res.status(200).json({ user: req.user });
  };