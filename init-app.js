//centralize app initiation for both serving and testing

import express from 'express'
import {router} from './app/server/router'
import mongoose from 'mongoose'
import config from './app/config'

export let app = express()

export function init(testing = false){
    router(app)

    mongoose.connect(config.test_db)
    mongoose.connection.on('connected', function () {
      console.log('Mongoose default connection open to ' + config.db);
    })

    if(!testing){
        app.listen(config.test_port);
        console.log("App listening on port "+config.test_port);
    }
}
