const { Schema, model } = require("mongoose");

const tableSchema = new Schema({
  customer: String,
  currentOrder: [{}],
  total: [{}],
  restaurantId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
});

module.exports = model("Table", tableSchema);
