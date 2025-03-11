const constant = require("../constant")

//This is error handeller and we create switch case based upon status so that we did not have to check same things in multiple files.
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log(err)
    switch (statusCode) {
        case constant.VALIDATION:
            res.json({ title: "Validation failed", msg: err.message, stackTrace: err.stack });
            break;

        case constant.NOT_FOUND:
            res.json({ title: "Not found", msg: err.message, stackTrace: err.stack });

        case constant.UNAUTHHORIZED:
            res.json({ title: "Unauthorized Access", msg: err.message, stackTrace: err.stack });

        case constant.FORBIDDEN:
            res.json({ title: "Forbidden Access", msg: err.message, stackTrace: err.stack });

        case constant.SERVER_ERROR:
            res.json({ title: "Server Error", msg: err.message, stackTrace: err.stack });

        default:
            console.log("Connection Failed")
            break;
    }
};

module.exports = errorHandler;