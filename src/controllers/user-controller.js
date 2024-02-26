const fs = require('fs/promises');

const catchError = require('../utils/catch-error');
const createError = require('../utils/create-error');
const userService = require('../services/user-service');
const uploadService = require('../services/upload-service');


exports.checkExistUser = catchError(async (req, res, next) => {
  const existUser = await userService.findUserById(req.targetUserId);
  if (!existUser) {
    createError('user was not found', 400);
  }
  delete existUser.password;
  req.targetUser = existUser;
  next();
});

exports.updateUser = catchError(async (req, res, next) => {
  if (!req.files) {
    createError('profile image or cover image is required', 400);
  }

  const data = {};
  if (req.files.profileImage) {
    data.profileImage = await uploadService.upload(
      req.files.profileImage[0].path
    );
    fs.unlink(req.files.profileImage[0].path);
  }

    await userService.updateUserById(data, req.user.id);

  res.status(200).json(data);
});

