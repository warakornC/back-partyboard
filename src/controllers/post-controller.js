const catchError = require('../utils/catch-error');
const uploadService = require('../services/uploadService');
const postService = require('../services/post-services');

exports.createPost = catchError(async (req, res, next) => {
  const data = { userId: req.user.id, title: req.body.title };
  if (req.file) {
    data.image = await uploadService.upload(req.file.path);
  }
  const post = await postService.createPost(data);
  res.status(201).json({ post });
});

