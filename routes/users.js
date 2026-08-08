const router = require('express').Router();

const controllers = require('../controllers/users');
const validator = require('../middleware/validator');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', controllers.getAll);

router.get('/:id', controllers.getSingle);

router.post('/', isAuthenticated, validator.userValidationRules(), validator.validate, controllers.createUser);

router.put('/:id', isAuthenticated, validator.userValidationRules(), validator.validate, controllers.updateUser);

router.delete('/:id', isAuthenticated, controllers.deleteUser);

module.exports = router;