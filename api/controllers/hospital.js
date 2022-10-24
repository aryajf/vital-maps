const {
    Hospital
} = require('../models')
const path = require('path')
const { Op } = require("sequelize")
const hospitalCoverPath = path.join(__dirname, '../public/images/hospital/')
const Validator = require('validatorjs')
const validatorMessage = require('../config/validatorMessage')
const {compressImage, deleteFile, makeDirectory, createSlug} = require('../config/mixins')

module.exports = {
    index: async (req, res) => {
        try {
            let hospitals = await Hospital.findAll()
            if (hospitals.length > 0) {
                res.json({
                    hospitals: hospitals,
                    message: 'Hospital Berhasil Ditampilkan',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + 'hospital'
                    },
                    status: true
                })
            } else {
                res.json({
                    message: 'Hospital belum ditambahkan',
                    status: false
                })
            }
        } catch (err) {
            res.status(400).json({
                message: 'Terjadi kesalahan saat menampilkan hospital',
                status: false
            })
        }
    },
    search: async(req, res) => {
        if(req.params.keyword == ''){
            res.json({message : 'Hospital tidak ditemukan', status: false})
            return
        }
        
        try{
            const hospitals = await Hospital.findAll({
                where: {
                    title: {[Op.like]: `%${req.params.keyword}%`}
                }
            })
            if (hospitals.length > 0) {
                res.json({
                    hospitals: hospitals,
                    message: 'Hospital Berhasil Ditemukan',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + 'hospital'
                    },
                    status: true
                })
            } else {
                res.json({
                    message: 'Hospital tidak ditemukan',
                    status: false
                })
            }
        }catch(err){
            res.status(400).json({
                message: 'Terjadi kesalahan saat menampilkan hospital',
                status: false
            })
        }
    },
    show: async (req, res) => {
        try {
            const hospital = await findHospital(req.params.slug)
            if (hospital == null) {
                res.status(404).json({
                    message: 'Hospital tidak ditemukan',
                    status: false
                })
                return
            }

            res.json({
                hospital: hospital,
                message: 'Hospital Berhasil Ditampilkan',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + 'hospital/' + req.params.slug
                },
                status: true
            })
        } catch (err) {
            res.status(400).json({
                message: 'Terjadi kesalahan saat menampilkan hospital',
                status: false
            })
        }
    },
    store: async (req, res) => {
        let slug, title = req.body.title
        title == null ? slug = title : slug = createSlug(title)

        let hospitalReq = {
            title: req.body.title,
            slug: slug,
            long: req.body.long,
            lat: req.body.lat,
            capacity: req.body.capacity,
            phone: req.body.phone,
            description: req.body.description,
            alamat: req.body.alamat,
            cover: '',
            igd: req.body.igd,
            ugd: req.body.ugd,
            vaksin: req.body.vaksin,
            rawatInap: req.body.rawatInap,
            rawatJalan: req.body.rawatJalan,
            lab: req.body.lab,
            medicalCheckup: req.body.medicalCheckup,
        }

        !req.file ? hospitalReq.cover = null : hospitalReq.cover = req.file.filename
        if(hospitalValidation(hospitalReq) != null){
            res.status(400).send(hospitalValidation(hospitalReq))
            if(hospitalReq.cover){
                deleteFile(req.file.path)
            }
            return
        }

        try {
            let checkSlug = await Hospital.findOne({where: {slug: hospitalReq.slug}})
            if(checkSlug){
                hospitalReq.slug = createSlug(title) + '-' + 1
            }
            // 1. Make directory 2. Compress image
            let hospital = await Hospital.create(hospitalReq)
            makeDirectory(hospitalCoverPath)
            compressImage('public/uploads/'+req.file.filename, hospitalCoverPath, req.file.path)

            res.status(201).json({
                data: {
                    slug: hospital.slug,
                    title: hospital.title,
                },
                message: 'Hospital Berhasil Ditambah',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + 'hospital'
                },
                status: true,
            })
        } catch (err) {
            res.status(400).json({
                error: err.message,
                message: 'Terjadi kesalahan saat menambah hospital',
                status: false
            })
        }
    },
    update: async (req, res) => {
        let hospital = await findHospital(req.params.slug)
        if (hospital == null) {
            res.json({
                message: 'Hospital tidak ditemukan',
                status: false
            })
            deleteFile(req.file.path)
            return
        }

        let hospitalReq = {
            title: req.body.title,
            long: req.body.long,
            lat: req.body.lat,
            capacity: req.body.capacity,
            phone: req.body.phone,
            description: req.body.description,
            alamat: req.body.alamat,
            cover: '',
            igd: req.body.igd,
            ugd: req.body.ugd,
            vaksin: req.body.vaksin,
            rawatInap: req.body.rawatInap,
            rawatJalan: req.body.rawatJalan,
            lab: req.body.lab,
            medicalCheckup: req.body.medicalCheckup,
        }
        if(!req.file){
            hospitalReq.cover = hospital.cover
            if(hospitalValidation(hospitalReq) != null){
                res.status(400).send(hospitalValidation(hospitalReq))
                return
            }
        }else{
            hospitalReq.cover = req.file.filename
            if(hospitalValidation(hospitalReq) != null){
                res.status(400).send(hospitalValidation(hospitalReq))
                deleteFile(req.file.path)
                return
            }
            compressImage('public/uploads/'+req.file.filename, hospitalCoverPath, req.file.path)
            deleteFile(hospitalCoverPath + hospital.cover)
        }

        try {
            hospital.update(hospitalReq)
            res.status(201).json({
                data: {
                    id: hospital.id,
                    title: hospital.title,
                },
                message: 'Hospital Berhasil Diubah',
                request: {
                    method: req.method,
                    url: process.env.BASE_URL + 'hospital/' + req.params.slug
                },
                status: true,
            })
        } catch (err) {
            res.status(400).json({
                error: err.message,
                message: 'Terjadi kesalahan saat mengubah hospital',
                status: false
            })
        }
    },
    delete: async (req, res) => {
        let hospital = await findHospital(req.params.slug)
        if (hospital != null) {
            deleteFile(hospitalCoverPath + hospital.cover)
            try {
                hospital.destroy()
    
                res.json({
                    message: 'Hospital Berhasil Dihapus',
                    request: {
                        method: req.method,
                        url: process.env.BASE_URL + 'hospital/' + req.params.slug
                    },
                    status: true
                })
            } catch (err) {
                res.status(400).json({
                    error: err.message,
                    message: 'Terjadi kesalahan saat menghapus hospital',
                    status: false
                })
            }
        }else{res.status(404).json({message : 'Hospital tidak ditemukan', status: false})}
    }
}

function findHospital(slug) {
    return Hospital.findOne({
        where: {
            slug: slug
        }
    })
}

function hospitalValidation(dataRequest) {
    let rules = {
        title: 'required',
        long: 'required',
        lat: 'required',
        capacity: 'required|numeric',
        phone: 'required',
        description: 'required',
        alamat: 'required',
        cover: 'required',
    }

    let validation = new Validator(dataRequest, rules, validatorMessage)
    if (validation.fails()) {
        return {
            message: "Harap isi form dengan benar",
            errors: validation.errors.errors
        }
    }
}