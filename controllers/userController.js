const bcrypt = require('bcrypt')
const jwt = require('json-web-token')
const config = require('../config/server')
const User = require('../models/user')


exports.register = async (req,res)=>{
    const userData = req.body;
    if(!userData){
        res.status(401).json("Ma`lumot bo`sh keldi")
    }
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password,
        isAdmin: false,
        country: req.body.country,
        speciality: req.body.speciality
    })

    user.save()
        .then(()=>{
            res.status(200).json("Success");
        })
        .catch((err)=>{
            res.json("Error",err)
        })
};

exports.login = async (req,res) => {
    let userData = req.body;

    User.findOne({email: userData.email}, (error, user)=>{
        if(error){
            console.log(error);
        }else{
            if(!user){
                res.status(401).send("Invalid email");
            } else
            if(!bcrypt.compare(userData.password, user.password)){
                res.status(401).send("Invalid Password");
            } else {
                let payload = {subject: user._id, isAdmin: this.isAdmin};
                let token = jwt.sign(payload, config.secret);
                res.status(200).send({token});
            }
        }
    })
};