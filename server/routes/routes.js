const express = require('express');
const Router = express.Router();
const controller = require('../controller/controller')
const services = require('../services/render')

Router.get('/',services.homeRoute);
Router.get('/qr',services.qrRoute)
Router.get('/allQr',services.allData)
Router.get('/generateQr',services.generateQR)

Router.get('/api/v1/id-data',controller.findData)
Router.post('/api/v1/text-data',controller.qrCodeTextSave);
Router.get('/api/v1/get-data',controller.getAllData);
Router.get('/api/v1/delete',controller.dbClear);

module.exports = Router