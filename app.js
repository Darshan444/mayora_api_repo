// PARSE .ENV
require('dotenv').config();


// FOR SERVER
// CHECK WITH PROTOCOL TO USE
const SHOULD_RUN_ON_HTTP = process.env.SHOULD_RUN_ON_HTTP;
const http = (SHOULD_RUN_ON_HTTP == 'true') ? require('http') : require('https');

const express = require('express') // NODE FRAMEWORK
const cluster = require('cluster'); // NODE CLUSTERING
const bodyParser = require('body-parser') // TO PARSE POST REQUEST
const cors = require('cors') // ALLOW CROSS ORIGIN REQUESTS
const fs = require('fs');

// ---------------------------    SERVER CONFIGS ----------------------------------
// SSL CONFIG
const options = {
    key: fs.readFileSync(__dirname + '/SSL/key.pem'),
    cert: fs.readFileSync(__dirname + '/SSL/cert.pem')
};
const port = process.env.PORT || 8000
const app = express();

require('./Configs/globals'); // GLOBAL SETTINGS FILES

const server = (SHOULD_RUN_ON_HTTP == 'true') ? http.createServer(app) : http.createServer(options, app);


// ------------------------      GLOBAL MIDDLE WARES -------------------------
app.set('view engine', 'ejs');
app.use(bodyParser.json({limit:'50mb'})); // ALLOW APPLICATION JSON
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));  // ALLOW URL ENCODED PARSER
app.use(cors()) // ALLOWED ALL CROSS ORIGIN REQUESTS
app.use(express.static(__dirname + '/Assets')); // SERVE STATIC IMAGES FROM ASSETS FOLDER

// ------------------------    RESPONSE HANDLER    -------------------
app.use((req, res, next) => {
    const ResponseHandler = require('./Configs/responseHandler')
    res.handler = new ResponseHandler(req, res);
    next()
})

//for all api security call common function
app.use( async (req, res, next) => {
   
    const Authenticator = (new (require('./MiddleWares/Authenticator/Authenticator'))());
    // await Authenticator.securityauthenticate(req, res, next)
    next()
    
})
// --------------------------    GLOBAL ERROR HANDLER    ------------------


app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
console.log("errerrerr",err)
    res.handler.serverError(err);
})

// --------------------------    ROUTES    ------------------
try {
    const appRoutes = require('./Routes')
    appRoutes(app)
} catch (error) {
    console.log("Route Crash -> ", error)
}

// --------------------------    START SERVER    ---------------------
let numberOfCpus = require('os').cpus().length;

if (cluster.isMaster) {
    if (process.env.DEVELOPMENT === 'true') {
        numberOfCpus = 1;
    }

    // Create a worker for each CPU
    for (var i = 0; i < numberOfCpus; i++) {
        cluster.fork();
    }

    cluster.on('online', function (worker) {
        console.log(CHALK.blueBright(`Worker ${CHALK.white.bold(worker.process.pid)} is online. :)`));
    });

    cluster.on('exit', function (worker, code, signal) {
        console.log(CHALK.red(`Worker ${CHALK.white.bold(worker.process.pid)} is died.`));
    });

    
} else {
    server.listen(port, () => {
        console.log('\n============== Welcome To Node API ================');
        console.log(CHALK.blueBright(`Server started on ${CHALK.white.bold(port)} :)`))
    });
}