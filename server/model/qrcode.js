const mongoose = require('mongoose')


const GeneratorSchema = mongoose.Schema({
    name_of_product:String,
    batch_number:String,
    manufacturing_date:String,
    number_of_container:Number,
    expiry_date:String,
    gross_weight:Number,
    tare_weight:Number,
    net_weight:Number,
    manufacturing_licence_number:String,
    origin:String,
    storage_condition:String,
    qr_date_created:String,
    base_64:String,
})

qrcodeData = mongoose.model('qrcodeData_collection',GeneratorSchema)
module.exports = qrcodeData

