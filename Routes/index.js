module.exports = (app) => {
    app.get("/", (req, res) => {
        res.status(STATUS_CODES.SUCCESS).send("Welcome to " + process.env.PROJECT_NAME);
    });
    
    app.use("/" + process.env.API_VERSION + "/exhibition", require("./exhibition"));

};