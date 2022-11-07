const express = require('express');
const router = express.Router();
const fileUpload = require('../middleware/fileUpload')

// CALL CONTROLLER
const auth = require('../controllers/auth');
const hospital = require('../controllers/hospital');
const user = require('../controllers/user')

// CALL MIDDLEWARE
const checkAuth = require('../middleware/checkAuth');
const {Admin} = require('../middleware/Roles');

// USER MODEL & BSCRYPT
const {User} = require('../models')
const bcrypt = require('bcrypt')

router.get('/', async function(req, res) {
    let email = 'admin@gmail.com'
    let user = await User.findOne({where: {email: email}})
    if(user){
        return res.redirect(process.env.HOME_URL)
    }

    await User.create({
        name: 'Admin Vital Maps',
        email: email,
        password: bcrypt.hashSync('12345', 10, null),
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
    })

    res.redirect(process.env.HOME_URL)
})

// AUTH
router.post('/login', auth.login)
router.get('/profile', checkAuth, auth.profile)
router.put('/logout', checkAuth, auth.logout)
router.put('/profile/update', checkAuth, auth.updateProfile)
router.post('/password/forgot', auth.forgotPasswordRequest)
router.put('/password/update/:email/:token', auth.updatePassword)
router.post('/password/change', checkAuth, auth.changePassword)

// hospital
router.route('/hospital')
    .get(hospital.index)
    .post(checkAuth, Admin, fileUpload.single('cover'), hospital.store)
router.get('/hospital/search/:keyword', hospital.search)
router.route('/hospital/:slug')
    .get(hospital.show)
    .put(checkAuth, Admin, fileUpload.single('cover'), hospital.update)
    .delete(checkAuth, hospital.delete)

// USER
router.route('/user')
    .get(checkAuth, Admin, user.getUsers)

module.exports = router