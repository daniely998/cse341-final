const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
  return [
    body('firstName').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('email').notEmpty().isEmail(),
    body('favoriteColor').isString(),
    body('birthday').isString(),
    body('favoriteFruit').isString(),
    body('gender').notEmpty().isString()
  ];
};

const songValidationRules = () => {
  return [
    body('songTitle').notEmpty().isString(),
    body('artist').notEmpty().isString(),
    body('releaseDate').isString(),
    body('length').isString(),
    body('language').isString()
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  })
};

module.exports = {
  userValidationRules,
  songValidationRules,
  validate,
}