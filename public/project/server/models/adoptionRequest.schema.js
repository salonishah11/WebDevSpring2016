module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var AdoptionRequestSchema = mongoose.Schema({
        name: String,
        username: String,
        password: String,
        email: String,
        streetAddress: String,
        city: String,
        state: String,
        country: String,
        zipcode: String,
        accountType: String,
        shelterId: String
    }, {collection: 'adoptionRequest'});
    return AdoptionRequestSchema;
};