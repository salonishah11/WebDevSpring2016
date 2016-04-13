module.exports = function(mongoose) {

    // use mongoose to declare a field schema
    var PetSchema = mongoose.Schema({
        age: String,
        animal: String,
        description: String,
        id: String,
        mix: String,
        name: String,
        sex: String,
        shelterId: String,
        shelterPetId: String,
        size: String,
        status: String
    }, {collection: 'pet'});
    return PetSchema;
};