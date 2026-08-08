const router = require('express').Router();

const controllers = require('../controllers/artists');
const validator = require('../middleware/validator');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', controllers.getAll);

router.get('/:id', controllers.getSingle);

router.post('/', isAuthenticated, validator.artistValidationRules(), validator.validate, controllers.createArtist);

router.put('/:id', isAuthenticated, validator.artistValidationRules(), validator.validate, controllers.updateArtist);

router.delete('/:id', isAuthenticated, controllers.deleteArtist);

module.exports = router;