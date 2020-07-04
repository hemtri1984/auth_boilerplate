'use strict';

import express from 'express';
const router = express.Router();

/* Show default home page message. */
router.get('/', function (req, res, next) {
    res.json({
        message: 'Hello World. Welcome to Restful Server > Hemant'
    });
});

export default router;
