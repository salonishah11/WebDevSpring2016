module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var ShelterIdSchema = mongoose.Schema({
        shelterId: String,
        username: String
    }, {collection: 'shelterId'});
    return ShelterIdSchema;
};