const router = require('express').Router();
const { register, login, getUserDetails } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.route('/profile').get(auth, getUserDetails);

module.exports = router;