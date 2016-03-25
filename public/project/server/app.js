module.exports = function(app) {
    var userModel   = require("./models/user.model.js")();
    var userService = require("./services/user.service.server.js")(app, userModel);

    var requestModel   = require("./models/adoptionRequest.model.js")();
    var requestService = require("./services/adoptionRequest.service.server.js")(app, requestModel);

    var storyModel   = require("./models/story.model.js")();
    var storyService = require("./services/story.service.server.js")(app, storyModel);
    
    // var formModel   = require("./models/form.model")();
    // var formService = require("./services/form.service.server")(app, formModel);
    // var fieldService = require("./services/field.service.server")(app, formModel);
};

















