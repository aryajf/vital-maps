const Admin = (req, res, next) => (req.decoded.role === 'Admin') ? next() : error(res)
const Member = (req, res, next) => (req.decoded.role === 'Member') ? next() : error(res)

const error = (res) => res.status(403).json({
    message: 'Access denied',
    status: false
})

module.exports = {
    Admin,
    Member,
}