const {User} = require('../models')
const { Op } = require("sequelize")
const {BASE_URL} = process.env
const {getPagination, getPagingData} = require('../config/mixins')

module.exports = {
    getUsers: async(req, res) => {
        //  Get Users
        let { page, keyword } = req.query
        const { limit, offset } = getPagination(page, 10)
        
        const where = {
            [Op.not]: [{
                id: req.decoded.id
            }]
        }
        if(keyword){
            where[Op.or] = [{
                name : {[Op.like]: `%${keyword}%`},
            },{
                email : {[Op.like]: `%${keyword}%`},
            }]
        }
        
        return User.findAndCountAll({limit, offset, order:[['updatedAt', 'DESC']], where: where}).then(data => {
            const { totalItems, dataPaginate, totalPages, currentPage } = getPagingData(data, page, limit)

            if(dataPaginate.length != 0 && !isNaN(currentPage)){
                res.json({
                    totalItems : totalItems,
                    limitItems : limit,
                    totalPages : totalPages,
                    currentPage : currentPage,
                    users : dataPaginate,
                    message: 'User berhasil ditampilkan',
                    request: {
                        method: req.method,
                        url: BASE_URL + 'user'
                    },
                    status: true
                })
            }else{res.json({totalItems : 0,message : 'User tidak ditemukan', status: false})}
        }).catch(() => {
            res.status(404).json({message : 'User tidak ditemukan', status: false})
        })
    },
}