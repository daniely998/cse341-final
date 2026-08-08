const router = require('express').Router();

const controllers = require('../controllers/favorites');
const validator = require('../middleware/validator');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', controllers.getAll);

router.get('/:id', controllers.getSingle);

router.post('/', isAuthenticated, validator.favoriteValidationRules(), validator.validate, controllers.createFavorite);

router.put('/:id', isAuthenticated, validator.favoriteValidationRules(), validator.validate, controllers.updateFavorite);

router.delete('/:id', isAuthenticated, controllers.deleteFavorite);

module.exports = router;