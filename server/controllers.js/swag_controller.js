//This controller is responsible for sending the complete array of swag
const swag = require('../models/swag') //an array of objects. 

module.exports = {
    read: (req,res,next) =>{
        res.status(200).send(swag)
    }
}


