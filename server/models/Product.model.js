const { Schema, model } = require("mongoose");


const productSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    price: Number,
    category: [String],
    allergens: [String],
    restaurantId: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }],
    imageUrl: String
});

module.exports = model("Product", productSchema)