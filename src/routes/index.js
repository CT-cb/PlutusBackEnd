/**
 * Routes index file
 * 
 * This is the entry point for all routes
 */

let router = require('express').Router();

/**
 * .use(): Mounts middleware for the route
 * Middleware are functions that are executed in order on a payload that passes through the router
 * 
 * What middleware should be used? Plan that out and write appropriate middleware functions in /helpers/.
 */

router.use("/test",require("./test-route"));
router.use("/expenses",require("./expense-route.js"));
router.use("/income",require("./income-route.js"));
router.use("/accounts",require("./accounts-route.js"));
router.use("/users",require("./users-route.js"));

router.get('/', function(req,res,next){

});

module.exports = router;