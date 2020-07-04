'use strict';
import express from 'express';
import path from 'path';
const __dirname = path.resolve();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import favicon from 'serve-favicon';
import cors from 'cors';
import config from 'config';
import chalk from 'chalk';
import pkg from 'app-module-path';
const { addPath } = pkg;
addPath(__dirname);
const app = express();

import routes from './routes.js';
import authRoutes from './modules/authentication/routes/index.js';

// Use mongoose native promises
mongoose.Promise = Promise;

/**
 * Connect to mongodb
 */
if (config.get('MONGO_USER')) {
    const DBOptions = {
        user: config.get('MONGO_USER'),
        pass: config.get('MONGO_PASSWORD')
    };
    mongoose.connect(process.env.MONGO_URL || config.get('MONGO_URL'), DBOptions);
} else {
    mongoose.connect(process.env.MONGO_URL || config.get('MONGO_URL'));
}
mongoose.connection.on('connected', function () {
    console.log(chalk.underline(`APP MONGODB@${mongoose.version}:`), chalk.magenta(config.get('MONGO_URL')));
});

mongoose.connection.on('disconnected', function () {
    console.log(`Mongoose disconnected to: ${chalk.red.bold(config.get('MONGO_URL'))}`);
});

process.on('SIGINT', function () {
    console.log(chalk.red.bold('\nMongoose disconnected through app termination\n'));
    process.exit(0);
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.urlencoded({limit: '10mb',extended: true}));
app.use(cors());
app.use(bodyParser.json({limit: '10mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//API routes
app.use('/', routes);
app.use('/auth',authRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

export default app;