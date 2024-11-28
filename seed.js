const mongoose = require("mongoose");
require("dotenv").config();
const Artist = require("./models/Artist.model");
const Album = require("./models/Album.model");
const Song = require("./models/Song.model");
const Playlist = require("./models/Playlist.model");
const musicData = require("./data/musicData.json");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((res) => {
    console.log("Connected to the database:", res.connections[0].name);
  })
  .then(() => {
    Promise.all([
      Artist.insertMany(musicData.artists),
      Album.insertMany(musicData.albums),
      Song.insertMany(musicData.songs),
      Playlist.insertMany(musicData.playlists),
    ]);
  })

  .catch((error) => {
    console.log("Error connecting to the database", error);
  });
