module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var StorySchema = mongoose.Schema({
        userId: String,
        username: String,
        title: String,
        dateCreated: {type: Date, default: new Date()},
        description: String
    }, {collection: 'story'});
    return StorySchema;
};