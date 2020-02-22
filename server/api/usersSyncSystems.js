const express = require('express');
const router = express.Router();
const userSyncSystemsBL = require('../BL/usersSyncSystems');

router.get('/', (req, res) => {
    userSyncSystemsBL.getUsersSyncSystems()
    .then((usersSyncSystems) => {
            res.send(usersSyncSystems);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).end();
    });
});

router.post('/', (req, res) => {
    userSyncSystemsBL.saveUserSyncSystems(req.body)
        .then((userSyncSystems) => {
            if (userSyncSystems.err) {
                console.error(userSyncSystems.err);
                res.status(400).end();
            } else {
                res.status(201).send(userSyncSystems);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

router.put('/sync-systems', (req, res) => {
    userSyncSystemsBL.syncSystems(req.body)
        .then((userSyncSystems) => {
            if (userSyncSystems.err) {
                console.error(userSyncSystems.err);
                res.status(400).end();
            } else {
                res.status(200).send(userSyncSystems);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

module.exports = router;