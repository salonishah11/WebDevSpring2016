module.exports = function(app, db, mongoose) {
    var userModel   = require("./models/user.model.server.js")(db, mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel);

    var formModel   = require("./models/form.model.server.js")(app, db, mongoose);
    var formService = require("./services/form.service.server")(app, formModel);
}