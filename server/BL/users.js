const userModel = require('../models/db/user');
const userSyncSystemsBL = require('./usersSyncSystems');

const service = {
    getUsers: () =>
        userModel.find()
            .exec()
            .then((users) => users),

    saveUser: (params) => {
        let session = null;

        return userModel.createCollection()
            .then(() => userModel.startSession())
            .then((_session) => {
                session = _session;
                session.startTransaction();
                const newUser = new userModel();
                newUser.name = params.name;
                return userModel.create([newUser], { session: session })
                    .then((newUser) => {
                        return userSyncSystemsBL.saveUserSyncSystems(newUser, session)
                            .then(() => {
                                session.commitTransaction();
                            }).catch((err) => {
                                console.log(err);
                                session.abortTransaction();
                            })
                    })
            }).then(() => {
                userSyncSystemsBL.syncSystems();
                return userModel.findOne({ name: params.name });
            })
            .catch((err) => ({ err }));
    },
}

module.exports = service;