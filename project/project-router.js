const express = require('express');
const knex = require('knex');
const Users = require('./project-model.js');
const bcrypt = require('bcryptjs');
const restricted = require('../auth/restricted-middleware.js');


const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        let user = req.body;

        const hash = bcrypt.hashSync(user.password);
        user.password = hash;

        await Users.add(user)
            .then(saved => {
                res.status(201).json(saved);
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    let {
        username,
        password
    } = req.body;
    try {
        const user = await Users.findBy({
            username
        }).first();
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({
                message: `Welcome ${user.username}!`
            });
        } else {
            res.status(401).json({
                message: 'You shall not pass!'
            });
        }

    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/users', restricted, async (req, res) => {
    try {
        const users = await Users.find()
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({
                message: "Users not found."
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/restricted/user/:id', restricted, async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({
                message: "User not found."
            });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;