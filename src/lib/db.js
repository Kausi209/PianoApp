// src/lib/db.js
import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
// du kannst den Namen ändern, wenn du möchtest:
const db = client.db("piano"); // select database

//////////////////////////////////////////
// Songs
//////////////////////////////////////////

// Get all songs
async function getSongs() {
  let songs = [];
  try {
    const collection = db.collection("songs");

    const query = {}; // alle Songs
    songs = await collection.find(query).toArray();

    songs.forEach((song) => {
      song._id = song._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return songs;
}

// Get song by id
async function getSong(id) {
  let song = null;
  try {
    const collection = db.collection("songs");
    const query = { _id: new ObjectId(id) }; // filter by id
    song = await collection.findOne(query);

    if (!song) {
      console.log("No song with id " + id);
      // TODO: errorhandling
    } else {
      song._id = song._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    console.log(error.message);
    // TODO: errorhandling
  }
  return song;
}

// Get song by slug (für /songs/[slug])
async function getSongBySlug(slug) {
  let song = null;
  try {
    const collection = db.collection("songs");
    const query = { slug }; // filter by slug
    song = await collection.findOne(query);

    if (!song) {
      console.log("No song with slug " + slug);
    } else {
      song._id = song._id.toString();
    }
  } catch (error) {
    console.log(error.message);
  }
  return song;
}

// create song
// Beispiel song object:
/*
{
  slug: "river-flows-in-you",
  title: "River Flows In You",
  artist: "Yiruma",
  difficulty: "Beginner",
  genre: "Modern Classic",
  duration: "2:52",
  description: "Soft emotional piano piece",
  youtube_url: "https://www.youtube.com/...",
  image_url: "https://i.ytimg.com/vi/.../maxresdefault.jpg"
}
*/
async function createSong(song) {
  // Standardwerte
  song.favorite = false;

  try {
    const collection = db.collection("songs");
    const result = await collection.insertOne(song);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    console.log(error.message);
    // TODO: errorhandling
  }
  return null;
}

// update song
// Beispiel song object:
/*
{
  _id: "6630e72c95e12055f661ff13",
  title: "...",
  favorite: true
}
*/
// returns: id of the updated song or null
async function updateSong(song) {
  try {
    let id = song._id;
    delete song._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("songs");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: song });

    if (result.matchedCount === 0) {
      console.log("No song with id " + id);
      // TODO: errorhandling
    } else {
      console.log("Song with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
    // TODO: errorhandling
  }
  return null;
}

// delete song by id
// returns: id of the deleted song or null
async function deleteSong(id) {
  try {
    const collection = db.collection("songs");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No song with id " + id);
    } else {
      console.log("Song with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    console.log(error.message);
  }
  return null;
}

const monthlyCollection = db.collection("monthly_submissions");

// alle Einsendungen für einen bestimmten Monat (z.B. "2025-01-experience")
async function getMonthlySubmissions(monthSlug) {
  let subs = [];
  try {
    subs = await monthlyCollection
      .find({ monthSlug })
      .sort({ createdAt: -1 })
      .toArray();

    subs.forEach((s) => {
      s._id = s._id.toString();
      // createdAt ist Date, lassen wir als Date, Svelte kann damit umgehen
    });
  } catch (err) {
    console.log("getMonthlySubmissions error:", err.message);
  }
  return subs;
}

// neue Einsendung anlegen
async function createMonthlySubmission(submission) {
  const doc = {
    votes: 0,
    voterEmails: [],
    ...submission,
    status: "pending",
    createdAt: new Date()
  };

  try {
    const result = await monthlyCollection.insertOne(doc);
    return result.insertedId.toString();
  } catch (err) {
    console.log("createMonthlySubmission error:", err.message);
    return null;
  }
}


// einzelne Einsendung per ID holen
async function getMonthlySubmissionById(id) {
  try {
    const doc = await monthlyCollection.findOne({ _id: new ObjectId(id) });
    if (!doc) return null;

    doc._id = doc._id.toString();
    return doc;
  } catch (err) {
    console.log("getMonthlySubmissionById error:", err.message);
    return null;
  }
}

// Vote hinzufügen (1 User 1 Vote pro Submission)
async function addVoteToMonthlySubmission(id, voterEmail) {
  try {
    const result = await monthlyCollection.updateOne(
      {
        _id: new ObjectId(id),
        voterEmails: { $ne: voterEmail } // verhindert Double-Vote serverseitig
      },
      {
        $inc: { votes: 1 },
        $addToSet: { voterEmails: voterEmail }
      }
    );

    return result.modifiedCount === 1;
  } catch (err) {
    console.log("addVoteToMonthlySubmission error:", err.message);
    return false;
  }
}

async function removeUserVoteFromMonth(monthSlug, voterEmail) {
  try {
    await monthlyCollection.updateMany(
      { monthSlug, voterEmails: voterEmail },
      {
        $pull: { voterEmails: voterEmail },
        $inc: { votes: -1 }
      }
    );
  } catch (err) {
    console.log("removeUserVoteFromMonth error:", err.message);
  }
}

async function upsertMonthlySubmission({ monthSlug, userEmail, ...rest }) {
  try {
    const result = await monthlyCollection.updateOne(
      { monthSlug, userEmail }, // ✅ eindeutig: 1 pro user pro monat
      {
        $set: {
          ...rest,
          monthSlug,
          userEmail,
          updatedAt: new Date()
        },
        $setOnInsert: {
          votes: 0,
          voterEmails: [],
          status: "pending",
          createdAt: new Date()
        }
      },
      { upsert: true }
    );

    // returns true if inserted or updated
    return result.upsertedCount === 1 || result.modifiedCount === 1;
  } catch (err) {
    console.log("upsertMonthlySubmission error:", err.message);
    return false;
  }
}

async function getMonthlySubmissionByUser(monthSlug, userEmail) {
  try {
    const doc = await monthlyCollection.findOne({ monthSlug, userEmail });
    if (!doc) return null;
    doc._id = doc._id.toString();
    return doc;
  } catch (err) {
    console.log("getMonthlySubmissionByUser error:", err.message);
    return null;
  }
}




async function usersCol() {
  return db.collection("users");
}

export async function upsertUserFromGoogle({ email, name, image }) {
  const col = await usersCol();
  await col.updateOne(
    { email },
    {
      $setOnInsert: { email, createdAt: new Date() },
      $set: { googleName: name ?? "", image: image ?? "", updatedAt: new Date() }
    },
    { upsert: true }
  );
}

export async function getUserByEmail(email) {
  const col = await usersCol();
  return col.findOne({ email });
}

export async function setUsername({ email, username }) {
  const col = await usersCol();
  await col.updateOne(
    { email },
    { $set: { username, updatedAt: new Date() } }
  );
}


// export all functions so that they can be used in other files
export default {
  getSongs,
  getSong,
  getSongBySlug,
  createSong,
  updateSong,
  deleteSong,
  getMonthlySubmissions,
  createMonthlySubmission,
  usersCol,
  upsertUserFromGoogle,
  getUserByEmail,
  setUsername,
  getMonthlySubmissionById,
  addVoteToMonthlySubmission,
  removeUserVoteFromMonth,
  upsertMonthlySubmission,
  getMonthlySubmissionByUser
};
