const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router= express.Router();
//import modelu
const User= require('../models/user');
//dodawanie konta
router.post("/signup", (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(user) {
            res.status(409).json({ wiadomosc: "Użytkownik już istnieje"})
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    res.status(500).json({ error : err });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                    });
                    user
                    .save()
                    .then(doc => {
                        res.status(201).json({
                            wiadomosc: "Utworzono nowego użytkownika",
                            szczegoly: doc,
                        });
                    })
                    .catch(err => res.status(500).json ({ error: err}));
                }
            });
        }
    })
    
.catch(err => res.status(500).json ({ error: err}));
});

//usuwanie konta

router.delete("/:userId", (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
    .then(() => {
        res.status(200).json({ wiadomosc: "Użytkownik został usunięty"});
    })
    .catch((err) => res.status(500).json ({ error: err}));
});

//logowanie

router.post("/login", (req,res,next) => {
User.findOne({email: req.body.email})
.then(user => {
    if(!user) {
        res.status(401).json({ wiadomosc: "błąd autoryzacji"});
    } else {
        bcrypt.compare(req.body.password, user.password)
        .then((result) => {
            if(result) {

               const token = jwt.sign({
                    email:user.email,
                    userId: user._id,
                }, 
                process.env.JWT_KEY, 
                {
                    expiresIn: "1h"
                }
                );
                res.status(200).json({ wiadomosc: "zalogowano", 
                token: token });
            } else {
                res.status(401).json({ wiadomosc: "błąd autoryzacji"});
            }
        })
        .catch((err) => res.status(500).json ({ error: err}));
    }
})
.catch((err) => res.status(500).json ({ error: err}));
});







module.exports = router;