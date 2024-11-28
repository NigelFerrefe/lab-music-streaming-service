const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  title: String,
  releaseYear: Number,
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
  },
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
