const app = require('express')();
const config = require('./settings/config');
global.config = config;
const bodyParser = require('body-parser');
const port = config.port;

const mongoose = require('mongoose');
mongoose.connect(config.connStr, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).catch((error) => {
    console.error(error);
});

app.use(bodyParser.json());

const userAPI = require('./api/users');
const userSyncSystemsAPI = require('./api/usersSyncSystems');
app.use('/api/users', userAPI);
app.use('/api/users-sync-systems', userSyncSystemsAPI);

app.get('*', (req, res) => {
    res.send('try post method to: /api/users');
});

require('./BL/usersSyncSystems').syncSystems(); // everytime the application starts, it will synchronize the systems

if (!module.parent) {
    app.listen(port, (error) => {
        if (error)
            console.log(error);
        else
            console.log(`Listening on port ${port}`);
    });
}