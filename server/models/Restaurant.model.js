const { Schema, model } = require("mongoose");


const restaurantSchema = new Schema({
    restaurant: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    address: String,
    tables: [{ type: Schema.Types.ObjectId, ref: 'Table' }],
    email: String,
    menu: [{
        type: Schema.Types.ObjectId, ref: 'Product' 
    }]
});


module.exports = model("Restaurant", restaurantSchema)