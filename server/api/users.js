const express = require('express');
const router = express.Router();
const userBL = require('../BL/users');

router.get('/', (req, res) => {
    userBL.getUsers()
    .then((users) => {
            res.send(users);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).end();
    });
});

router.post('/', (req, res) => {
    userBL.saveUser(req.body)
        .then((user) => {
            if (user.err) {
                console.error(user.err);
                res.status(400).end();
            } else {
                res.status(201).send(user);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

module.exports = router;