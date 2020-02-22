const mongoose = require('mongoose');
const userSyncSystemsModel = require('../models/db/userSyncSystems');
const axios = require('axios');
const system = global.config.systemToSyncUsers;

const service = {
    getUsersSyncSystems: () =>
        userSyncSystemsModel.find()
            .exec()
            .then((res) => res),

    saveUserSyncSystems: (params, session) => {
        const newUserSyncSystemsModel = new userSyncSystemsModel();
        newUserSyncSystemsModel.user = new mongoose.Types.ObjectId(params._id);
        newUserSyncSystemsModel.system = system;

        return userSyncSystemsModel.create([newUserSyncSystemsModel], { session: session })
            .then((res) => res)
    },

    syncSystems: () => {
        return service.getUsersSyncSystems()
            .then((usersSyncSystems) => {                
                let successfullHttpRequests = usersSyncSystems.filter((userSyncSystems) => {
                        return axios.post(system.url, {
                            name: userSyncSystems.user
                        }).then((res) => {
                            return service.deleteUserInSyncSystems(userSyncSystems._id);
                        }).catch((err) => {
                            console.error(`User ${userSyncSystems.user} was not sent to ${system.url}. err: ${err}`);
                        })
                    });
                return Promise.all(successfullHttpRequests);
            });
    },

    deleteUserInSyncSystems: (id) =>
        userSyncSystemsModel.find({ _id: id }).deleteOne()
}

module.exports = service;