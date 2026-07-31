const router = require('express').Router();

const controllers = require('../controllers/songs');
const validator = require('../middleware/validator');
// const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', controllers.getAll);

router.get('/:id', controllers.getSingle);

// router.post('/', isAuthenticated, validator.songValidationRules(), validator.validate, controllers.createSong);

// router.put('/:id', isAuthenticated, validator.songValidationRules(), validator.validate, controllers.updateSong);

// router.delete('/:id', isAuthenticated, controllers.deleteSong);

router.post('/', validator.songValidationRules(), validator.validate, controllers.createSong);

router.put('/:id', validator.songValidationRules(), validator.validate, controllers.updateSong);

router.delete('/:id', controllers.deleteSong);

module.exports = router;