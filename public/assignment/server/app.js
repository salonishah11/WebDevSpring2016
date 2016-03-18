module.exports = function(app) {
    var model   = require("./models/user.model.js")();
    var service = require("./services/user.service.server.js")(app, model);

    var model   = require("./models/form.model")();
    var service = require("./services/form.service.server")(app, model);
}