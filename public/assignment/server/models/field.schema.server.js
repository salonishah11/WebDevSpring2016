module.exports = function(mongoose) {

    // use mongoose to declare a field schema
    var FieldSchema = mongoose.Schema({
        label: String,
        type: {
            type:String,
            enum: ['TEXT', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES'],
            default: "TEXT"
        },
        placeholder: String,
        options: [{label: String,
            value: String}]
    }, {collection: 'field'});
    return FieldSchema;
};