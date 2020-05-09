const mongoose = require('mongoose');
const config = require('../config/server');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
mongoose.connect(config.mongoUri,{useNewUrlParser: true, useUnifiedTopology: true}) .then(()=>{
    console.log('Bazaga Ulandi');
})
    .catch((err)=>{
        console.log('Xatolik', err);
    });

mongoose.set('useFindAndModify',false);

router.post('/register',userController.register);
router.post('/login',userController.login);

module.exports = router;