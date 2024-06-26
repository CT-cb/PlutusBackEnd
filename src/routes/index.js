/**
 * Routes index file
 * 
 * This is the entry point for all routes
 */

let router = require('express').Router();

const authRoute = require("./auth-route");

/**
 * .use(): Mounts middleware for the route
 * Middleware are functions that are executed in order on a payload that passes through the router
 * 
 * What middleware should be used? Plan that out and write appropriate middleware functions in /helpers/.
 */

// Uncomment each line once its route is ready to be tested
router.use("/auth",authRoute);
router.use("/expenses",require("./expense-route.js"));
router.use("/incomes",require("./income-route.js"));
router.use("/limits",require("./limit-route.js"));


module.exports = router;