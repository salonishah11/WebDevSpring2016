module.exports = function(mongoose) {

    var PetSchema = require("./pet.schema.js")(mongoose);

    // use mongoose to declare a user schema
    var AdoptionRequestSchema = mongoose.Schema({
        status: String,
        userId: String,
        pet: [PetSchema]
    }, {collection: 'adoptionRequest'});
    return AdoptionRequestSchema;
};