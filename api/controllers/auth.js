const {
    User,
    Document
} = require('../models')
const bcrypt = require('bcrypt')
const hbs = require('nodemailer-express-handlebars')
const jwt = require('jsonwebtoken')
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const emailConfig = require('../config/email')
const path = require('path')
const Validator = require('validatorjs')
const validatorMessage = require('../config/validatorMessage')
const {
    JWT_SECRET,
    JWT_SECRET_EXPIRES,
    BASE_URL,
    HOME_URL,
    MAIL_FROM_ADDRESS
} = process.env

module.exports = {
    login: async (req, res) => {
        const userReq = {
            email: req.body.email,
            password: req.body.password
        }

        if (userValidation(userReq, req.url) != null) return res.status(400).send(userValidation(userReq, req.url))
        let user = await findUser(userReq.email)
        if (!user) {
            return res.status(404).json({
                email: userReq.email,
                message: 'User tidak terdaftar',
                status: false
            })
        } else {
            if (!verifyPassword(userReq.password, user.password)) return res.status(400).json({
                message: 'Kombinasi email dan password tidak sesuai',
                status: false
            })

            const authLog = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }

            const token = jwt.sign(authLog, JWT_SECRET, {
                expiresIn: JWT_SECRET_EXPIRES
            })

            const expiresToken = parseInt(JWT_SECRET_EXPIRES)

            user.update({
                login_status: 'Online',
                last_online: new Date(),
                token_expired_at: Date.now() + expiresToken
            })

            res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    user_status: user.user_status
                },
                message: 'Berhasil login',
                request: {
                    method: req.method,
                    url: BASE_URL + 'login'
                },
                status: true,
                token: token
            })
        }
    },
    profile: async (req, res) => {
        let user = await User.findOne({
            where: {
                email: req.decoded.email
            }
        })
        res.json({
            user: user,
            request: {
                method: req.method,
                url: BASE_URL + 'profile'
            },
            status: true,
        })
    },
    forgotPasswordRequest: async (req, res) => {
        try {
            const userReq = {
                email: req.body.email
            }

            if (userValidation(userReq, req.url) != null) return res.status(400).send(userValidation(userReq, req.url))
            let user = await findUser(userReq.email)
            if (user) {
                const token = crypto.randomBytes(20).toString('hex')
                user.token = token
                await user.save()

                let transporter = nodemailer.createTransport(emailConfig)
                await transporter.use('compile', hbs({
                    viewEngine: {
                        partialsDir: path.resolve('./views/email/'),
                        defaultLayout: false,
                    },
                    viewPath: path.resolve('./views/email/'),
                })).sendMail({
                    from: MAIL_FROM_ADDRESS,
                    to: userReq.email,
                    subject: "Lupa Password - Moazza Indonesia",
                    template: 'forgot',
                    context: {
                        url: HOME_URL,
                        email: userReq.email,
                        token: token
                    }
                }).then(async () => {
                    if (user.token) {
                        setTimeout(async function () {
                            user.token = null
                            await user.save()
                        }, 3600000)
                    }

                    res.status(201).json({
                        message: 'Silahkan cek email anda untuk mengubah password',
                        request: {
                            method: req.method,
                            url: process.env.BASE_URL + req.url
                        },
                        status: true,
                    })
                }).catch(() => {
                    res.status(400).json({
                        message: 'Terjadi kesalahan saat mengirim email',
                        status: false
                    })
                })
            } else {
                res.status(404).json({
                    email: userReq.email,
                    message: 'Email tidak ditemukan',
                    status: false
                })
            }
        } catch (err) {
            res.status(400).json({
                error: err.message,
                message: 'Ups, terjadi kesalahan',
                status: false
            })
        }
    },
    updatePassword: async (req, res) => {
        let user = await findUser(req.params.email)
        if (user == null || user.token != req.params.token || user.token == null) {
            res.status(404).json({
                message: 'Link tidak valid',
                request: {
                    method: req.method,
                    url: BASE_URL + 'password/update/' + req.params.email + req.params.token
                },
                status: false,
            })
            return
        }

        let userReq = {
            newPassword: req.body.newPassword,
            confirmNewPassword: req.body.confirmNewPassword,
        }

        if (updatePasswordValidation(userReq) != null) {
            res.status(400).send(updatePasswordValidation(userReq))
            return
        }

        try {
            user.password = hashPassword(userReq.newPassword),
                user.token = null
            await user.save()

            res.status(201).json({
                message: 'Password berhasil diganti',
                request: {
                    method: req.method,
                    url: BASE_URL + 'password/update/' + req.params.email + req.params.token
                },
                status: true,
            })
        } catch (err) {
            res.status(400).json({
                error: err.message,
                message: 'Ups, terjadi kesalahan',
                status: false
            })
        }
    },
    changePassword: async (req, res) => {
        let user = await findUser(req.decoded.email)

        let userReq = {
            oldPassword: req.body.oldPassword,
            newPassword: req.body.newPassword,
            confirmNewPassword: req.body.confirmNewPassword,
        }

        if (userValidation(userReq, req.url) != null) {
            res.status(400).send(userValidation(userReq, req.url))
            return
        }

        if (!verifyPassword(req.body.oldPassword, user.password)) {
            res.status(400).json({
                message: 'Password lama salah',
                status: false
            })
        } else {
            user.password = hashPassword(req.body.newPassword)
            await user.save()

            res.status(201).json({
                message: 'Password berhasil diganti',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + req.url
                },
                status: true,
            })
        }
    },
    updateProfile: async (req, res) => {
        let user = await User.findOne({
            where: {
                email: req.decoded.email
            }
        })
        let userReq = {
            name: req.body.name,
        }

        if (userReq.phone_number == 'null') {
            userReq.phone_number = ''
        }

        if (userValidation(userReq, req.url) != null) {
            res.status(400).send(userValidation(userReq, req.url))
            return
        }

        try {
            user.update(userReq).then(data => {
                res.status(200).json({
                    data: {
                        email: data.email,
                        name: data.name,
                    },
                    message: 'User berhasil diedit',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + 'user/' + req.decoded.email
                    },
                    status: true,
                })
            })
        } catch (err) {
            res.status(400).json({
                error: err.message,
                message: 'Terjadi kesalahan saat mengedit profile',
                status: false
            })
        }
    },
    logout: async (req, res) => {
        let user = await findUser(req.decoded.email)
        user.token = null
        user.login_status = 'Offline'
        user.last_online = new Date()
        await user.save()
        res.status(200).json({
            message: 'User berhasil logout',
            request: {
                method: req.method,
                url: process.env.BASE_URL + req.url
            },
            status: true,
        })
    }
}

function findUser(email) {
    return User.findOne({
        where: {
            email: email
        }
    })
}

function hashPassword(password) {
    return bcrypt.hashSync(password, 10, null)
}

function verifyPassword(password, hashPassword) {
    return hashPassword == null ? false : bcrypt.compareSync(password, hashPassword)
}

function updatePasswordValidation(dataRequest) {
    let rules = {
        newPassword: 'required|min:5',
        confirmNewPassword: 'required|min:5|same:newPassword'
    }

    let validation = new Validator(dataRequest, rules, validatorMessage)
    if (validation.fails()) {
        return {
            message: "Harap isi form dengan benar",
            errors: validation.errors.errors
        }
    }
}

function userValidation(dataRequest, url) {
    let rules
    if (url == '/login') {
        rules = {
            email: 'required|email|min:5',
            password: 'required|min:5',
        }
    } else if (url == '/password/forgot') {
        rules = {
            email: 'required|email|min:5',
        }
    } else if (url == '/password/change') {
        rules = {
            oldPassword: 'required|min:5',
            newPassword: 'required|min:5',
            confirmNewPassword: 'required|min:5|same:newPassword'
        }
    } else if (url == '/profile/update') {
        rules = {
            name: 'required|min:3',
            phone_number: 'required|numeric|min:10',
            address: 'required|min:10',
        }
    }

    let validation = new Validator(dataRequest, rules, validatorMessage)
    if (validation.fails()) {
        return {
            message: "Harap isi form dengan benar",
            errors: validation.errors.errors
        }
    }
}