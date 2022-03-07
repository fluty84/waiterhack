const { Schema, model } = require("mongoose");

const tableSchema = new Schema({
  customer: String,
  password: String,
  currentOrder: [{}],
  total: [{}], 
  restaurantId: [
    {
      required:true,
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
});

module.exports = model("Table", tableSchema);
