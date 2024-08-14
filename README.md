# lab-music-streaming-service 🎵

## Description

In this lab, we're going to build a small-scale music streaming service database using MongoDB and Mongoose. We will create collections that represent artists, albums, songs, and playlists, and establish relationships between them.

## Goal

By the end of this lab, you'll have a working MongoDB database that models a music streaming service, where artists release albums, albums contain songs, and users can create playlists of their favorite songs.

## 🏗️ Structure

We will create four collections:

1. **Artists**: Stores information about the artists.
2. **Albums**: Stores details about albums and references the artist.
3. **Songs**: Stores individual songs and references the album they belong to.
4. **Playlists**: Stores user-created playlists that can contain multiple songs from different albums.

## 🐣 Initial Steps

- Create a new file called `seed.js`.
- Initialize npm: `npm init -y`.
- Install the necessary packages: `npm install mongoose dotenv`.

## 🤫 Keep your secrets safe!

- Create a `.env` file.
- Create a `.gitignore` file and add the folders and files you don't want to push to your repository:

```bash
node_modules
package-lock.json
.env
```

- Add your MongoDB connection string in the `.env` file:

```bash
MONGODB_URL=mongodb://connection-string-to-your-mongoDB-with-user-and-password/your-database-name
```

## 👩‍💻 Let's Start Coding

### 1. Connect to the Database

First, connect to your MongoDB database using Mongoose:

<details>
<summary>Reveal the code 🙈</summary>

```javascript
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then((res) => {
    console.log("Connected to the database:", res.connections[0].name);
  })
  .catch((error) => {
    console.log("Error connecting to the database", error);
  });
```

</details>

### 2. Create Models

#### a. Artist Model

Create a model for the artists with a name and genre:

<details>
<summary>Reveal the code 🙈</summary>

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: String,
  genre: String,
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
```

</details>

#### b. Album Model

Create a model for the albums with a title, release year, and a reference to the artist (by ObjectId):

<details>
<summary>Reveal the code 🙈</summary>

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  title: String,
  releaseYear: Number,
  artist: { type: Schema.Types.ObjectId, ref: "Artist" },
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
```

</details>

#### c. Song Model

Create a model for the songs with a title, duration, and a reference to the album (by ObjectId):

<details>
<summary>Reveal the code 🙈</summary>

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: String,
  duration: Number,
  album: { type: Schema.Types.ObjectId, ref: "Album" },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
```

</details>

#### d. Playlist Model

Create a model for user playlists with a name and an array of song references (by ObjectId):

<details>
<summary>Reveal the code 🙈</summary>

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  name: String,
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
```

</details>

### 3. 🌱 Seed the Database

Now that the models are in place, let's seed the database with some initial data:

- Create an array of artists, albums, songs, and playlists.
- Use the `insertMany` method to add the data to your collections.
- You can use chatGPT to generate a JSON file with sample data for artists, albums, songs, and playlists.

Something like this:

```json
{
  "artists": [
    {
      "name": "Artist 1",
      "genre": "Pop"
    },
    {
      "name": "Artist 2",
      "genre": "Rock"
    }
  ],
  "albums": [
    {
      "title": "Album 1",
      "releaseYear": 2021,
      "artist": "artist_id"
    },
    {
      "title": "Album 2",
      "releaseYear": 2020,
      "artist": "artist_id"
    }
  ],
  "songs": [
    {
      "title": "Song 1",
      "duration": 180,
      "album": "album_id"
    },
    {
      "title": "Song 2",
      "duration": 240,
      "album": "album_id"
    }
  ],
  "playlists": [
    {
      "name": "My Playlist",
      "songs": ["song_id", "song_id"]
    }
  ]
}
```

Try to make GPT create the proper objectIDs for the artist, album, and song references so they match.

Take your time, this is the most challenging part of the lab. 🧠

You may need to use the Promise.all method to wait for all the data to be inserted before closing the connection.

Hint:

```javascript
    Promise.all([
      Artist.insertMany(data.artists),
      Album.insertMany(data.albums),
      Song.insertMany(data.songs),
      Playlist.insertMany(data.playlists),
    ]);
```

<details>
<summary>Reveal the code 🙈</summary>

```javascript
const Artist = require("./models/Artist.model");
const Album = require("./models/Album.model");
const Song = require("./models/Song.model");
const Playlist = require("./models/Playlist.model");
// import the data
const data = require("./data.json");
mongoose
  .connect(process.env.MONGODB_URL)
  .then((res) => {
    console.log("Connected to the database:", res.connections[0].name);
  })
  .then(() => {
    return Promise.all([
      Artist.insertMany(data.artists),
      Album.insertMany(data.albums),
      Song.insertMany(data.songs),
      Playlist.insertMany(data.playlists),
    ]);
  })
  .catch((error) => {
    console.log("Error connecting to the database", error);
  });
```

</details>

Happy coding! 🎧
