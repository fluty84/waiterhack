const express = require("express")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Restaurant = require('../models/Restaurant.model')
const Table = require('../models/Table.model')



const router = express.Router()
const saltRounds = 10


//restaurant Login

router.post('/loginRestaurant', (req, res, next) => {
    const { restaurant, password } = req.body;

    if (restaurant === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    Restaurant
        .findOne({restaurant })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, restaurant } = foundUser;

                const payload = { _id, email, restaurant };

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                );

                res.status(200).json({ authToken });
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})



router.post('/loginTable', (req, res, next ) => {

    const { table, password, _id} = req.body;

    if (table === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    Table 
        .findOne({table})
        .then((foundTable) => {

            if (!foundTable) {
              res.status(401).json({ message: "User not found." });
              return;
            }

            if (password === foundTable.password){
                
                const {_id, password} = foundTable

                const payload = { _id, password };

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,

                    
                    { algorithm: 'HS256', expiresIn: "6h" }
                ); 

                res.status(200).json({ authToken });
            }

            else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }

            
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })   

})












module.exports = router