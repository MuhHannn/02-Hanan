const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017"; // URL koneksi MongoDB
const dbName = "absensi"; // Nama database

async function connectDB() {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Berhasil terhubung ke database");
    return client.db(dbName);
  } catch (err) {
    console.error("Gagal terhubung ke database", err);
    throw err;
  }
}

module.exports = { connectDB };
