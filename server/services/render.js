const axios = require('axios');

exports.homeRoute = (req,res) =>{
    res.render('pages/homePage')
}
exports.generateQR = (req,res)=>{
    res.render('pages/generateQR')
}

exports.qrRoute = (req,res) => {

    axios.get(`http://localhost:${process.env.PORT}/api/v1/id-data?id=${req.query.id}`)
    .then((response)=>{
        res.render('pages/qrCode',{params:req.query.id,data:response.data})
    })
}

exports.allData = (req,res) => {
    axios.get(`http://localhost:${process.env.PORT}/api/v1/get-data`)
    .then((response) => {
        res.render('pages/allqr',{data:response.data})
    })
}
