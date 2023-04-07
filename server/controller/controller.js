const qrcodeDB = require('../model/qrcode')
const QRCode = require('qrcode')
const fs = require('fs')
const moment = require('moment')

const list_arr = ["name_of_product",
                "batch_number",
                "manufacturing_date",
                "number_of_container",
                "expiry_date",
                "gross_weight",
                "tare_weight",
                "net_weight",
                "manufacturing_licence_number",
                "origin",
                "storage_condition"]

exports.qrCodeTextSave = async (req,res)=>{
    qr_string = ""

    // Way to show data on QR code scan
    for(var i in req.body){
      if (list_arr.includes(i)==true){
        parsed_i = i.toUpperCase().replace('/_/g'," ")
        qr_string += `${parsed_i} : ${req.body[i]} \n`
      }
    }

    QRCode.toDataURL(qr_string, async (err, img_data) => {
      // Add base64_text to req.body and save in DB
      var reqs = Object.assign(req.body,{base_64_text:img_data })
    
    const codeData  = new qrcodeDB({
      name_of_product:reqs.name_of_product,
      batch_number:reqs.batch_number,
      manufacturing_date:moment(reqs.manufacturing_date).format('DD/MM/YYYY'),
      number_of_container:reqs.number_of_container,
      expiry_date:moment(reqs.expiry_date).format('DD/MM/YYYY'),
      gross_weight:reqs.gross_weight,
      tare_weight:reqs.tare_weight,
      net_weight:reqs.net_weight,
      manufacturing_licence_number:reqs.manufacturing_licence_number,
      origin:reqs.origin,
      storage_condition:reqs.storage_condition,
      qr_date_created:moment().format("ll"),
      base_64:reqs.base_64_text
      })
      codeData.save() // Save to DB
      .then((data)=>{
        res.redirect('/qr?id='+data._id)
      })
    .catch((err)=>{
        res.send(err)
    })
  })
}


exports.getAllData = async(req,res)=>{
  qrcodeDB.find({})
  .then((data)=>{
    res.send(data)
  })
}

exports.dbClear = async(req,res) => {
  qrcodeDB.collection.drop()
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}

exports.findData = async(req,res) => {
  qrcodeDB.findById(req.query.id)
  .then((data)=>{
    res.send(data)
  })
  .catch((err) => {
    res.send(err)
  })
}


