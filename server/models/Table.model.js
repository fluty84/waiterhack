const { Schema, model } = require("mongoose");


const tableSchema = new Schema({
   
    password: { type: String, required: true },
    customer: String,
    currentOrder: [{}],
    total: [{}],
    restaurantId: [{
        type: Schema.Types.ObjectId, ref: 'Restaurant'
    }]
});


module.exports = model("Table", tableSchema)